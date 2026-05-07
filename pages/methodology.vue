<script setup lang="ts">
import { pageMap } from '~/data/content'

const page = useLocalizedItem(pageMap['/methodology'])
useLocalizedHead(page.value.title, page.value.description, '/methodology')
</script>

<template>
  <PageShell v-bind="page" />
</template>
