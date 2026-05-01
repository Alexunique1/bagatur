<script setup lang="ts">
import { navItems, phone, phoneLabel, ui } from '~/data/site'

const { lang } = useLang()
const open = ref(false)

watch(() => useRoute().fullPath, () => {
  open.value = false
})
</script>

<template>
  <header class="site-header">
    <LogoStub />
    <div class="header-actions">
      <LanguageSwitch />
      <a class="phone-link" :href="`tel:${phone}`">
        <span aria-hidden="true">☎</span>
        <span>{{ phoneLabel }}</span>
      </a>
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="main-navigation"
        :aria-label="open ? ui[lang].close : ui[lang].menu"
        @click="open = !open"
      >
        <span />
        <span />
        <span />
      </button>
    </div>
    <nav id="main-navigation" class="main-nav" :class="{ open }">
      <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to">
        {{ ui[lang].nav[item.key as keyof typeof ui.bg.nav] }}
      </NuxtLink>
    </nav>
  </header>
</template>
