<script setup lang="ts">
import { phone, phoneLabel } from '~/data/content'

const open = ref(false)
const { locale } = useLocale()

const labels = {
  bg: {
    programs: 'ПРОГРАМИ',
    schedule: 'РАЗПИСАНИЕ',
    instructors: 'ТРЕНЬОРИ',
    location: 'ЛОКАЦИЯ',
    login: 'ЗАПИСВАНЕ',
    menu: 'Меню',
    navLabel: 'Основна навигация',
    mobileNavLabel: 'Мобилна навигация'
  },
  en: {
    programs: 'PROGRAMS',
    schedule: 'SCHEDULE',
    instructors: 'INSTRUCTORS',
    location: 'LOCATION',
    login: 'LOGIN',
    menu: 'Menu',
    navLabel: 'Primary navigation',
    mobileNavLabel: 'Mobile navigation'
  },
  ru: {
    programs: 'ПРОГРАММЫ',
    schedule: 'РАСПИСАНИЕ',
    instructors: 'ТРЕНЕРЫ',
    location: 'ЛОКАЦИЯ',
    login: 'ВХОД',
    menu: 'Меню',
    navLabel: 'Основная навигация',
    mobileNavLabel: 'Мобильная навигация'
  }
} as const

const blogLabels = {
  bg: 'БЛОГ',
  en: 'BLOG',
  ru: 'БЛОГ'
} as const

const t = computed(() => labels[locale.value])
const logoHome = { path: '/', query: { lang: 'bg' } }
const rememberBgHome = () => {
  locale.value = 'bg'
  open.value = false

  if (import.meta.client) {
    localStorage.setItem('bagatur-locale', 'bg')
    document.documentElement.lang = 'bg'
  }
}
const items = computed(() => [
  { label: t.value.programs, to: { path: '/', hash: '#programs' } },
  { label: t.value.schedule, to: { path: '/', hash: '#schedule' } },
  { label: t.value.instructors, to: { path: '/', hash: '#instructors' } },
  { label: blogLabels[locale.value], to: '/blog' },
  { label: t.value.location, to: { path: '/', hash: '#location' } }
])
</script>

<template>
  <header class="stitch-header">
    <div class="stitch-header__inner">
      <NuxtLink class="stitch-logo" :to="logoHome" @click="rememberBgHome">BAGATUR BJJ</NuxtLink>

      <nav class="stitch-nav" :aria-label="t.navLabel">
        <NuxtLink v-for="item in items" :key="item.label" :to="item.to">{{ item.label }}</NuxtLink>
      </nav>

      <div class="stitch-header__actions">
        <a class="stitch-phone" :href="`tel:${phone}`">{{ phoneLabel }}</a>
        <LanguageToggle />
        <a class="stitch-login" href="#trial">{{ t.login }}</a>
        <button class="stitch-menu" type="button" :aria-label="t.menu" :aria-expanded="open" @click="open = !open">
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>

    <nav class="stitch-mobile-nav" :class="{ open }" :aria-label="t.mobileNavLabel">
      <NuxtLink v-for="item in items" :key="item.label" :to="item.to" @click="open = false">{{ item.label }}</NuxtLink>
    </nav>
  </header>
</template>
