import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Download, ShoppingCart, User, Calendar, Tag } from 'lucide-react'
import { createServerSupabase } from '@/lib/supabase/server'
import PromptPreview from '@/components/prompt/PromptPreview'
import Recommendations from '@/components/prompt/Recommendations'
export const runtime = 'nodejs'
export const revalidate = 300

export default async function PromptDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabase()
  const { data: prompt } = await supabase
    .from('prompts')
    .select('id, title, description, template, image_url, price, category, user_id, created_at')
    .eq('id', params.id)
    .single()

  if (!prompt) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-[#9CA3AF] mb-4">Prompt not found</p>
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
        {/* Back Link */}
        <Link href="/market" className="mb-6 inline-block text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">← Back</Link>

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
            <a href="/login" className="w-full bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] hover:shadow-[0_0_30px_rgba(79,70,229,0.35)] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
              <ShoppingCart size={20} />
              Buy Prompt
            </a>
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-6">
        <PromptPreview template={prompt.template || ''} defaultInput="" />
      </div>

      <Recommendations id={prompt.id} category={prompt.category || undefined} />

    </div>
  )
}

