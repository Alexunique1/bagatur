<script setup lang="ts">
import type { Locale } from '~/data/content'
import { siteCopy, sitePhone, sitePhoneLabel } from '~/data/site'

const route = useRoute()
const config = useRuntimeConfig()
const { locale, setLocale } = useLocale()
const open = ref(false)
const t = computed(() => siteCopy[locale.value])
const homeHref = computed(() => locale.value === 'bg' ? '/' : `/?lang=${locale.value}`)
const sectionHref = (hash: string) => route.path === '/' ? hash : `${homeHref.value}${hash}`
const logoSrc = computed(() => {
  const base = config.app.baseURL.endsWith('/') ? config.app.baseURL : config.app.baseURL + '/'
  return base + 'images/bagatur-logo-main.jpg'
})
const navItems = computed(() => [
  { label: t.value.nav.programs, hash: '#programs' },
  { label: t.value.nav.trainer, hash: '#trainer' },
  { label: t.value.nav.schedule, hash: '#schedule' },
  { label: t.value.nav.gallery, hash: '#gallery' },
  { label: t.value.nav.news, hash: '#news' },
  { label: t.value.nav.contact, hash: '#contact' }
])
const go = () => { open.value = false }
const changeLocale = async (code: Locale) => {
  await setLocale(code)
  open.value = false
}
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <NuxtLink class="brand" :to="homeHref" aria-label="Bagatur BJJ Burgas">
        <img :src="logoSrc" alt="">
        <span><strong>{{ t.brandName }}</strong><small>BJJ · BURGAS</small></span>
      </NuxtLink>

      <nav class="desktop-nav" :aria-label="t.nav.home">
        <a v-for="item in navItems" :key="item.hash" :href="sectionHref(item.hash)">{{ item.label }}</a>
      </nav>

      <div class="header-actions">
        <a class="header-call" :href="'tel:' + sitePhone" :aria-label="t.callAction">
          <span class="phone-icon" aria-hidden="true">☎</span>
          <span><small>{{ t.callShort }}</small>{{ sitePhoneLabel }}</span>
        </a>

        <div class="locale-switch" :aria-label="t.language" role="group">
          <button
            v-for="code in (['bg', 'ru', 'en'] as Locale[])"
            :key="code"
            type="button"
            :class="{ active: locale === code }"
            :aria-pressed="locale === code"
            @click="changeLocale(code)"
          >{{ code.toUpperCase() }}</button>
        </div>

        <button
          class="burger"
          type="button"
          :aria-label="open ? t.closeMenu : t.menu"
          :aria-expanded="open"
          aria-controls="mobile-navigation"
          @click="open = !open"
        ><span /><span /><span /></button>
      </div>
    </div>

    <div id="mobile-navigation" class="mobile-menu" :class="{ open }">
      <nav :aria-label="t.nav.home">
        <a v-for="item in navItems" :key="item.hash" :href="sectionHref(item.hash)" @click="go">{{ item.label }}</a>
      </nav>
      <a class="mobile-call" :href="'tel:' + sitePhone">{{ t.callAction }} · {{ sitePhoneLabel }}</a>
    </div>
  </header>
</template>
