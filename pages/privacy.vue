<script setup lang="ts">
import { simplePages } from '~/data/site'

const { lang } = useLang()
usePageSeo(simplePages.privacy, '/privacy')
</script>

<template><PageHero :title="simplePages.privacy[lang].heading" :text="simplePages.privacy[lang].body" /></template>
