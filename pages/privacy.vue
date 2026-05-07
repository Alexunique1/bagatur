<script setup lang="ts">
import { pageMap } from '~/data/content'

const page = useLocalizedItem(pageMap['/privacy'])
useLocalizedHead(page.value.title, page.value.description, '/privacy')
</script>

<template>
  <PageShell v-bind="page" />
</template>
