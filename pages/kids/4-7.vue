<script setup lang="ts">
import { programs } from '~/data/content'

const program = programs.find((item) => item.path === '/kids/4-7')!
const page = useLocalizedItem(program)
useLocalizedHead(page.value.title, page.value.description, '/kids/4-7')
</script>

<template>
  <PageShell
    :title="page.title"
    :description="page.description"
    :heading="page.heading"
    :body="page.body"
    :points="page.points"
  />
</template>
