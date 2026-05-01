const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://bagatur-bjj.bg'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'bg' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.svg' },
        { rel: 'alternate', hreflang: 'bg', href: siteUrl },
        { rel: 'alternate', hreflang: 'en', href: `${siteUrl}/?lang=en` },
        { rel: 'alternate', hreflang: 'x-default', href: siteUrl }
      ],
      meta: [
        { name: 'theme-color', content: '#101820' },
        { name: 'robots', content: 'index, follow, max-image-preview:large' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl
    }
  }
})
