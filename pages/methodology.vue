<script setup lang="ts">
import { pages } from '~/data/site'

const { lang } = useLang()
usePageSeo(pages.methodology, '/methodology')
</script>

<template>
  <div>
    <PageHero :title="pages.methodology[lang].heading" :text="pages.methodology[lang].body" eyebrow="Methodology" />
    <section class="section round-list">
      <article v-for="(item, index) in pages.methodology[lang].bullets" :key="item">
        <span>{{ index + 1 }}</span>
        <p>{{ item }}</p>
      </article>
    </section>
    <TrialCta />
  </div>
</template>
