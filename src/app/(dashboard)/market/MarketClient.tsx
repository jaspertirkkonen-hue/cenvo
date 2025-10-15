'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, Filter } from 'lucide-react'
import dynamic from 'next/dynamic'
import { PromptCard } from '@/components/cards/PromptCard'
import { supabase } from '@/lib/supabase/client'

type Prompt = { id: number; title: string; description: string; price: number; image_url: string | null; category?: string | null }

export default function MarketClient({ initialPrompts }: { initialPrompts: Prompt[] }) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const categories = ['All', 'Writing', 'Art', 'Development', 'Business', 'Finance']
  const TrendingPrompts = dynamic(() => import('@/components/sections/TrendingPrompts'), { ssr: false })
  const TopCreators = dynamic(() => import('@/components/sections/TopCreators'), { ssr: false })

  useEffect(() => {
    const channel = supabase
      .channel('realtime:prompts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'prompts' }, (payload) => {
        setPrompts((prev) => [payload.new as any, ...prev])
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  useEffect(() => { setPage(1); setHasMore(true) }, [selectedCategory])

  useEffect(() => {
    const sentinel = observerRef.current
    if (!sentinel) return
    const obs = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting && hasMore && !loading) {
        setPage((p) => p + 1)
      }
    }, { rootMargin: '200px' })
    obs.observe(sentinel)
    return () => obs.disconnect()
  }, [hasMore, loading])

  useEffect(() => {
    const loadMore = async () => {
      if (page === 1) return
      setLoading(true)
      setError(null)
      try {
        let query = supabase
          .from('prompts')
          .select('id, title, description, price, image_url, created_at, category')
          .order('created_at', { ascending: false })
          .range((page - 1) * 12, page * 12 - 1)
        if (selectedCategory !== 'All') query = query.eq('category', selectedCategory)
        const { data, error } = await query
        if (error) throw error
        setPrompts((prev) => (page === 2 ? data || [] : [...prev, ...(data || [])]))
        setHasMore((data?.length || 0) === 12)
      } catch (e: any) {
        setError(e.message)
      } finally { setLoading(false) }
    }
    loadMore()
  }, [page, selectedCategory])

  const filteredPrompts = useMemo(() => prompts.filter((prompt) =>
    prompt.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ), [prompts, searchTerm])

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Prompt Marketplace</h1>
        <p className="text-slate-400">Discover and download high-quality AI prompts from our community</p>
      </div>

      <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input type="text" placeholder="Search prompts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:border-[#2563eb]" />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === selectedCategory ? 'bg-[#2563eb] text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                {category}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {filteredPrompts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} id={prompt.id} title={prompt.title} description={prompt.description} price={prompt.price} imageUrl={prompt.image_url || undefined} />
          ))}
          <div ref={observerRef} className="h-1" />
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 mb-4">{searchTerm ? 'No prompts found matching your search.' : 'No prompts available yet.'}</p>
          <p className="text-slate-500 text-sm">{searchTerm ? 'Try a different search term.' : 'Check back soon for new prompts!'}</p>
        </div>
      )}

      <div className="mt-12 space-y-12">
        <TrendingPrompts />
        <TopCreators />
      </div>
    </div>
  )
}


