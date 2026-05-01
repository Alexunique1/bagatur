<script setup lang="ts">
import { simplePages } from '~/data/site'

const { lang } = useLang()
usePageSeo(simplePages.camp, '/events/gymnasium-camp')
</script>

<template>
  <PageHero :title="simplePages.camp[lang].heading" :text="simplePages.camp[lang].body" eyebrow="GYMNASIUM CAMP" />
</template>
