import { createServerClient } from '@supabase/ssr'

export function supabaseServer() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // Return undefined for server-side rendering without cookies
          return undefined
        },
        set(name: string, value: string, options: any) {
          // No-op for server-side rendering
        },
        remove(name: string, options: any) {
          // No-op for server-side rendering
        },
      },
    }
  )
}
