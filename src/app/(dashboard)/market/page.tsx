'use client'
import { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'
import { PromptCard } from '@/components/cards/PromptCard'
import { supabase } from '@/lib/supabase/client'

export default function MarketPage() {
  const [prompts, setPrompts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Writing', 'Art', 'Development', 'Business', 'Finance']

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true)
        setError(null)

        let query = supabase
          .from('prompts')
          .select('id, title, description, price, image_url, created_at, category')
          .order('created_at', { ascending: false })

        // Filter by category if not 'All'
        if (selectedCategory !== 'All') {
          query = query.eq('category', selectedCategory)
        }

        const { data, error } = await query

        if (error) throw error
        setPrompts(data || [])
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
  }, [selectedCategory])

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb] mx-auto mb-4"></div>
          <p className="text-slate-400">Loading marketplace...</p>
        </div>
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
    </div>
  )
}
