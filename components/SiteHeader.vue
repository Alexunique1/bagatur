<script setup lang="ts">
import { phone, phoneLabel } from '~/data/content'

const open = ref(false)
const { locale } = useLocale()

const labels = {
  bg: {
    programs: 'PROGRAMS',
    schedule: 'SCHEDULE',
    instructors: 'INSTRUCTORS',
    location: 'LOCATION',
    login: 'LOGIN',
    menu: 'Menu'
  },
  en: {
    programs: 'PROGRAMS',
    schedule: 'SCHEDULE',
    instructors: 'INSTRUCTORS',
    location: 'LOCATION',
    login: 'LOGIN',
    menu: 'Menu'
  },
  ru: {
    programs: 'ПРОГРАММЫ',
    schedule: 'РАСПИСАНИЕ',
    instructors: 'ТРЕНЕРЫ',
    location: 'ЛОКАЦИЯ',
    login: 'ВХОД',
    menu: 'Меню'
  }
} as const

const t = computed(() => labels[locale.value])
const items = computed(() => [
  { label: t.value.programs, href: '#programs' },
  { label: t.value.schedule, href: '#schedule' },
  { label: t.value.instructors, href: '#instructors' },
  { label: t.value.location, href: '#location' }
])
</script>

<template>
  <header class="stitch-header">
    <div class="stitch-header__inner">
      <NuxtLink class="stitch-logo" to="/">BAGATUR BJJ</NuxtLink>

      <nav class="stitch-nav" aria-label="Primary navigation">
        <a v-for="item in items" :key="item.href" :href="item.href">{{ item.label }}</a>
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

    <nav class="stitch-mobile-nav" :class="{ open }" aria-label="Mobile navigation">
      <a v-for="item in items" :key="item.href" :href="item.href" @click="open = false">{{ item.label }}</a>
    </nav>
  </header>
</template>
