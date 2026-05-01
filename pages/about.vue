<script setup lang="ts">
import { pages } from '~/data/site'

const { lang } = useLang()
usePageSeo(pages.about, '/about')
</script>

<template>
  <div>
    <PageHero :title="pages.about[lang].heading" :text="pages.about[lang].body" eyebrow="Bagatur" />
    <section class="section bullet-grid">
      <article v-for="item in pages.about[lang].bullets" :key="item">
        <h2>{{ item }}</h2>
      </article>
    </section>
    <TrialCta />
  </div>
</template>
