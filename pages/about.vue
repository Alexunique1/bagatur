<script setup lang="ts">
import { pageMap } from '~/data/content'

const page = useLocalizedItem(pageMap['/about'])
useLocalizedHead(page.value.title, page.value.description, '/about')
</script>

<template>
  <PageShell v-bind="page" />
</template>
