<script setup lang="ts">
import { phone, ui } from '~/data/site'

const { lang } = useLang()
</script>

<template>
  <section class="trial-cta">
    <div>
      <p class="eyebrow">{{ ui[lang].trial }}</p>
      <h2>{{ lang === 'bg' ? 'Запишете се за първа среща на татамито' : 'Book the first meeting on the mats' }}</h2>
    </div>
    <a class="primary-btn" :href="`tel:${phone}`">{{ ui[lang].call }}</a>
  </section>
</template>
