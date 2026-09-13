import { fallbackGallery, fallbackNews } from '~/data/cmsFallback'
import type { CmsItem } from '~/types/cms'
import { cleanCmsBase, cmsRecord, type PocketBaseList } from '~/utils/cmsApi'

export const useCmsContent = () => {
  const config = useRuntimeConfig()
  const cmsBase = cleanCmsBase(config.public.cmsUrl)
  const news = useState<CmsItem[]>('cms-news', () => [...fallbackNews])
  const gallery = useState<CmsItem[]>('cms-gallery', () => [...fallbackGallery])
  const results = useState<CmsItem[]>('cms-results', () => [])
  const loading = useState<boolean>('cms-loading', () => false)
  const error = useState<string | null>('cms-error', () => null)

  const refresh = async () => {
    loading.value = true
    error.value = null
    try {
      const query = new URLSearchParams({
        filter: 'published = true',
        sort: 'sort_order,-event_date',
        perPage: '200'
      })
      const response = await fetch(`${cmsBase}/api/collections/content_items/records?${query}`)
      if (!response.ok) throw new Error('CMS content is temporarily unavailable.')
      const payload = await response.json() as PocketBaseList<CmsItem>
      const items = payload.items.map(item => cmsRecord(item, cmsBase))
      const remoteNews = items.filter(item => item.kind === 'news')
      const remoteGallery = items.filter(item => item.kind === 'gallery')
      news.value = remoteNews.length ? remoteNews : [...fallbackNews]
      gallery.value = remoteGallery.length ? remoteGallery : [...fallbackGallery]
      results.value = items.filter(item => item.kind === 'result')
    } catch (cause: any) {
      error.value = cause?.message || 'CMS content is temporarily unavailable.'
    } finally {
      loading.value = false
    }
  }

  onMounted(refresh)

  return { news, gallery, results, loading, error, refresh }
}