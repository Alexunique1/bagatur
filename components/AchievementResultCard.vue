<script setup lang="ts">
import type { Locale } from '~/data/content'
import type { CmsItem } from '~/types/cms'

const props = defineProps<{
  result: CmsItem
  locale: Locale
  medals: {
    children: string
    gold: string
    silver: string
    bronze: string
  }
}>()

const localized = (field: 'title' | 'body') => {
  const key = (field + '_' + props.locale) as keyof CmsItem
  const fallback = (field + '_bg') as keyof CmsItem
  return String(props.result[key] || props.result[fallback] || '')
}

const formattedDate = computed(() => {
  const value = props.result.event_date
  if (!value) return ''
  const normalized = value.includes(' ') ? value.replace(' ', 'T') : value
  const date = new Date(normalized)
  if (Number.isNaN(date.getTime())) return value.slice(0, 10)
  const language = props.locale === 'bg' ? 'bg-BG' : props.locale === 'ru' ? 'ru-RU' : 'en-GB'
  return new Intl.DateTimeFormat(language, { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
})
</script>

<template>
  <article class="achievement-result">
    <div class="achievement-result__copy">
      <time v-if="result.event_date" :datetime="result.event_date.slice(0, 10)">{{ formattedDate }}</time>
      <h3>{{ result.competition_name || localized('title') }}</h3>
      <p v-if="result.competition_location" class="achievement-result__location">{{ result.competition_location }}</p>
      <p v-if="localized('body')">{{ localized('body') }}</p>
    </div>
    <div class="achievement-result__medals">
      <p>{{ medals.children }}</p>
      <dl class="medal-tally">
        <div class="medal-tally__gold"><dt>{{ medals.gold }}</dt><dd>{{ result.gold_count || 0 }}</dd></div>
        <div class="medal-tally__silver"><dt>{{ medals.silver }}</dt><dd>{{ result.silver_count || 0 }}</dd></div>
        <div class="medal-tally__bronze"><dt>{{ medals.bronze }}</dt><dd>{{ result.bronze_count || 0 }}</dd></div>
      </dl>
    </div>
  </article>
</template>