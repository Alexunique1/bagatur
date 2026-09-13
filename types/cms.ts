export type CmsKind = 'news' | 'gallery' | 'result'

export interface CmsItem {
  id: string
  collectionId?: string
  collectionName?: string
  kind: CmsKind
  slug: string
  title_bg: string
  title_ru: string
  title_en: string
  body_bg: string
  body_ru: string
  body_en: string
  image?: string
  image_url: string
  external_image_url?: string
  category_slug?: string | null
  event_date: string | null
  published: boolean
  sort_order: number
  competition_name?: string
  competition_location?: string
  gold_count?: number
  silver_count?: number
  bronze_count?: number
  is_demo?: boolean
}
