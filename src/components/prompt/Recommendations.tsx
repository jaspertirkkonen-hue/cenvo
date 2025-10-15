import Image from 'next/image'
import { createServerSupabase } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export default async function Recommendations({ id, category }: { id: string; category?: string }) {
  const supabase = createServerSupabase()
  const cat = category || ''
  let query = supabase
    .from('prompts')
    .select('id, title, description, image_url, price, category, created_at')
    .neq('id', id)
    .order('created_at', { ascending: false })
    .limit(6)

  if (cat) {
    query = query.ilike('category', cat)
  }

  const { data } = await query
  if (!data?.length) return null

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-slate-100 mb-3">You might also like</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((p) => (
          <a key={p.id} href={`/prompt/${p.id}`} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition">
            <div className="aspect-video w-full rounded-lg bg-slate-800/60 mb-2 overflow-hidden relative">
              {p.image_url ? (
                <Image src={p.image_url} alt={p.title} fill className="object-cover" />
              ) : null}
            </div>
            <div className="text-slate-100 font-medium">{p.title}</div>
            <div className="text-slate-400 text-sm line-clamp-2">{p.description}</div>
            <div className="text-emerald-300 mt-1 font-semibold">${Number(p.price || 0).toFixed(2)}</div>
          </a>
        ))}
      </div>
    </div>
  )
}


