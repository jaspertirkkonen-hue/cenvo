'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Download, ShoppingCart, User, Calendar, Tag } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { withCache, cacheKey } from '@/lib/cache'
// runtime and ISR configured in segment layout

export default function PromptDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [prompt, setPrompt] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        setLoading(true)
        const data = await withCache(
          cacheKey(['prompt', params.id as any]),
          10 * 60 * 1000,
          async () => {
            const { data, error } = await supabase
              .from('prompts')
              .select('*')
              .eq('id', params.id)
              .single()
            if (error) throw error
            return data
          }
        )
        setPrompt(data)
      } catch (error) {
        console.error('Error fetching prompt:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPrompt()
    }
  }, [params.id])

  const handlePurchase = async () => {
    try {
      setPurchasing(true)
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      // Simulate purchase with Supabase insert
      const { error } = await supabase
        .from('purchases')
        .insert({
          buyer_id: user.id,
          prompt_id: prompt.id,
          price: prompt.price,
          created_at: new Date().toISOString()
        })

      if (error) throw error

      // Show success modal
      setShowModal(true)
    } catch (error: any) {
      alert('Purchase failed: ' + error.message)
    } finally {
      setPurchasing(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto mb-4"></div>
          <p className="text-[#9CA3AF]">Loading prompt...</p>
        </div>
      </div>
    )
  }

  if (!prompt) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-[#9CA3AF] mb-4">Prompt not found</p>
          <button 
            onClick={() => router.push('/market')}
            className="bg-[#2563EB] hover:bg-[#3B82F6] text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="mb-6 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
        >
          ← Back
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#151821] border border-slate-700 rounded-2xl overflow-hidden hover-glow"
          >
            <div className="relative h-96">
              <Image
                src={prompt.image_url || '/images/ai-preview.svg'}
                alt={prompt.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-[#E5E7EB] mb-4">{prompt.title}</h1>
              <p className="text-[#9CA3AF] text-lg leading-relaxed">{prompt.description}</p>
            </div>

            {/* Price & Stats */}
            <div className="bg-[#151821] border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[#9CA3AF] text-sm mb-1">Price</p>
                  <p className="text-4xl font-bold gradient-text">${(prompt.price || 0).toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-yellow-400 mb-2">
                    <Star size={20} className="fill-current" />
                    <span className="text-xl font-bold">4.5</span>
                  </div>
                  <p className="text-[#9CA3AF] text-sm">Average rating</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                <div>
                  <Download className="text-[#0EA5E9] mb-2" size={20} />
                  <p className="text-[#E5E7EB] font-semibold">0 downloads</p>
                </div>
                <div>
                  <Calendar className="text-[#4F46E5] mb-2" size={20} />
                  <p className="text-[#E5E7EB] font-semibold">
                    {new Date(prompt.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Creator Info */}
            <div className="bg-[#151821] border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#0EA5E9] rounded-full flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-sm">Creator</p>
                  <p className="text-[#E5E7EB] font-semibold">Cenvo Creator</p>
                </div>
              </div>
            </div>

            {/* Category */}
            {prompt.category && (
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-[#9CA3AF]" />
                <span className="text-[#9CA3AF]">Category:</span>
                <span className="px-3 py-1 bg-[#151821] border border-slate-700 rounded-full text-[#E5E7EB] text-sm">
                  {prompt.category}
                </span>
              </div>
            )}

            {/* Buy Button */}
            <button
              onClick={handlePurchase}
              disabled={purchasing}
              className="w-full bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] hover:shadow-[0_0_30px_rgba(79,70,229,0.35)] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              {purchasing ? 'Processing...' : 'Buy Prompt'}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Purchase Success Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#151821] border border-slate-700 rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#0EA5E9] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#E5E7EB] mb-2">Purchase Successful!</h3>
              <p className="text-[#9CA3AF] mb-6">
                {prompt.title} has been added to your library.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/myprompts')}
                  className="flex-1 bg-[#2563EB] hover:bg-[#3B82F6] text-white py-3 rounded-lg transition-colors"
                >
                  My Prompts
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-slate-600 hover:border-slate-500 text-[#E5E7EB] py-3 rounded-lg transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

