<script setup lang="ts">
import { programs } from '~/data/site'

const { lang } = useLang()
const page = programs.adultBjj
usePageSeo(page, page.path)
</script>

<template>
  <div>
    <PageHero :title="page[lang].heading" :text="page[lang].body" eyebrow="Adult BJJ" />
    <section class="section bullet-grid">
      <article v-for="point in page[lang].points" :key="point"><h2>{{ point }}</h2></article>
    </section>
    <TrialCta />
  </div>
</template>
