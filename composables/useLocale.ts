import { defaultLocale, locales, type Locale } from '~/data/content'

const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && locales.some((item) => item.code === value)

export const useLocale = () => {
  const route = useRoute()
  const router = useRouter()
  const locale = useState<Locale>('locale', () => (isLocale(route.query.lang) ? route.query.lang : defaultLocale))

  const setLocale = async (value: Locale) => {
    locale.value = value
    if (import.meta.client) {
      localStorage.setItem('bagatur-locale', value)
      document.documentElement.lang = value
    }

    const query = { ...route.query }
    if (value === defaultLocale) {
      delete query.lang
    } else {
      query.lang = value
    }
    await router.replace({ path: route.path, query })
  }

  onMounted(() => {
    const queryLocale = isLocale(route.query.lang) ? route.query.lang : null
    const storedValue = localStorage.getItem('bagatur-locale')
    const storedLocale = isLocale(storedValue) ? storedValue : null
    locale.value = queryLocale || storedLocale || defaultLocale
    document.documentElement.lang = locale.value
  })

  watch(
    () => route.query.lang,
    (value) => {
      if (isLocale(value)) {
        locale.value = value
        if (import.meta.client) {
          localStorage.setItem('bagatur-locale', value)
          document.documentElement.lang = value
        }
      }
    }
  )

  return { locale, setLocale }
}

export const useLocalizedItem = <T>(items: Partial<Record<Locale, T>> & Record<typeof defaultLocale, T>) => {
  const { locale } = useLocale()

  return computed(() => items[locale.value] || items[defaultLocale])
}

export const useLocalizedHead = (title: string, description: string, path = '/') => {
  const config = useRuntimeConfig()
  const canonical = `${config.public.siteUrl}${path === '/' ? '' : path}`

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonical },
      { property: 'og:type', content: 'website' }
    ],
    link: [{ rel: 'canonical', href: canonical }]
  })
}
