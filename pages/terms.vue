<script setup lang="ts">
import { pageMap } from '~/data/content'

const page = useLocalizedItem(pageMap['/terms'])
useLocalizedHead(page.value.title, page.value.description, '/terms')
</script>

<template>
  <PageShell v-bind="page" />
</template>
