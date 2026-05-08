<script setup lang="ts">
defineProps<{
  title: string
  description: string
  heading: string
  body: string
  points: readonly string[]
}>()

const { locale } = useLocale()

const labels = {
  bg: {
    eyebrow: 'Bagatur BJJ Burgas',
    section: 'Академия'
  },
  en: {
    eyebrow: 'Bagatur BJJ Burgas',
    section: 'Academy'
  },
  ru: {
    eyebrow: 'Bagatur BJJ Burgas',
    section: 'Академия'
  }
} as const

const t = computed(() => labels[locale.value])
</script>

<template>
  <article class="page-shell">
    <section class="page-hero">
      <p class="eyebrow">{{ t.eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </section>

    <section class="content-band">
      <div>
        <p class="eyebrow">{{ t.section }}</p>
        <h2>{{ heading }}</h2>
      </div>
      <p>{{ body }}</p>
      <ul class="check-list">
        <li v-for="point in points" :key="point">{{ point }}</li>
      </ul>
    </section>
  </article>
</template>
