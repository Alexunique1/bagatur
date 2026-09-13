const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://bagatur-bjj.bg'
const baseURL = process.env.NUXT_APP_BASE_URL || '/'
const previewMode = process.env.NUXT_PUBLIC_PREVIEW_MODE === 'true'
const pages = ['/', '/admin', '/api/ai-context', '/gallery/training/', '/gallery/tournaments/', '/gallery/kids/', '/gallery/adults/']

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'bg' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/jpeg', href: `${baseURL}images/bagatur-logo-main.jpg` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'alternate', hreflang: 'bg', href: siteUrl },
        { rel: 'alternate', hreflang: 'ru', href: `${siteUrl}/?lang=ru` },
        { rel: 'alternate', hreflang: 'en', href: `${siteUrl}/?lang=en` },
        { rel: 'alternate', hreflang: 'x-default', href: siteUrl }
      ],
      meta: [
        { name: 'theme-color', content: '#080808' },
        { name: 'robots', content: previewMode ? 'noindex, nofollow' : 'index, follow, max-image-preview:large' }
      ]
    }
  },
  nitro: {
    prerender: { routes: pages, crawlLinks: false }
  },
  runtimeConfig: {
    public: {
      siteUrl,
      previewMode,
      cmsUrl: process.env.NUXT_PUBLIC_CMS_URL || ''
    }
  }
})
