<script setup lang="ts">
import type { Session } from '@supabase/supabase-js'
import type { CmsItem, CmsKind } from '~/types/cms'

definePageMeta({ layout: 'admin' })

const config = useRuntimeConfig()
const { $supabase } = useNuxtApp()
const configured = computed(() => Boolean($supabase))
const session = ref<Session | null>(null)
const email = ref('')
const password = ref('')
const busy = ref(false)
const message = ref('')
const errorMessage = ref('')
const items = ref<CmsItem[]>([])
const uploadFile = ref<File | null>(null)

type EditorForm = Omit<CmsItem, 'id' | 'is_demo'> & { id?: string }
const emptyForm = (): EditorForm => ({
  kind: 'news', slug: '',
  title_bg: '', title_ru: '', title_en: '',
  body_bg: '', body_ru: '', body_en: '',
  image_url: '', storage_path: null, category_slug: null, event_date: null, published: false, sort_order: 10
})
const form = reactive<EditorForm>(emptyForm())

useHead({
  title: 'Редактор — Bagatur BJJ',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const clearStatus = () => {
  message.value = ''
  errorMessage.value = ''
}

const resetForm = () => {
  Object.assign(form, emptyForm())
  uploadFile.value = null
  const input = document.querySelector<HTMLInputElement>('#content-image')
  if (input) input.value = ''
}

const loadItems = async () => {
  if (!$supabase || !session.value) return
  const { data, error } = await $supabase
    .from('content_items')
    .select('id,kind,slug,title_bg,title_ru,title_en,body_bg,body_ru,body_en,image_url,storage_path,category_slug,event_date,published,sort_order')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw error
  items.value = (data || []) as CmsItem[]
}

const login = async () => {
  if (!$supabase) return
  clearStatus()
  busy.value = true
  const { data, error } = await $supabase.auth.signInWithPassword({
    email: email.value.trim(),
    password: password.value
  })
  if (error) errorMessage.value = error.message
  else {
    session.value = data.session
    password.value = ''
    try { await loadItems() } catch (loadError: any) {
      errorMessage.value = 'Вход выполнен, но доступ к материалам запрещён. Проверьте роль content_admin.'
    }
  }
  busy.value = false
}

const logout = async () => {
  if (!$supabase) return
  await $supabase.auth.signOut()
  session.value = null
  items.value = []
  resetForm()
}

const selectItem = (item: CmsItem) => {
  clearStatus()
  Object.assign(form, {
    id: item.id, kind: item.kind, slug: item.slug,
    title_bg: item.title_bg, title_ru: item.title_ru, title_en: item.title_en,
    body_bg: item.body_bg, body_ru: item.body_ru, body_en: item.body_en,
    image_url: item.image_url, storage_path: item.storage_path || null, category_slug: item.category_slug || null, event_date: item.event_date,
    published: item.published, sort_order: item.sort_order
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onFile = (event: Event) => {
  uploadFile.value = (event.target as HTMLInputElement).files?.[0] || null
}

const uploadImage = async () => {
  if (!$supabase || !session.value || !uploadFile.value) {
    return { url: form.image_url, path: form.storage_path || null }
  }
  const file = uploadFile.value
  if (file.size > 10 * 1024 * 1024) throw new Error('Снимката е по-голяма от 10 MB.')
  const extension = (file.name.split('.').pop() || '').toLowerCase()
  if (!['jpg', 'jpeg', 'png', 'webp'].includes(extension)) {
    throw new Error('Разрешени формати: JPG, PNG и WebP.')
  }
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
  const path = `${session.value.user.id}/${Date.now()}-${safeName}`
  const { error } = await $supabase.storage
    .from('bagatur-media')
    .upload(path, file, { cacheControl: '3600', upsert: false })
  if (error) throw error
  return {
    url: $supabase.storage.from('bagatur-media').getPublicUrl(path).data.publicUrl,
    path
  }
}

const save = async () => {
  if (!$supabase || !session.value) return
  clearStatus()
  const titlesReady = form.title_bg.trim() && form.title_ru.trim() && form.title_en.trim()
  const bodiesReady = form.kind === 'gallery' || (form.body_bg.trim() && form.body_ru.trim() && form.body_en.trim())
  const categoryReady = form.kind !== 'gallery' || Boolean(form.category_slug)
  if (!form.slug.trim() || !titlesReady || !bodiesReady || !categoryReady) {
    errorMessage.value = 'Попълнете slug и трите езикови версии. За галерия изберете категория, а за новина добавете текст на BG, RU и EN.'
    return
  }
  busy.value = true
  try {
    const previousStoragePath = form.storage_path || null
    const uploaded = await uploadImage()
    if (!uploaded.url) throw new Error('Добавете снимка или URL на снимка.')
    const payload = {
      kind: form.kind as CmsKind,
      slug: form.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
      title_bg: form.title_bg.trim(), title_ru: form.title_ru.trim(), title_en: form.title_en.trim(),
      body_bg: form.body_bg.trim(), body_ru: form.body_ru.trim(), body_en: form.body_en.trim(),
      image_url: uploaded.url,
      storage_path: uploaded.path,
      category_slug: form.kind === 'gallery' ? form.category_slug : null,
      event_date: form.event_date || null,
      published: form.published,
      sort_order: Number(form.sort_order) || 0,
      updated_at: new Date().toISOString()
    }
    const query = form.id
      ? $supabase.from('content_items').update(payload).eq('id', form.id)
      : $supabase.from('content_items').insert(payload)
    const { error } = await query
    if (error) throw error
    if (uploadFile.value && previousStoragePath && previousStoragePath !== uploaded.path) {
      await $supabase.storage.from('bagatur-media').remove([previousStoragePath])
    }
    message.value = form.published ? 'Материалът е публикуван.' : 'Черновата е запазена.'
    resetForm()
    await loadItems()
  } catch (error: any) {
    errorMessage.value = error?.message || 'Материалът не беше запазен.'
  } finally {
    busy.value = false
  }
}

const removeItem = async (item: CmsItem) => {
  if (!$supabase || !session.value || !confirm(`Изтриване на „${item.title_bg}“?`)) return
  clearStatus()
  const { error } = await $supabase.from('content_items').delete().eq('id', item.id)
  if (error) errorMessage.value = error.message
  else {
    if (item.storage_path) {
      await $supabase.storage.from('bagatur-media').remove([item.storage_path])
    }
    message.value = 'Материалът е изтрит.'
    if (form.id === item.id) resetForm()
    await loadItems()
  }
}

onMounted(async () => {
  if (!$supabase) return
  const { data } = await $supabase.auth.getSession()
  session.value = data.session
  if (session.value) {
    try { await loadItems() } catch {
      errorMessage.value = 'Профилът няма права content_admin.'
    }
  }
})
</script>

<template>
  <main class="admin-page">
    <div class="admin-shell">
      <header class="admin-topbar">
        <NuxtLink to="/" class="admin-brand">
          <img src="/images/bagatur-logo-main.jpg" alt="Bagatur">
          <span><strong>Bagatur</strong><small>редактор на съдържание</small></span>
        </NuxtLink>
        <button v-if="session" class="admin-link-button" type="button" @click="logout">Изход</button>
        <NuxtLink v-else to="/" class="admin-link-button">Към сайта</NuxtLink>
      </header>

      <section v-if="!configured" class="admin-state">
        <p class="section-label">Не е свързано</p>
        <h1>Редакторът чака настройка</h1>
        <p>Публичният сайт работи с демонстрационни материали. За реално публикуване създайте проект в Supabase, изпълнете <code>supabase/setup.sql</code> и добавете публичните стойности от <code>.env.example</code>.</p>
        <p>Секретният service role ключ никога не се добавя в сайта.</p>
        <NuxtLink to="/" class="admin-primary-button">Към публичния сайт</NuxtLink>
      </section>

      <section v-else-if="!session" class="admin-login">
        <p class="section-label">За треньора</p>
        <h1>Вход в редактора</h1>
        <p>Използвайте профила с роля <code>content_admin</code>.</p>
        <form @submit.prevent="login">
          <label>Email<input v-model="email" type="email" autocomplete="username" required></label>
          <label>Парола<input v-model="password" type="password" autocomplete="current-password" required></label>
          <p v-if="errorMessage" class="admin-error" role="alert">{{ errorMessage }}</p>
          <button class="admin-primary-button" type="submit" :disabled="busy">{{ busy ? 'Вход…' : 'Вход' }}</button>
        </form>
      </section>

      <div v-else class="admin-workspace">
        <section class="admin-editor">
          <p class="section-label">{{ form.id ? 'Редактиране' : 'Нов материал' }}</p>
          <h1>{{ form.kind === 'news' ? 'Новина' : 'Галерия' }}</h1>
          <form @submit.prevent="save">
            <div class="admin-inline">
              <label>Тип<select v-model="form.kind"><option value="news">Новина</option><option value="gallery">Галерия</option></select></label>
              <label>Позиция<input v-model.number="form.sort_order" type="number" min="0" step="1"></label>
              <label>Дата<input v-model="form.event_date" type="date"></label>
            </div>
            <label>Адрес на материала (латиница)<input v-model="form.slug" type="text" placeholder="turnir-sofia-2026" required></label>
            <label v-if="form.kind === 'gallery'">Категория
              <select v-model="form.category_slug" required>
                <option :value="null" disabled>Изберете категория</option>
                <option value="training">Тренировки в залата</option>
                <option value="tournaments">Турнири и състезания</option>
                <option value="kids">Детски тренировки</option>
                <option value="adults">Тренировки за възрастни</option>
              </select>
            </label>

            <fieldset><legend>Български</legend>
              <label>Заглавие<input v-model="form.title_bg" type="text" required></label>
              <label>Текст<textarea v-model="form.body_bg" rows="4" :required="form.kind === 'news'" /></label>
            </fieldset>
            <fieldset><legend>Русский</legend>
              <label>Заголовок<input v-model="form.title_ru" type="text" required></label>
              <label>Текст<textarea v-model="form.body_ru" rows="4" :required="form.kind === 'news'" /></label>
            </fieldset>
            <fieldset><legend>English</legend>
              <label>Title<input v-model="form.title_en" type="text" required></label>
              <label>Text<textarea v-model="form.body_en" rows="4" :required="form.kind === 'news'" /></label>
            </fieldset>

            <label>Снимка<input id="content-image" type="file" accept="image/jpeg,image/png,image/webp" @change="onFile"></label>
            <label>Или готов URL<input v-model="form.image_url" type="url" placeholder="https://…"></label>
            <label class="admin-check"><input v-model="form.published" type="checkbox"> Публикувай веднага</label>
            <p v-if="message" class="admin-success" role="status">{{ message }}</p>
            <p v-if="errorMessage" class="admin-error" role="alert">{{ errorMessage }}</p>
            <div class="admin-actions">
              <button class="admin-primary-button" type="submit" :disabled="busy">{{ busy ? 'Запис…' : 'Запази' }}</button>
              <button v-if="form.id" class="admin-secondary-button" type="button" @click="resetForm">Отказ</button>
            </div>
          </form>
        </section>

        <aside class="admin-library">
          <div class="admin-library__heading"><div><p class="section-label">Архив</p><h2>Материали</h2></div><button type="button" @click="resetForm">＋ Нов</button></div>
          <p v-if="!items.length">Все още няма материали.</p>
          <article v-for="item in items" :key="item.id" class="admin-item">
            <img :src="item.image_url" alt="">
            <div><small>{{ item.kind === 'news' ? 'Новина' : 'Галерия' }} · {{ item.published ? 'публикувано' : 'чернова' }}</small><h3>{{ item.title_bg }}</h3>
              <div><button type="button" @click="selectItem(item)">Редактирай</button><button type="button" class="danger" @click="removeItem(item)">Изтрий</button></div>
            </div>
          </article>
        </aside>
      </div>
    </div>
  </main>
</template>
