import { fallbackGallery, fallbackNews } from '~/data/cmsFallback'
import type { CmsItem } from '~/types/cms'

export const useCmsContent = () => {
  const { $supabase } = useNuxtApp()
  const news = useState<CmsItem[]>('cms-news', () => [...fallbackNews])
  const gallery = useState<CmsItem[]>('cms-gallery', () => [...fallbackGallery])
  const loading = useState<boolean>('cms-loading', () => false)
  const error = useState<string | null>('cms-error', () => null)

  const refresh = async () => {
    if (!$supabase) return
    loading.value = true
    error.value = null

    const { data, error: queryError } = await $supabase
      .from('content_items')
      .select('id,kind,slug,title_bg,title_ru,title_en,body_bg,body_ru,body_en,image_url,category_slug,event_date,published,sort_order')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('event_date', { ascending: false, nullsFirst: false })

    if (queryError) {
      error.value = queryError.message
      loading.value = false
      return
    }

    const items = (data || []) as CmsItem[]
    const remoteNews = items.filter((item) => item.kind === 'news')
    const remoteGallery = items.filter((item) => item.kind === 'gallery')
    if (remoteNews.length) news.value = remoteNews
    if (remoteGallery.length) gallery.value = remoteGallery
    loading.value = false
  }

  onMounted(refresh)

  return { news, gallery, loading, error, refresh }
}
