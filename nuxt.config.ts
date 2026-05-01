const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://bagatur-bjj.bg'
const baseURL = process.env.NUXT_APP_BASE_URL || '/'
const pages = [
  '/',
  '/about',
  '/methodology',
  '/mentors',
  '/blog',
  '/kids/4-7',
  '/kids/8-13',
  '/adults/bjj',
  '/adults/functional-training',
  '/events/calendar',
  '/events/gymnasium-camp',
  '/schedule',
  '/vacancies',
  '/privacy',
  '/offer',
  '/terms',
  '/api/ai-context'
]

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'bg' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', href: `${baseURL}favicon.svg` },
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
  nitro: process.env.NUXT_PRERENDER_ROUTES === 'true'
    ? {
        prerender: {
          routes: pages
        }
      }
    : undefined,
  runtimeConfig: {
    public: {
      siteUrl
    }
  }
})
