<script setup lang="ts">
import { locales } from '~/data/content'

const { locale, setLocale } = useLocale()
const menu = ref<HTMLDetailsElement | null>(null)
const current = computed(() => locales.find((item) => item.code === locale.value) || locales[0])

const chooseLocale = async (code: typeof locales[number]['code']) => {
  await setLocale(code)
  if (menu.value) {
    menu.value.open = false
  }
}
</script>

<template>
  <details ref="menu" class="language-menu">
    <summary
      class="language-menu__trigger"
      aria-label="Language selector"
    >
      <span class="language-menu__label">{{ current.label }}</span>
      <span class="language-menu__icon" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </summary>

    <div class="language-menu__list">
      <button
        v-for="item in locales"
        :key="item.code"
        class="language-menu__item"
        :class="{ active: locale === item.code }"
        type="button"
        :aria-pressed="locale === item.code"
        @click="chooseLocale(item.code)"
      >
        {{ item.label }}
      </button>
    </div>
  </details>
</template>
