<script setup lang="ts">
import { ui } from '~/data/site'

const { lang } = useLang()
</script>

<template>
  <NuxtLink class="brand" to="/" :aria-label="ui[lang].logoAlt">
    <span class="brand-emblem">Б</span>
    <span>
      <strong>Багатур</strong>
      <small>BJJ Burgas</small>
    </span>
  </NuxtLink>
</template>
