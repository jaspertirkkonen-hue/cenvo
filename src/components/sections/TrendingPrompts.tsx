'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import { withCache, cacheKey } from '@/lib/cache'
import { PromptCard } from '@/components/cards/PromptCard'

type Prompt = {
  id: number
  title: string
  description: string
  price: number
  image_url: string | null
  downloads?: number | null
  rating?: number | null
}

export default function TrendingPrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await withCache(
          cacheKey(['trending-prompts']),
          10 * 60 * 1000,
          async () => {
            const { data, error } = await supabase
              .from('prompts')
              .select('id, title, description, price, image_url, downloads, rating')
              .order('downloads', { ascending: false })
              .limit(12)
            if (error) throw error
            return data || []
          }
        )
        setPrompts(data as Prompt[])
      } catch (e) {
        setPrompts([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-4">Trending Prompts</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-72 h-64 bg-slate-800/50 rounded-2xl skeleton" />
              ))
            : prompts.map((p, idx) => (
                <motion.div key={p.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.03 }} className="w-72">
                  <PromptCard id={p.id} title={p.title} description={p.description} price={p.price} imageUrl={p.image_url || undefined} rating={p.rating || undefined} downloads={p.downloads || undefined} />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  )
}


