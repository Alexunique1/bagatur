export type CmsKind = 'news' | 'gallery'

export interface CmsItem {
  id: string
  kind: CmsKind
  slug: string
  title_bg: string
  title_ru: string
  title_en: string
  body_bg: string
  body_ru: string
  body_en: string
  image_url: string
  storage_path?: string | null
  category_slug?: string | null
  event_date: string | null
  published: boolean
  sort_order: number
  is_demo?: boolean
}
