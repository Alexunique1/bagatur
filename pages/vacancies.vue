<script setup lang="ts">
import { simplePages } from '~/data/site'

const { lang } = useLang()
usePageSeo(simplePages.vacancies, '/vacancies')
</script>

<template><PageHero :title="simplePages.vacancies[lang].heading" :text="simplePages.vacancies[lang].body" /></template>
