<script setup lang="ts">
defineProps<{
  title: string
  description: string
  heading: string
  body: string
  points: readonly string[]
}>()
</script>

<template>
  <article class="page-shell">
    <section class="page-hero">
      <p class="eyebrow">Bagatur BJJ Burgas</p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </section>

    <section class="content-band">
      <div>
        <p class="eyebrow">Academy</p>
        <h2>{{ heading }}</h2>
      </div>
      <p>{{ body }}</p>
      <ul class="check-list">
        <li v-for="point in points" :key="point">{{ point }}</li>
      </ul>
    </section>
  </article>
</template>
