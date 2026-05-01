<script setup lang="ts">
import { simplePages } from '~/data/site'

const { lang } = useLang()
usePageSeo(simplePages.schedule, '/schedule')
</script>

<template>
  <div>
    <PageHero :title="simplePages.schedule[lang].heading" :text="simplePages.schedule[lang].body" eyebrow="Schedule" />
    <section class="section schedule-preview">
      <div class="schedule-grid wide">
        <span>4-7</span>
        <span>8-13</span>
        <span>{{ lang === 'bg' ? 'Възрастна група' : 'Adult group' }}</span>
      </div>
    </section>
  </div>
</template>
