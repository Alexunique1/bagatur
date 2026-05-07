<script setup lang="ts">
import { pageMap } from '~/data/content'

const page = useLocalizedItem(pageMap['/events/calendar'])
useLocalizedHead(page.value.title, page.value.description, '/events/calendar')
</script>

<template>
  <PageShell v-bind="page" />
</template>
