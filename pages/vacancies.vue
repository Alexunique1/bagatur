<script setup lang="ts">
import { pageMap } from '~/data/content'

const page = useLocalizedItem(pageMap['/vacancies'])
useLocalizedHead(page.value.title, page.value.description, '/vacancies')
</script>

<template>
  <PageShell v-bind="page" />
</template>
