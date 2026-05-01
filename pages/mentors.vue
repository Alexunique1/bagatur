<script setup lang="ts">
import { pages } from '~/data/site'

const { lang } = useLang()
usePageSeo(pages.mentors, '/mentors')
</script>

<template>
  <div>
    <PageHero :title="pages.mentors[lang].heading" :text="pages.mentors[lang].body" eyebrow="Mentors" />
    <section class="section mentor-card">
      <div class="coach-placeholder">{{ pages.mentors[lang].placeholder }}</div>
      <div>
        <p class="eyebrow">Coach profile</p>
        <h2>{{ lang === 'bg' ? 'Информация ще бъде добавена' : 'Information will be added' }}</h2>
        <p>{{ lang === 'bg' ? 'Тук ще има снимка, описание, опит, пояс и контактен CTA.' : 'This area will include photo, bio, experience, belt and contact CTA.' }}</p>
      </div>
    </section>
    <TrialCta />
  </div>
</template>
