<script setup lang="ts">
import { locales } from '~/data/content'
import type { Locale } from '~/data/content'

const route = useRoute()
const { locale } = useLocale()
const menu = ref<HTMLDetailsElement | null>(null)
const current = computed(() => locales.find((item) => item.code === locale.value) || locales[0])

const labels = {
  bg: 'Избор на език',
  en: 'Language selector',
  ru: 'Выбор языка'
} as const

const languageLabel = computed(() => labels[locale.value])

const localeHref = (code: Locale) => {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(route.query)) {
    if (key === 'lang') {
      continue
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item) {
          query.append(key, item)
        }
      })
    } else if (value) {
      query.set(key, value)
    }
  }

  query.set('lang', code)
  return `${route.path}?${query.toString()}`
}

const rememberLocale = (code: Locale) => {
  locale.value = code
  if (import.meta.client) {
    localStorage.setItem('bagatur-locale', code)
    document.documentElement.lang = code
  }

  if (menu.value) {
    menu.value.open = false
  }
}
</script>

<template>
  <details ref="menu" class="language-menu">
    <summary
      class="language-menu__trigger"
      :aria-label="languageLabel"
    >
      <span class="language-menu__label">{{ current.label }}</span>
      <span class="language-menu__icon" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </summary>

    <div class="language-menu__list">
      <a
        v-for="item in locales"
        :key="item.code"
        class="language-menu__item"
        :class="{ active: locale === item.code }"
        :href="localeHref(item.code)"
        :aria-pressed="locale === item.code"
        @click="rememberLocale(item.code)"
      >
        {{ item.label }}
      </a>
    </div>
  </details>
</template>
