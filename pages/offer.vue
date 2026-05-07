<script setup lang="ts">
import { pageMap } from '~/data/content'

const page = useLocalizedItem(pageMap['/offer'])
useLocalizedHead(page.value.title, page.value.description, '/offer')
</script>

<template>
  <PageShell v-bind="page" />
</template>
