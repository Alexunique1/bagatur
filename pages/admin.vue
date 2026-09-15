<script setup lang="ts">
import type { CmsItem, CmsKind } from '~/types/cms'
import { cleanCmsBase, cmsErrorMessage, cmsRecord, type EditorAuth, type PocketBaseList } from '~/utils/cmsApi'

definePageMeta({ layout: 'admin' })

const config = useRuntimeConfig()
const cmsBase = cleanCmsBase(config.public.cmsUrl)
const storageKey = 'bagatur-editor-token'
const token = ref('')
const session = computed(() => Boolean(token.value))
const username = ref('')
const password = ref('')
const busy = ref(false)
const message = ref('')
const errorMessage = ref('')
const items = ref<CmsItem[]>([])
const uploadFile = ref<File | null>(null)
const originalKind = ref<CmsKind | null>(null)

type EditorForm = Omit<CmsItem, 'id' | 'is_demo'> & { id?: string, external_image_url?: string }
const emptyForm = (): EditorForm => ({
  kind: 'news', slug: '',
  title_bg: '', title_ru: '', title_en: '',
  body_bg: '', body_ru: '', body_en: '',
  image: '', image_url: '', external_image_url: '', category_slug: null, event_date: null,
  published: false, sort_order: 10,
  competition_name: '', competition_location: '', gold_count: 0, silver_count: 0, bronze_count: 0
})
const form = reactive<EditorForm>(emptyForm())
const isResult = computed(() => form.kind === 'result')
const isEditing = computed(() => Boolean(form.id))
const kindOptions: Array<{ value: CmsKind, label: string, description: string }> = [
  { value: 'news', label: 'Новина', description: 'Заглавие, текст и снимка' },
  { value: 'result', label: 'Резултат', description: 'Състезание и спечелени медали' },
  { value: 'gallery', label: 'Галерия', description: 'Снимка в избрана категория' }
]
const kindName = (kind: CmsKind) => kind === 'news' ? 'Новина' : kind === 'gallery' ? 'Галерия' : 'Резултат от състезание'
const imageGuidance = computed(() => {
  if (form.kind === 'gallery') {
    return 'Препоръчително: 1600 × 1200 px (4:3), JPG или WebP. Дръжте хората и важните детайли в централните 70% — обложките се изрязват адаптивно на различни екрани.'
  }
  return 'Препоръчително: 1600 × 900 px (16:9), JPG или WebP. Максимален размер на файла: 10 MB.'
})

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
  originalKind.value = null
  uploadFile.value = null
  const input = document.querySelector<HTMLInputElement>('#content-image')
  if (input) input.value = ''
}

const startNew = (kind: CmsKind) => {
  clearStatus()
  resetForm()
  form.kind = kind
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const api = async <T>(path: string, init: RequestInit = {}, withAuth = true): Promise<T> => {
  const headers = new Headers(init.headers)
  if (withAuth && token.value) headers.set('Authorization', token.value)
  const response = await fetch(`${cmsBase}${path}`, { ...init, headers })
  if (!response.ok) throw new Error(await cmsErrorMessage(response, 'Заявката не беше изпълнена.'))
  if (response.status === 204) return undefined as T
  return await response.json() as T
}

const loadItems = async () => {
  if (!session.value) return
  const query = new URLSearchParams({ sort: 'sort_order,-event_date', perPage: '200' })
  const payload = await api<PocketBaseList<CmsItem>>(`/api/collections/content_items/records?${query}`)
  items.value = payload.items.map(item => cmsRecord(item, cmsBase))
}

const login = async () => {
  clearStatus()
  busy.value = true
  try {
    const auth = await api<EditorAuth>('/api/collections/editors/auth-with-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity: username.value.trim(), password: password.value })
    }, false)
    token.value = auth.token
    localStorage.setItem(storageKey, auth.token)
    password.value = ''
    try {
      await loadItems()
    } catch (error: any) {
      errorMessage.value = ('Входът е успешен, но материалите не се заредиха. ' + (error?.message || '')).trim()
    }
  } catch {
    token.value = ''
    localStorage.removeItem(storageKey)
    errorMessage.value = 'Потребителското име или паролата е неправилно.'
  } finally {
    busy.value = false
  }
}

const logout = () => {
  token.value = ''
  localStorage.removeItem(storageKey)
  items.value = []
  resetForm()
}

const selectItem = (item: CmsItem) => {
  clearStatus()
  uploadFile.value = null
  const input = document.querySelector<HTMLInputElement>('#content-image')
  if (input) input.value = ''
  originalKind.value = item.kind
  Object.assign(form, {
    id: item.id, kind: item.kind, slug: item.slug,
    title_bg: item.title_bg || '', title_ru: item.title_ru || '', title_en: item.title_en || '',
    body_bg: item.body_bg || '', body_ru: item.body_ru || '', body_en: item.body_en || '',
    image: item.image || '', image_url: item.image_url || '', external_image_url: item.external_image_url || '',
    category_slug: item.category_slug || null, event_date: item.event_date ? item.event_date.slice(0, 10) : null,
    published: Boolean(item.published), sort_order: Number(item.sort_order) || 0,
    competition_name: item.competition_name || '', competition_location: item.competition_location || '',
    gold_count: Number(item.gold_count) || 0, silver_count: Number(item.silver_count) || 0, bronze_count: Number(item.bronze_count) || 0
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onFile = (event: Event) => {
  uploadFile.value = (event.target as HTMLInputElement).files?.[0] || null
}

const slugify = (value: string) => value
  .normalize('NFKD')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const append = (payload: FormData, key: string, value: unknown) => {
  payload.append(key, value === null || value === undefined ? '' : String(value))
}

const save = async () => {
  if (!session.value) return
  clearStatus()

  if (isEditing.value && originalKind.value && form.kind !== originalKind.value) {
    errorMessage.value = 'Типът на съществуващ материал не може да се променя. Създайте нов материал от правилния тип.'
    return
  }

  if (isResult.value) {
    if (!form.competition_name?.trim() || !form.event_date) {
      errorMessage.value = 'Добавете име и дата на състезанието.'
      return
    }
  } else {
    const titlesReady = form.title_bg.trim() && form.title_ru.trim() && form.title_en.trim()
    const bodiesReady = form.kind === 'gallery' || (form.body_bg.trim() && form.body_ru.trim() && form.body_en.trim())
    const categoryReady = form.kind !== 'gallery' || Boolean(form.category_slug)
    const imageReady = Boolean(uploadFile.value || form.image || form.external_image_url)
    if (!titlesReady || !bodiesReady || !categoryReady || !imageReady) {
      errorMessage.value = 'Попълнете трите езикови версии. За галерия изберете категория и добавете снимка.'
      return
    }
  }

  if (uploadFile.value) {
    if (uploadFile.value.size > 10 * 1024 * 1024) {
      errorMessage.value = 'Снимката е по-голяма от 10 MB.'
      return
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(uploadFile.value.type)) {
      errorMessage.value = 'Разрешени формати: JPG, PNG и WebP.'
      return
    }
  }

  busy.value = true
  try {
    const competitionName = form.competition_name?.trim() || ''
    const sourceForSlug = isResult.value ? competitionName : (form.title_en || form.title_bg)
    const generatedSlug = [slugify(sourceForSlug), form.event_date || ''].filter(Boolean).join('-') || `${form.kind}-${Date.now()}`
    const normalizedSlug = slugify(form.slug) || generatedSlug
    const payload = new FormData()
    append(payload, 'kind', form.kind)
    append(payload, 'slug', normalizedSlug)
    append(payload, 'title_bg', isResult.value ? competitionName : form.title_bg.trim())
    append(payload, 'title_ru', isResult.value ? competitionName : form.title_ru.trim())
    append(payload, 'title_en', isResult.value ? competitionName : form.title_en.trim())
    append(payload, 'body_bg', form.body_bg.trim())
    append(payload, 'body_ru', form.body_ru.trim())
    append(payload, 'body_en', form.body_en.trim())
    append(payload, 'image_url', form.external_image_url?.trim() || '')
    append(payload, 'category_slug', form.kind === 'gallery' ? form.category_slug : '')
    append(payload, 'event_date', form.event_date ? `${form.event_date} 00:00:00.000Z` : '')
    append(payload, 'published', form.published)
    append(payload, 'sort_order', Number(form.sort_order) || 0)
    append(payload, 'competition_name', isResult.value ? competitionName : '')
    append(payload, 'competition_location', isResult.value ? form.competition_location?.trim() : '')
    append(payload, 'gold_count', isResult.value ? Math.max(0, Number(form.gold_count) || 0) : 0)
    append(payload, 'silver_count', isResult.value ? Math.max(0, Number(form.silver_count) || 0) : 0)
    append(payload, 'bronze_count', isResult.value ? Math.max(0, Number(form.bronze_count) || 0) : 0)
    if (uploadFile.value) payload.append('image', uploadFile.value)

    if (form.id) {
      await api(`/api/collections/content_items/records/${form.id}`, { method: 'PATCH', body: payload })
    } else {
      await api('/api/collections/content_items/records', { method: 'POST', body: payload })
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
  if (!session.value || !confirm(`Изтриване на „${item.competition_name || item.title_bg}“?`)) return
  clearStatus()
  try {
    await api(`/api/collections/content_items/records/${item.id}`, { method: 'DELETE' })
    message.value = 'Материалът е изтрит.'
    if (form.id === item.id) resetForm()
    await loadItems()
  } catch (error: any) {
    errorMessage.value = error?.message || 'Материалът не беше изтрит.'
  }
}

const kindLabel = (item: CmsItem) => kindName(item.kind)

onMounted(async () => {
  token.value = localStorage.getItem(storageKey) || ''
  if (!token.value) return
  try {
    const auth = await api<EditorAuth>('/api/collections/editors/auth-refresh', { method: 'POST' })
    token.value = auth.token
    localStorage.setItem(storageKey, auth.token)
    await loadItems()
  } catch {
    logout()
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

      <section v-if="!session" class="admin-login">

        <h1>Вход в редактора</h1>
        <p>Въведете потребителско име и парола.</p>
        <form @submit.prevent="login">
          <label>Потребителско име<input v-model="username" type="text" autocomplete="username" required></label>
          <label>Парола<input v-model="password" type="password" autocomplete="current-password" required></label>
          <p v-if="errorMessage" class="admin-error" role="alert">{{ errorMessage }}</p>
          <button class="admin-primary-button" type="submit" :disabled="busy">{{ busy ? 'Вход…' : 'Вход' }}</button>
        </form>
      </section>

      <div v-else class="admin-workspace">
        <section class="admin-editor">
          <p class="section-label">{{ form.id ? 'Редактиране' : 'Нов материал' }}</p>
          <h1>{{ form.kind === 'news' ? 'Новина' : form.kind === 'gallery' ? 'Галерия' : 'Резултат' }}</h1>
          <div v-if="!isEditing" class="admin-kind-picker" role="group" aria-label="Изберете тип на новия материал">
            <button
              v-for="option in kindOptions"
              :key="option.value"
              type="button"
              :class="{ active: form.kind === option.value }"
              :aria-pressed="form.kind === option.value"
              @click="startNew(option.value)"
            >
              <strong>{{ option.label }}</strong>
              <span>{{ option.description }}</span>
            </button>
          </div>
          <div v-else class="admin-kind-lock">
            <span>Тип материал</span>
            <strong>{{ kindName(form.kind) }}</strong>
            <small>Типът е заключен, за да не бъде заменен друг материал.</small>
          </div>
          <form @submit.prevent="save">
            <div class="admin-inline" :class="{ 'is-result': isResult }">
              <label>Позиция<input v-model.number="form.sort_order" type="number" min="0" step="1"></label>
              <label v-if="isResult">Дата на състезанието<input v-model="form.event_date" type="date" required><small>Използва се за хронологично подреждане.</small></label>
            </div>

            <template v-if="isResult">
              <label>Име на състезанието<input v-model="form.competition_name" type="text" placeholder="AGF Plovdiv Championships" required></label>
              <fieldset class="admin-medals"><legend>Медали на децата от отбора</legend>
                <label>Златни<input v-model.number="form.gold_count" type="number" min="0" step="1" required></label>
                <label>Сребърни<input v-model.number="form.silver_count" type="number" min="0" step="1" required></label>
                <label>Бронзови<input v-model.number="form.bronze_count" type="number" min="0" step="1" required></label>
              </fieldset>
              <p class="admin-help">На сайта ще се покажат само името на състезанието и броят на медалите.</p>
            </template>

            <label v-else>Технически адрес <small>(по желание — създава се автоматично)</small><input v-model="form.slug" type="text" placeholder="turnir-sofia-2026"></label>
            <label v-if="form.kind === 'gallery'">Категория
              <select v-model="form.category_slug" required>
                <option :value="null" disabled>Изберете категория</option>
                <option value="training">Тренировки в залата</option>
                <option value="tournaments">Турнири и състезания</option>
                <option value="kids">Детски тренировки</option>
                <option value="adults">Тренировки за възрастни</option>
              </select>
            </label>

            <fieldset v-if="!isResult"><legend>Български</legend>
              <label>Заглавие<input v-model="form.title_bg" type="text" required></label>
              <label>Текст<textarea v-model="form.body_bg" rows="4" :required="form.kind === 'news'" /></label>
            </fieldset>
            <fieldset v-if="!isResult"><legend>Русский</legend>
              <label>Заголовок<input v-model="form.title_ru" type="text" required></label>
              <label>Текст<textarea v-model="form.body_ru" rows="4" :required="form.kind === 'news'" /></label>
            </fieldset>
            <fieldset v-if="!isResult"><legend>English</legend>
              <label>Title<input v-model="form.title_en" type="text" required></label>
              <label>Text<textarea v-model="form.body_en" rows="4" :required="form.kind === 'news'" /></label>
            </fieldset>

            <label v-if="!isResult" class="admin-image-upload">Снимка
              <input id="content-image" type="file" accept="image/jpeg,image/png,image/webp" aria-describedby="content-image-guidance" @change="onFile">
              <span id="content-image-guidance" class="admin-image-guidance">{{ imageGuidance }}</span>
            </label>
            <label v-if="!isResult">Или готов URL <small>(по желание)</small><input v-model="form.external_image_url" type="url" placeholder="https://…"></label>
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
          <div class="admin-library__heading"><div><p class="section-label">Архив</p><h2>Материали</h2></div></div>
          <div class="admin-library__new" aria-label="Създайте нов материал">
            <button type="button" @click="startNew('news')">＋ Новина</button>
            <button type="button" @click="startNew('result')">＋ Резултат</button>
            <button type="button" @click="startNew('gallery')">＋ Галерия</button>
          </div>
          <p v-if="!items.length">Все още няма материали.</p>
          <article v-for="item in items" :key="item.id" class="admin-item">
            <img v-if="item.image_url" :src="item.image_url" alt="">
            <div v-else class="admin-item__empty" aria-hidden="true">R</div>
            <div><small>{{ kindLabel(item) }} · {{ item.published ? 'публикувано' : 'чернова' }}</small><h3>{{ item.competition_name || item.title_bg }}</h3>
              <p v-if="item.kind === 'result'" class="admin-item__medals">Злато {{ item.gold_count || 0 }} · Сребро {{ item.silver_count || 0 }} · Бронз {{ item.bronze_count || 0 }}</p>
              <div><button type="button" @click="selectItem(item)">Редактирай</button><button type="button" class="danger" @click="removeItem(item)">Изтрий</button></div>
            </div>
          </article>
        </aside>
      </div>
    </div>
  </main>
</template>
