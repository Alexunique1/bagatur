<script setup lang="ts">
import { pageMap } from '~/data/content'

const page = useLocalizedItem(pageMap['/blog'])
useLocalizedHead(page.value.title, page.value.description, '/blog')
</script>

<template>
  <PageShell v-bind="page" />
</template>
