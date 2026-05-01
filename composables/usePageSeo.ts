import type { Locale } from '~/data/site'

type LocalizedSeo = Record<Locale, { title: string; description: string }>

export const usePageSeo = (page: LocalizedSeo, path: string) => {
  const { lang } = useLang()
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl

  useHead(() => {
    const content = page[lang.value]
    const url = `${siteUrl}${path}`

    return {
      title: `${content.title} | Багатур BJJ Burgas`,
      meta: [
        { name: 'description', content: content.description },
        { property: 'og:title', content: `${content.title} | Багатур BJJ Burgas` },
        { property: 'og:description', content: content.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url },
        { property: 'og:image', content: `${siteUrl}/images/hero-bjj-burgas.png` },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'canonical', href: url },
        { rel: 'alternate', hreflang: 'bg', href: url },
        { rel: 'alternate', hreflang: 'en', href: `${url}?lang=en` }
      ]
    }
  })
}
