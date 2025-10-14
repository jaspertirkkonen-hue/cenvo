'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Edit, Trash2, Eye, Download, Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import dynamic from 'next/dynamic'

const AiCard1 = dynamic(() => import('@/components/graphics/AiCard1'), { ssr: false })
const AiCard2 = dynamic(() => import('@/components/graphics/AiCard2'), { ssr: false })

export default function MyPromptsPage() {
  const [prompts, setPrompts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMyPrompts = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setError('Not authenticated')
          setLoading(false)
          return
        }

        // Fetch user's prompts
        const { data, error } = await supabase
          .from('prompts')
          .select('id, title, description, category, price, sales, status, created_at, downloads, rating, image_url')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        setPrompts(data || [])
      } catch (err: any) {
        console.error('Error fetching my prompts:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMyPrompts()

    // Real-time subscription for user's prompts
    const fetchUserAndSubscribe = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const channel = supabase
        .channel('realtime:my-prompts')
        .on(
          'postgres_changes',
          { 
            event: '*', 
            schema: 'public', 
            table: 'prompts',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              setPrompts((prev) => [payload.new, ...prev])
            } else if (payload.eventType === 'UPDATE') {
              setPrompts((prev) =>
                prev.map((p) => (p.id === payload.new.id ? payload.new : p))
              )
            } else if (payload.eventType === 'DELETE') {
              setPrompts((prev) => prev.filter((p) => p.id !== payload.old.id))
            }
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }

    fetchUserAndSubscribe()
  }, [])

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb] mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your prompts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-red-400 mb-4">Error: {error}</p>
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

  const totalSales = prompts.reduce((sum, p) => sum + (p.sales || 0), 0)
  const totalRevenue = prompts.reduce((sum, p) => sum + ((p.sales || 0) * (p.price || 0)), 0)
  const activePrompts = prompts.filter(p => p.status === 'Active' || p.status === 'published').length

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Prompts</h1>
          <p className="text-slate-400">Manage your uploaded AI prompts and track their performance</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          <Plus size={20} />
          Create Prompt
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="text-2xl font-bold text-white mb-2">{prompts.length}</div>
          <div className="text-slate-400 text-sm">Total Prompts</div>
        </div>
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="text-2xl font-bold text-white mb-2">{activePrompts}</div>
          <div className="text-slate-400 text-sm">Active</div>
        </div>
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="text-2xl font-bold text-white mb-2">{totalSales}</div>
          <div className="text-slate-400 text-sm">Total Sales</div>
        </div>
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="text-2xl font-bold text-white mb-2">${totalRevenue.toFixed(2)}</div>
          <div className="text-slate-400 text-sm">Total Revenue</div>
        </div>
      </div>

      {/* Prompts Grid */}
      {prompts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {prompts.map((prompt) => (
            <div key={prompt.id} className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-[#2563eb]/50 transition-colors">
              <div className="h-48 bg-slate-800 relative overflow-hidden">
                {prompt.image_url ? (
                  <Image
                    src={prompt.image_url}
                    alt={prompt.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    {prompt.id % 2 === 0 ? <AiCard1 /> : <AiCard2 />}
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    prompt.status === 'Active' || prompt.status === 'published'
                      ? 'bg-green-500 text-white' 
                      : 'bg-slate-500 text-white'
                  }`}>
                    {prompt.status === 'published' ? 'Active' : prompt.status}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{prompt.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{prompt.category || 'Uncategorized'}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-white">${(prompt.price || 0).toFixed(2)}</div>
                  <div className="text-sm text-slate-400">{prompt.sales || 0} sales</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 bg-[#2563eb] hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors">
                    <Edit size={16} className="inline mr-1" />
                    Edit
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded text-sm transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="bg-red-900/30 hover:bg-red-900/50 text-red-400 px-3 py-2 rounded text-sm transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl">
          <p className="text-slate-400 mb-4">You haven't created any prompts yet.</p>
          <button className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            <Plus size={20} />
            Create Your First Prompt
          </button>
        </div>
      )}

      {/* Performance Chart */}
      <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Performance Overview</h2>
        <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <p className="text-slate-400">Performance chart coming soon</p>
            <p className="text-sm text-slate-500 mt-2">Track your prompt performance over time</p>
          </div>
        </div>
      </div>
    </div>
  )
}
