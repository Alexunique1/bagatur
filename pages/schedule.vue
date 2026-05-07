<script setup lang="ts">
import { pageMap } from '~/data/content'

const page = useLocalizedItem(pageMap['/schedule'])
useLocalizedHead(page.value.title, page.value.description, '/schedule')
</script>

<template>
  <PageShell v-bind="page" />
</template>
