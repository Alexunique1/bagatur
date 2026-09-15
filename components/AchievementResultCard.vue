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

const localizedTitle = () => {
  const key = ('title_' + props.locale) as keyof CmsItem
  return String(props.result[key] || props.result.title_bg || '')
}

</script>

<template>
  <article class="achievement-result">
    <div class="achievement-result__copy">
      <h3>{{ result.competition_name || localizedTitle() }}</h3>
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