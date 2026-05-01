<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  text: string
}>()

const heroImage = useAssetPath('/images/hero-bjj-burgas.png')
</script>

<template>
  <section class="page-hero" :style="{ '--page-hero-image': `url(${heroImage})` }">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p>{{ text }}</p>
  </section>
</template>
