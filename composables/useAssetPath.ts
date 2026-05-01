export const useAssetPath = (path: string) => {
  const config = useRuntimeConfig()
  const base = config.app.baseURL || '/'
  return `${base}${path.replace(/^\//, '')}`
}
