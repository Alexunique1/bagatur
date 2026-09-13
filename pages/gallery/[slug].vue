<script setup lang="ts">
import type { CmsItem } from '~/types/cms'
import { galleryCategoryOrder, siteCopy, sitePhone } from '~/data/site'

const route = useRoute()
const config = useRuntimeConfig()
const { locale } = useLocale()
const { gallery, loading } = useCmsContent()
const t = computed(() => siteCopy[locale.value])
const categorySlug = String(route.params.slug || '')

if (!galleryCategoryOrder.includes(categorySlug as typeof galleryCategoryOrder[number])) {
  throw createError({ statusCode: 404, statusMessage: 'Gallery category not found' })
}

const category = computed(() => t.value.galleryCategories[categorySlug])
const photos = computed(() => gallery.value.filter((item) => (item.category_slug || item.slug) === categorySlug))
const coverImage = computed(() => photos.value[0]?.image_url || '/images/bagatur-logo-main.jpg')
const absoluteCoverImage = computed(() => /^https?:\/\//.test(coverImage.value)
  ? coverImage.value
  : config.public.siteUrl + assetPath(coverImage.value))
const homeQuery = computed(() => locale.value === 'bg' ? {} : { lang: locale.value })
const photoLabel = computed(() => photos.value.length === 1 ? t.value.galleryPhotoOne : t.value.galleryPhotoLabel)

const assetPath = (path: string) => {
  if (/^https?:\/\//.test(path)) return path
  const base = config.app.baseURL.endsWith('/') ? config.app.baseURL : config.app.baseURL + '/'
  return base + path.replace(/^\//, '')
}
const localized = (item: CmsItem, field: 'title' | 'body') => {
  const key = (field + '_' + locale.value) as keyof CmsItem
  const fallback = (field + '_bg') as keyof CmsItem
  return String(item[key] || item[fallback] || '')
}

useHead({
  title: () => `${category.value.title} | Bagatur BJJ Burgas`,
  htmlAttrs: () => ({ lang: locale.value }),
  meta: [
    { name: 'description', content: () => category.value.text },
    { property: 'og:title', content: () => `${category.value.title} | Bagatur BJJ Burgas` },
    { property: 'og:description', content: () => category.value.text },
    { property: 'og:image', content: () => absoluteCoverImage.value }
  ]
})
</script>

<template>
  <div class="gallery-page">
    <!--
    THESIS: A category is a documentary chapter, not a detached image grid.
    OWN-WORLD: forge-black photographic field, antique-gold rules, bone viewing room.
    STORY: identify the category, understand its context, browse every available photograph.
    FIRST VIEWPORT: one decisive cover image with a compact return path and category title.
    FORM: an Experience-mode extension of the established Training Hall composition.
    -->
    <section class="gallery-collection-hero">
      <img :src="assetPath(coverImage)" :alt="category.title">
      <span class="gallery-collection-hero__shade" />
      <div class="page-shell gallery-collection-hero__copy">
        <NuxtLink :to="{ path: '/', query: homeQuery, hash: '#gallery' }" class="gallery-back">← {{ t.galleryBack }}</NuxtLink>
        <p class="section-label">{{ t.galleryLabel }}</p>
        <h1>{{ category.title }}</h1>
        <p>{{ category.text }}</p>
        <span class="gallery-count">{{ photos.length }} {{ photoLabel }}</span>
      </div>
    </section>

    <section class="gallery-collection section-bone">
      <div class="page-shell">
        <div v-if="photos.length" class="gallery-collection-grid" :class="{ loading }">
          <figure v-for="photo in photos" :key="photo.id">
            <img :src="assetPath(photo.image_url)" :alt="localized(photo, 'title')" loading="lazy">
            <figcaption>{{ localized(photo, 'title') }}</figcaption>
          </figure>
        </div>
        <p v-else class="gallery-collection-empty">{{ t.galleryEmpty }}</p>
      </div>
    </section>

    <a class="mobile-sticky-call" :href="'tel:' + sitePhone">☎ {{ t.callShort }}</a>
  </div>
</template>
