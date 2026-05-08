<script setup lang="ts">
const { locale } = useLocale()

const copy = {
  bg: {
    privacy: 'ПОЛИТИКА ЗА ПОВЕРИТЕЛНОСТ',
    terms: 'ПОТРЕБИТЕЛСКО СПОРАЗУМЕНИЕ',
    rules: 'ПРАВИЛА ЗА АБОНАМЕНТ',
    rights: 'ВСИЧКИ ПРАВА ЗАПАЗЕНИ',
    navLabel: 'Навигация в долния колонтитул'
  },
  en: {
    privacy: 'PRIVACY POLICY',
    terms: 'TERMS OF SERVICE',
    rules: 'MEMBERSHIP RULES',
    rights: 'ALL RIGHTS RESERVED',
    navLabel: 'Footer navigation'
  },
  ru: {
    privacy: 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ',
    terms: 'ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ',
    rules: 'ПРАВИЛА АБОНЕМЕНТА',
    rights: 'ВСЕ ПРАВА ЗАЩИЩЕНЫ',
    navLabel: 'Навигация в подвале'
  }
} as const

const t = computed(() => copy[locale.value])
</script>

<template>
  <footer class="stitch-footer">
    <div class="stitch-footer__inner">
      <div class="stitch-footer__brand">BAGATUR BJJ BURGAS</div>
      <nav class="stitch-footer__nav" :aria-label="t.navLabel">
        <NuxtLink to="/privacy">{{ t.privacy }}</NuxtLink>
        <NuxtLink to="/terms">{{ t.terms }}</NuxtLink>
        <NuxtLink to="/offer">{{ t.rules }}</NuxtLink>
      </nav>
      <div class="stitch-footer__copy">© 2024 BAGATUR BJJ BURGAS. {{ t.rights }}.</div>
    </div>
  </footer>
</template>
