<script setup lang="ts">
import { pageMap } from '~/data/content'

const page = useLocalizedItem(pageMap['/mentors'])
useLocalizedHead(page.value.title, page.value.description, '/mentors')
</script>

<template>
  <PageShell v-bind="page" />
</template>
