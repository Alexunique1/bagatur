<script setup lang="ts">
const { locale } = useLocale()

const copy = {
  bg: {
    privacy: 'PRIVACY POLICY',
    terms: 'TERMS OF SERVICE',
    rules: 'MEMBERSHIP RULES',
    rights: 'ALL RIGHTS RESERVED'
  },
  en: {
    privacy: 'PRIVACY POLICY',
    terms: 'TERMS OF SERVICE',
    rules: 'MEMBERSHIP RULES',
    rights: 'ALL RIGHTS RESERVED'
  },
  ru: {
    privacy: 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ',
    terms: 'ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ',
    rules: 'ПРАВИЛА АБОНЕМЕНТА',
    rights: 'ВСЕ ПРАВА ЗАЩИЩЕНЫ'
  }
} as const

const t = computed(() => copy[locale.value])
</script>

<template>
  <footer class="stitch-footer">
    <div class="stitch-footer__inner">
      <div class="stitch-footer__brand">BAGATUR BJJ BURGAS</div>
      <nav class="stitch-footer__nav" aria-label="Footer navigation">
        <NuxtLink to="/privacy">{{ t.privacy }}</NuxtLink>
        <NuxtLink to="/terms">{{ t.terms }}</NuxtLink>
        <NuxtLink to="/offer">{{ t.rules }}</NuxtLink>
      </nav>
      <div class="stitch-footer__copy">© 2024 BAGATUR BJJ BURGAS. {{ t.rights }}.</div>
    </div>
  </footer>
</template>
