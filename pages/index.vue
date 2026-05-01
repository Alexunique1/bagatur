<script setup lang="ts">
import { pages, phone, ui } from '~/data/site'

const { lang } = useLang()
usePageSeo(pages.home, '/')
const config = useRuntimeConfig()
const heroImage = useAssetPath('/images/hero-bjj-burgas.png')
const activeSlide = ref(0)
let slideTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  slideTimer = setInterval(() => {
    activeSlide.value = activeSlide.value === 0 ? 1 : 0
  }, 5000)
})

onBeforeUnmount(() => {
  if (slideTimer) {
    clearInterval(slideTimer)
  }
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SportsActivityLocation',
        name: 'Bagatur BJJ Burgas',
        url: config.public.siteUrl,
        telephone: phone,
        image: `${config.public.siteUrl}/images/hero-bjj-burgas.png`,
        sport: ['Brazilian Jiu-Jitsu', 'Functional training'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Burgas',
          addressCountry: 'BG'
        },
        areaServed: 'Burgas, Bulgaria'
      })
    }
  ]
}))
</script>

<template>
  <div>
    <section class="home-slider" aria-label="Hero slider">
      <article class="slide" :class="{ active: activeSlide === 0 }">
        <img :src="heroImage" alt="">
        <div class="slide-content">
          <p class="eyebrow">{{ pages.home[lang].heroEyebrow }}</p>
          <h1>{{ pages.home[lang].heroTitle }}</h1>
          <p>{{ pages.home[lang].heroCopy }}</p>
          <div class="hero-actions">
            <a class="primary-btn" :href="`tel:${phone}`">{{ ui[lang].trial }}</a>
            <NuxtLink class="secondary-btn" to="/kids/4-7">{{ ui[lang].nav.kids47 }}</NuxtLink>
          </div>
        </div>
      </article>
      <article class="slide second" :class="{ active: activeSlide === 1 }">
        <img :src="heroImage" alt="">
        <div class="slide-content">
          <p class="eyebrow">BJJ • EQ • Soft Skills</p>
          <h2>{{ pages.home[lang].slideTwoTitle }}</h2>
          <p>{{ pages.home[lang].slideTwoCopy }}</p>
          <div class="hero-actions">
            <NuxtLink class="primary-btn" to="/schedule">{{ ui[lang].nav.schedule }}</NuxtLink>
            <NuxtLink class="secondary-btn" to="/methodology">{{ ui[lang].nav.methodology }}</NuxtLink>
          </div>
        </div>
      </article>
      <div class="slider-dots" aria-hidden="true">
        <span :class="{ active: activeSlide === 0 }" />
        <span :class="{ active: activeSlide === 1 }" />
      </div>
    </section>

    <section class="section split">
      <div>
        <p class="eyebrow">Brazilian Jiu-Jitsu</p>
        <h2>{{ pages.home[lang].softTitle }}</h2>
      </div>
      <p>{{ pages.home[lang].softCopy }}</p>
    </section>

    <section class="section cards-section">
      <NuxtLink class="program-tile" to="/kids/4-7">
        <span>4-7</span>
        <h3>{{ ui[lang].nav.kids47 }}</h3>
      </NuxtLink>
      <NuxtLink class="program-tile" to="/kids/8-13">
        <span>8-13</span>
        <h3>{{ ui[lang].nav.kids813 }}</h3>
      </NuxtLink>
      <NuxtLink class="program-tile" to="/adults/bjj">
        <span>BJJ</span>
        <h3>{{ ui[lang].nav.adultBjj }}</h3>
      </NuxtLink>
      <NuxtLink class="program-tile" to="/adults/functional-training">
        <span>FIT</span>
        <h3>{{ lang === 'bg' ? 'Функционален тренинг' : 'Functional training' }}</h3>
      </NuxtLink>
    </section>

    <section class="section schedule-preview">
      <div>
        <p class="eyebrow">{{ ui[lang].nav.schedule }}</p>
        <h2>{{ pages.home[lang].scheduleTitle }}</h2>
        <p>{{ pages.home[lang].scheduleCopy }}</p>
      </div>
      <div class="schedule-grid">
        <span>4-7</span>
        <span>8-13</span>
        <span>{{ lang === 'bg' ? 'Възрастни' : 'Adults' }}</span>
      </div>
    </section>

    <section class="section note">
      <p>{{ pages.home[lang].donorNote }}</p>
    </section>

    <TrialCta />
  </div>
</template>
