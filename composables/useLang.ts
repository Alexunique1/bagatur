import type { Locale } from '~/data/site'

export const useLang = () => {
  const route = useRoute()
  const router = useRouter()
  const lang = useState<Locale>('lang', () => 'bg')

  const setLang = async (next: Locale) => {
    lang.value = next

    if (import.meta.client) {
      localStorage.setItem('bagatur-lang', next)
      document.documentElement.lang = next
    }

    await router.replace({
      path: route.path,
      query: next === 'en' ? { ...route.query, lang: 'en' } : withoutLang(route.query)
    })
  }

  onMounted(() => {
    const queryLang = route.query.lang === 'en' ? 'en' : null
    const stored = localStorage.getItem('bagatur-lang') === 'en' ? 'en' : null
    lang.value = (queryLang || stored || 'bg') as Locale
    document.documentElement.lang = lang.value
  })

  return { lang, setLang }
}

const withoutLang = (query: Record<string, unknown>) => {
  const next = { ...query }
  delete next.lang
  return next
}
