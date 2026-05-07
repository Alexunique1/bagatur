<script setup lang="ts">
import { pageMap } from '~/data/content'

const page = useLocalizedItem(pageMap['/events/gymnasium-camp'])
useLocalizedHead(page.value.title, page.value.description, '/events/gymnasium-camp')
</script>

<template>
  <PageShell v-bind="page" />
</template>
