<script setup lang="ts">
import type { CmsItem } from '~/types/cms'
import { siteCopy, sitePhone } from '~/data/site'

const config = useRuntimeConfig()
const { locale } = useLocale()
const { results, loading } = useCmsContent()
const t = computed(() => siteCopy[locale.value])
const homeQuery = computed(() => locale.value === 'bg' ? {} : { lang: locale.value })

const resultTimestamp = (item: CmsItem) => {
  if (!item.event_date) return 0
  const normalized = item.event_date.includes(' ') ? item.event_date.replace(' ', 'T') : item.event_date
  const value = new Date(normalized).getTime()
  return Number.isNaN(value) ? 0 : value
}

const orderedResults = computed(() => [...results.value]
  .sort((a, b) => resultTimestamp(b) - resultTimestamp(a) || Number(a.sort_order || 0) - Number(b.sort_order || 0)))

useHead({
  title: () => t.value.achievementsArchive.metaTitle,
  htmlAttrs: () => ({ lang: locale.value }),
  meta: [
    { name: 'description', content: () => t.value.achievementsArchive.text },
    { property: 'og:title', content: () => t.value.achievementsArchive.metaTitle },
    { property: 'og:description', content: () => t.value.achievementsArchive.text },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: () => config.public.siteUrl + '/achievements/' }
  ],
  link: [{ rel: 'canonical', href: () => config.public.siteUrl + '/achievements/' }]
})
</script>

<template>
  <div class="achievements-page">
    <section class="achievements-archive-hero">
      <div class="page-shell">
        <NuxtLink :to="{ path: '/', query: homeQuery, hash: '#achievements' }" class="gallery-back">
          {{ t.achievementsArchive.back }}
        </NuxtLink>
        <h1>{{ t.achievementsArchive.title }}</h1>
        <p>{{ t.achievementsArchive.text }}</p>
      </div>
    </section>

    <section class="achievements-archive section-bone">
      <div class="page-shell">
        <div v-if="orderedResults.length" class="achievement-results achievement-archive__list" :class="{ loading }">
          <AchievementResultCard
            v-for="result in orderedResults"
            :key="result.id"
            :result="result"
            :locale="locale"
            :medals="t.medals"
          />
        </div>
        <p v-else class="achievements-archive__empty">{{ t.achievementsArchive.empty }}</p>
      </div>
    </section>

    <a class="mobile-sticky-call" :href="'tel:' + sitePhone">☎ {{ t.callShort }}</a>
  </div>
</template>