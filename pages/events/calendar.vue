<script setup lang="ts">
import { simplePages } from '~/data/site'

const { lang } = useLang()
usePageSeo(simplePages.calendar, '/events/calendar')
</script>

<template>
  <PageHero :title="simplePages.calendar[lang].heading" :text="simplePages.calendar[lang].body" eyebrow="Events" />
</template>
