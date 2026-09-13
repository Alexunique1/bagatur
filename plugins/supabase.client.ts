import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const url = String(config.public.supabaseUrl || '')
  const key = String(config.public.supabasePublishableKey || '')
  const client = url && key
    ? createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      })
    : null

  return { provide: { supabase: client } }
})

declare module '#app' {
  interface NuxtApp {
    $supabase: SupabaseClient | null
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $supabase: SupabaseClient | null
  }
}
