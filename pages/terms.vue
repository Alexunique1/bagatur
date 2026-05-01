<script setup lang="ts">
import { simplePages } from '~/data/site'

const { lang } = useLang()
usePageSeo(simplePages.terms, '/terms')
</script>

<template><PageHero :title="simplePages.terms[lang].heading" :text="simplePages.terms[lang].body" /></template>
