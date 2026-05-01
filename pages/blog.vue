<script setup lang="ts">
import { simplePages } from '~/data/site'

const { lang } = useLang()
usePageSeo(simplePages.blog, '/blog')
</script>

<template>
  <PageHero :title="simplePages.blog[lang].heading" :text="simplePages.blog[lang].body" eyebrow="Blog" />
</template>
