// ✅ Cenvo Market — fully optimized server-side version
import { createClient } from '@supabase/supabase-js'

export const revalidate = 300 // cache for 5 minutes

export default async function MarketPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // ✅ Fetch all prompts without any limit
  const { data: prompts, error } = await supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ Error loading prompts:', error.message)
    return (
      <div className="p-8 text-red-400">
        Error loading prompts: {error.message}
      </div>
    )
  }

  if (!prompts || prompts.length === 0) {
    return (
      <div className="p-8 text-slate-400">
        No prompts found.
      </div>
    )
  }

  return (
    <main className="p-6 sm:p-10">
      <h1 className="text-3xl font-bold text-slate-100 mb-8">
        Cenvo Marketplace
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {prompts.map(p => (
          <div
            key={p.id}
            className="rounded-xl border border-slate-700 bg-slate-900/70 overflow-hidden hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-transform hover:-translate-y-1"
          >
            <div className="aspect-video bg-slate-800/50 overflow-hidden">
              {p.image_url ? (
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center text-slate-500 text-sm h-full">
                  No image
                </div>
              )}
            </div>
            <div className="p-4 space-y-1">
              <div className="text-slate-100 font-semibold truncate">
                {p.title}
              </div>
              <div className="text-slate-400 text-sm line-clamp-2">
                {p.description}
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-emerald-400 font-semibold">
                  ${p.price ?? 0}
                </span>
                {p.verified && (
                  <span className="text-xs text-blue-400 font-medium">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
import { createServerSupabase } from '@/lib/supabase/server'
import dynamic from 'next/dynamic'

export const runtime = 'nodejs'
export const revalidate = 300

const MarketClient = dynamic(() => import('./MarketClient'), { ssr: false })

export default async function MarketPage() {
  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('prompts')
    .select('id, title, description, price, image_url, created_at, category')
    .order('created_at', { ascending: false })
    .limit(24)

  const initialPrompts = error ? [] : data || []

  return <MarketClient initialPrompts={initialPrompts} />
}
