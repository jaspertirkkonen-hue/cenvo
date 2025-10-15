'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { supabaseBrowser } from '@/lib/supabase/browserClient'
import { withCache, cacheKey } from '@/lib/cache'

type Creator = {
  id: string
  name: string | null
  avatar_url: string | null
  verified: boolean | null
  total_sales: number | null
}

export default function TopCreators() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopCreators = async () => {
      setLoading(true)
      try {
        const data = await withCache(
          cacheKey(['top-creators']),
          10 * 60 * 1000,
          async () => {
            const supabase = supabaseBrowser()
            const { data, error } = await supabase
              .from('creator_stats')
              .select('user_id, name, avatar_url, verified, total_sales')
              .order('total_sales', { ascending: false })
              .limit(5)

            if (error) throw error

            return (data || []).map((row: any) => ({
              id: row.user_id,
              name: row.name,
              avatar_url: row.avatar_url,
              verified: row.verified,
              total_sales: row.total_sales,
            })) as Creator[]
          }
        )
        setCreators(data)
      } catch (e) {
        setCreators([])
      } finally {
        setLoading(false)
      }
    }
    fetchTopCreators()
  }, [])

  return (
    <section className="bg-[#0f172a]/50 backdrop-blur-xl bg-opacity-70 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Top Creators</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 bg-slate-800/50 rounded-xl skeleton" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {creators.map((c) => (
            <div key={c.id} className="flex items-center gap-3 p-4 rounded-xl border border-slate-700 bg-[#0b1220]/60">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border border-slate-700">
                <Image src={c.avatar_url || '/images/px-logo.png'} alt={c.name || 'Creator'} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold truncate max-w-[140px]">{c.name || 'Creator'}</p>
                  {c.verified ? <CheckCircle2 size={16} className="text-green-400" /> : null}
                </div>
                <p className="text-slate-400 text-sm">${(c.total_sales || 0).toFixed(2)} revenue</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}


