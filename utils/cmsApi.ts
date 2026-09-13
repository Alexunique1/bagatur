import type { CmsItem } from '~/types/cms'

export interface PocketBaseList<T> {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: T[]
}

export interface EditorAuth {
  token: string
  record: { id: string, username: string, role: string }
}

export const cleanCmsBase = (value: unknown) => String(value || '').replace(/\/+$/, '')

export const cmsRecord = (record: CmsItem, base = ''): CmsItem => {
  const image = record.image || ''
  const collection = record.collectionId || record.collectionName || 'content_items'
  return {
    ...record,
    external_image_url: record.image_url || '',
    image_url: image
      ? `${base}/api/files/${encodeURIComponent(collection)}/${encodeURIComponent(record.id)}/${encodeURIComponent(image)}`
      : record.image_url || ''
  }
}

export const cmsErrorMessage = async (response: Response, fallback: string) => {
  try {
    const payload = await response.json()
    return payload?.message || fallback
  } catch {
    return fallback
  }
}
