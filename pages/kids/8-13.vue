<script setup lang="ts">
import { programs } from '~/data/content'

const program = programs.find((item) => item.path === '/kids/8-13')!
const page = useLocalizedItem(program)
useLocalizedHead(page.value.title, page.value.description, '/kids/8-13')
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
