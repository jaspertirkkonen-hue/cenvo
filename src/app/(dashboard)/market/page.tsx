import { createClient } from '@supabase/supabase-js'
import { Briefcase, Palette, DollarSign, Megaphone, Heart, FileText } from 'lucide-react'

export const revalidate = 300

const categoryConfig: Record<string, { icon: any; gradient: string }> = {
  Business: { icon: Briefcase, gradient: 'from-amber-500/80 to-yellow-800/80' },
  Design: { icon: Palette, gradient: 'from-pink-500/80 to-purple-700/80' },
  Finance: { icon: DollarSign, gradient: 'from-emerald-500/80 to-green-800/80' },
  Marketing: { icon: Megaphone, gradient: 'from-sky-500/80 to-blue-800/80' },
  Lifestyle: { icon: Heart, gradient: 'from-rose-500/80 to-red-800/80' },
  Content: { icon: FileText, gradient: 'from-indigo-500/80 to-violet-800/80' },
}

export default async function MarketPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: prompts, error } = await supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ Error loading prompts:', error.message)
    return <div className="p-8 text-red-400">Error loading prompts: {error.message}</div>
  }

  if (!prompts || prompts.length === 0) {
    return <div className="p-8 text-slate-400">No prompts found.</div>
  }

  return (
    <main className="p-6 sm:p-10">
      <h1 className="text-3xl font-bold text-slate-100 mb-8">
        Cenvo Marketplace
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {prompts.map((p: any) => {
          const category = categoryConfig[p.category] || categoryConfig['Business']
          const Icon = category.icon

          return (
            <div
              key={p.id}
              className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(0,255,255,0.12)] hover:-translate-y-1"
            >
              <div
                className={`h-40 w-full bg-gradient-to-br ${category.gradient} relative flex items-center justify-center`}
              >
                <Icon className="w-12 h-12 text-white/90 drop-shadow-lg" />
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
              </div>
              <div className="p-5 space-y-2">
                <div className="text-slate-100 font-semibold truncate">{p.title}</div>
                <div className="text-slate-400 text-sm line-clamp-2">{p.description}</div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-emerald-400 font-semibold">${p.price ?? 0}</span>
                  {p.verified && (
                    <span className="text-xs text-blue-400 font-medium">Verified</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
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
