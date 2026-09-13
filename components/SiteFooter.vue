<script setup lang="ts">
import { mapUrl, siteCopy, sitePhone, sitePhoneLabel } from '~/data/site'

const config = useRuntimeConfig()
const { locale } = useLocale()
const t = computed(() => siteCopy[locale.value])
const year = ref(new Date().getFullYear())
let yearRefreshTimer: number | undefined

const scheduleYearRefresh = () => {
  const now = new Date()
  year.value = now.getFullYear()

  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  yearRefreshTimer = window.setTimeout(scheduleYearRefresh, nextMidnight.getTime() - now.getTime() + 1000)
}

onMounted(scheduleYearRefresh)

onBeforeUnmount(() => {
  if (yearRefreshTimer) window.clearTimeout(yearRefreshTimer)
})

const logoSrc = computed(() => {
  const base = config.app.baseURL.endsWith('/') ? config.app.baseURL : config.app.baseURL + '/'
  return base + 'images/bagatur-logo-main.jpg'
})
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="footer-brand">
        <img :src="logoSrc" alt="">
        <div><strong>{{ t.brandName }}</strong><p>{{ t.footerTagline }}</p></div>
      </div>
      <div class="footer-contact">
        <a :href="'tel:' + sitePhone">{{ sitePhoneLabel }}</a>
        <a :href="mapUrl" target="_blank" rel="noopener">{{ t.address }}</a>
      </div>
      <div class="footer-meta">
        <span>© <span data-allow-mismatch="text">{{ year }}</span> Bagatur BJJ Burgas. {{ t.rights }}</span>
      </div>
    </div>
  </footer>
</template>
