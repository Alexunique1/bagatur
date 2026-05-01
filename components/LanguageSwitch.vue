<script setup lang="ts">
const { lang, setLang } = useLang()
</script>

<template>
  <div class="language-switch" aria-label="Language selector">
    <button type="button" :class="{ active: lang === 'bg' }" @click="setLang('bg')">BG</button>
    <button type="button" :class="{ active: lang === 'en' }" @click="setLang('en')">EN</button>
  </div>
</template>
