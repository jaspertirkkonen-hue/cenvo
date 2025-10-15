'use client'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { PromptCard } from '@/components/cards/PromptCard'
import { SkeletonLoader } from '@/components/SkeletonLoader'
import { supabase } from '@/lib/supabase/client'
import { withCache, cacheKey } from '@/lib/cache'

// runtime and ISR configured in segment layout

export default function MarketPage() {
  const [prompts, setPrompts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const categories = ['All', 'Writing', 'Art', 'Development', 'Business', 'Finance']

  const TrendingPrompts = dynamic(() => import('@/components/sections/TrendingPrompts'), { ssr: false })
  const TopCreators = dynamic(() => import('@/components/sections/TopCreators'), { ssr: false })

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true)
        setError(null)

        const cacheId = cacheKey(['prompts', selectedCategory, page])
        const data = await withCache(cacheId, 10 * 60 * 1000, async () => {
          let query = supabase
            .from('prompts')
            .select('id, title, description, price, image_url, created_at, category')
            .order('created_at', { ascending: false })
            .range((page - 1) * 12, page * 12 - 1)

          if (selectedCategory !== 'All') {
            query = query.eq('category', selectedCategory)
          }

          const { data, error } = await query
          if (error) throw error
          return data || []
        })

        setPrompts((prev) => (page === 1 ? data : [...prev, ...data]))
        setHasMore((data?.length || 0) === 12)
      } catch (err: any) {
        console.error('Error fetching prompts:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPrompts()

    // Real-time subscription for new prompts
    const channel = supabase
      .channel('realtime:prompts')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'prompts' },
        (payload) => {
          setPrompts((prev) => [payload.new, ...prev])
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'prompts' },
        (payload) => {
          setPrompts((prev) =>
            prev.map((p) => (p.id === payload.new.id ? payload.new : p))
          )
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'prompts' },
        (payload) => {
          setPrompts((prev) => prev.filter((p) => p.id !== payload.old.id))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedCategory, page])

  // Reset pagination when category changes
  useEffect(() => {
    setPage(1)
  }, [selectedCategory])

  // Infinite scroll intersection observer
  useEffect(() => {
    const sentinel = observerRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting && hasMore && !loading) {
        setPage((p) => p + 1)
      }
    }, { rootMargin: '200px' })

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, loading])

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="h-10 bg-slate-800/50 rounded w-64 mb-2 skeleton"></div>
          <div className="h-6 bg-slate-800/50 rounded w-96 skeleton"></div>
        </div>
        <SkeletonLoader count={6} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-red-400 mb-4">Error loading prompts: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#2563eb] hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Filter by search term
  const filteredPrompts = prompts.filter((prompt) =>
    prompt.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Prompt Marketplace</h1>
        <p className="text-slate-400">Discover and download high-quality AI prompts from our community</p>
      </div>

      {/* Filters */}
      <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:border-[#2563eb]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === selectedCategory
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {/* Prompts Grid */}
      {filteredPrompts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard 
              key={prompt.id} 
              id={prompt.id}
              title={prompt.title}
              description={prompt.description}
              price={prompt.price}
              imageUrl={prompt.image_url}
            />
          ))}
          {/* Infinite scroll sentinel */}
          <div ref={observerRef} className="h-1" />
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 mb-4">
            {searchTerm ? 'No prompts found matching your search.' : 'No prompts available yet.'}
          </p>
          <p className="text-slate-500 text-sm">
            {searchTerm ? 'Try a different search term.' : 'Check back soon for new prompts!'}
          </p>
        </div>
      )}
      {/* Sections: Trending and TopCreators */}
      <div className="mt-12 space-y-12">
        <Suspense fallback={<div className="h-64 rounded-2xl bg-slate-800/40 skeleton" />}> 
          <TrendingPrompts />
        </Suspense>
        <Suspense fallback={<div className="h-40 rounded-2xl bg-slate-800/40 skeleton" />}> 
          <TopCreators />
        </Suspense>
      </div>
    </div>
  )
}
