'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, Filter, Sparkles, TrendingUp, Star } from 'lucide-react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { PromptCard } from '@/components/cards/PromptCard'
import { MotionCard } from '@/components/MotionCard'
import { MotionButton } from '@/components/MotionButton'
import { supabase } from '@/lib/supabase/client'

type Prompt = { id: number; title: string; description: string; price: number; image_url: string | null; category?: string | null }

export default function MarketClient({ 
  initialPrompts, 
  categories 
}: { 
  initialPrompts: Prompt[]
  categories?: string[]
}) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const categoryList = ['All', ...(categories || ['Writing', 'Art', 'Development', 'Business', 'Finance'])]
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
    <div className="p-6 min-h-screen bg-cosmic-950 bg-celestial-pattern">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-celestial-500/5 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-celestial-600/5 rounded-full blur-3xl float-animation-delayed" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-celestial rounded-xl flex items-center justify-center shadow-celestial">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold gradient-celestial heading-tighter">
              Prompt Marketplace
            </h1>
          </div>
          <p className="text-xl text-cosmic-300 max-w-2xl">
            Discover and download high-quality AI prompts from our community
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <MotionCard 
          variant="glass" 
          className="p-6 mb-8"
          delay={0.2}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400" size={20} />
              <input 
                type="text" 
                placeholder="Search prompts..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full bg-cosmic-800/50 border border-cosmic-600/50 rounded-xl py-3 pl-10 pr-4 text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:border-celestial-500 focus-celestial backdrop-blur-sm" 
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categoryList.map((category) => (
                <motion.button 
                  key={category} 
                  onClick={() => setSelectedCategory(category)} 
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    category === selectedCategory 
                      ? 'bg-gradient-celestial text-white shadow-celestial' 
                      : 'glass-card text-cosmic-300 hover:text-celestial-400 hover:border-celestial-500/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            <MotionButton 
              variant="secondary" 
              size="md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter size={20} className="mr-2" />
              Filters
            </MotionButton>
          </div>
        </MotionCard>

        {/* Prompts Grid */}
        {filteredPrompts.length > 0 ? (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredPrompts.map((prompt, idx) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <PromptCard 
                  id={prompt.id} 
                  title={prompt.title} 
                  description={prompt.description} 
                  price={prompt.price} 
                  imageUrl={prompt.image_url || undefined}
                  category={prompt.category || undefined}
                />
              </motion.div>
            ))}
            <div ref={observerRef} className="h-1" />
          </motion.div>
        ) : (
          <MotionCard 
            variant="glass" 
            className="text-center py-16"
            delay={0.4}
          >
            <div className="w-24 h-24 bg-gradient-celestial rounded-full flex items-center justify-center mx-auto mb-6 shadow-celestial">
              <Search className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-cosmic-100 mb-4">
              {searchTerm ? 'No prompts found' : 'No prompts available yet'}
            </h3>
            <p className="text-cosmic-400 mb-6 max-w-md mx-auto">
              {searchTerm 
                ? 'Try adjusting your search terms or browse different categories.' 
                : 'Check back soon for new high-quality AI prompts!'
              }
            </p>
            {searchTerm && (
              <MotionButton 
                variant="secondary" 
                onClick={() => setSearchTerm('')}
                delay={0.6}
              >
                Clear Search
              </MotionButton>
            )}
          </MotionCard>
        )}

        {/* Loading State */}
        {loading && (
          <MotionCard variant="glass" className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-celestial rounded-full flex items-center justify-center mx-auto mb-4 shadow-celestial animate-pulse">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <p className="text-cosmic-300">Loading more prompts...</p>
          </MotionCard>
        )}

        {/* Trending and Creators Sections */}
        <div className="mt-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <TrendingPrompts />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <TopCreators />
          </motion.div>
        </div>
      </div>
    </div>
  )
}


