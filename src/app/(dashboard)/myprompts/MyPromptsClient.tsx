'use client'
import { useState, useRef } from 'react'
import { z } from 'zod'
import Image from 'next/image'
import { Edit, Trash2, Eye, Plus, Save, Sparkles, Image as ImageIcon, Wand2, Copy, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import dynamic from 'next/dynamic'
import { useToast } from '@/components/ToastProvider'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionCard } from '@/components/MotionCard'
import { MotionButton } from '@/components/MotionButton'
import { getPromptImage, getBlurDataURL } from '@/lib/utils/unsplash'

const AiCard1 = dynamic(() => import('@/components/graphics/AiCard1'), { ssr: false })
const AiCard2 = dynamic(() => import('@/components/graphics/AiCard2'), { ssr: false })

export default function MyPromptsClient({ user, prompts: initialPrompts }: { user: any, prompts: any[] }) {
  const [prompts, setPrompts] = useState<any[]>(initialPrompts)
  const [showCreate, setShowCreate] = useState(false)
  const [editingPrompt, setEditingPrompt] = useState<any>(null)
  const [form, setForm] = useState({ title: '', description: '', template: '', category: '', price: '', image_url: '' })
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const { show } = useToast()

  const totalSales = prompts.reduce((sum, p) => sum + (p.sales || 0), 0)
  const totalRevenue = prompts.reduce((sum, p) => sum + ((p.sales || 0) * (p.price || 0)), 0)
  const activePrompts = prompts.length

  // Auto-generate thumbnail based on title and category
  const generateThumbnail = async () => {
    if (!form.title || !form.category) return
    
    setIsGeneratingImage(true)
    try {
      // Simulate AI thumbnail generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      const thumbnailUrl = getPromptImage(Date.now(), form.category, 400, 300)
      setForm({ ...form, image_url: thumbnailUrl })
      show('Thumbnail generated successfully!', 'success')
    } catch (error) {
      show('Failed to generate thumbnail', 'error')
    } finally {
      setIsGeneratingImage(false)
    }
  }

  // Copy text to clipboard
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
      setTimeout(() => setCopiedText(null), 2000)
      show(`${label} copied to clipboard!`, 'success')
    } catch (error) {
      show('Failed to copy to clipboard', 'error')
    }
  }

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
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-celestial rounded-xl flex items-center justify-center shadow-celestial">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-4xl font-bold gradient-celestial heading-tighter">My Prompts</h1>
            </div>
            <p className="text-cosmic-300">Manage your AI prompts and track their performance</p>
          </div>
          {!!user && (
            <MotionButton
              variant="primary"
              size="lg"
              onClick={() => setShowCreate(true)}
              delay={0.2}
            >
              <Plus size={20} className="mr-2" />
              Create Prompt
            </MotionButton>
          )}
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Prompts', value: prompts.length, color: 'from-celestial-500 to-celestial-600' },
            { label: 'Active', value: activePrompts, color: 'from-celestial-400 to-celestial-500' },
            { label: 'Total Sales', value: totalSales, color: 'from-celestial-600 to-celestial-700' },
            { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, color: 'from-celestial-500 to-celestial-700' }
          ].map((stat, idx) => (
            <MotionCard
              key={stat.label}
              variant="glass"
              delay={0.4 + idx * 0.1}
              className="p-6 group"
              whileHover={{
                y: -4,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-celestial group-hover:shadow-celestial-strong transition-all duration-300`}>
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-cosmic-100 mb-2">{stat.value}</div>
              <div className="text-cosmic-400 text-sm">{stat.label}</div>
            </MotionCard>
          ))}
        </div>

        {/* Prompts Grid */}
        {prompts.length > 0 ? (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {prompts.map((prompt, idx) => (
              <MotionCard
                key={prompt.id}
                variant="glass"
                delay={0.8 + idx * 0.1}
                className="overflow-hidden group"
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
              >
                {/* Image Section */}
                <div className="h-48 relative overflow-hidden">
                  <Image 
                    src={prompt.image_url || getPromptImage(prompt.id, prompt.category, 400, 300)} 
                    alt={prompt.title} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950/80 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 rounded-full text-xs font-semibold bg-gradient-celestial text-white shadow-celestial">
                      Active
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-cosmic-100 mb-2 group-hover:text-celestial-400 transition-colors duration-300">
                    {prompt.title}
                  </h3>
                  <p className="text-cosmic-400 text-sm mb-4">{prompt.category || 'Uncategorized'}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold gradient-celestial">
                      ${(prompt.price || 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-cosmic-400">{prompt.sales || 0} sales</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <MotionButton
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setEditingPrompt(prompt)
                        setForm({
                          title: prompt.title,
                          description: prompt.description,
                          template: prompt.template,
                          category: prompt.category,
                          price: prompt.price?.toString() || '',
                          image_url: prompt.image_url || ''
                        })
                        setShowCreate(true)
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </MotionButton>
                    
                    <MotionButton
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(prompt.template, 'Prompt template')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copiedText === 'Prompt template' ? <Check size={16} /> : <Copy size={16} />}
                    </MotionButton>
                    
                    <MotionButton
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`/prompt/${prompt.id}`, '_blank')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={16} />
                    </MotionButton>
                    
                    <MotionButton
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                      onClick={async () => {
                        if (confirm('Are you sure you want to delete this prompt?')) {
                          const { error } = await supabase
                            .from('prompts')
                            .delete()
                            .eq('id', prompt.id)
                          
                          if (error) {
                            show('Failed to delete prompt', 'error')
                          } else {
                            setPrompts(prompts.filter(p => p.id !== prompt.id))
                            show('Prompt deleted successfully', 'success')
                          }
                        }
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 size={16} />
                    </MotionButton>
                  </div>
                </div>
              </MotionCard>
            ))}
          </motion.div>
        ) : (
          <MotionCard 
            variant="glass" 
            className="text-center py-16"
            delay={0.8}
          >
            <div className="w-24 h-24 bg-gradient-celestial rounded-full flex items-center justify-center mx-auto mb-6 shadow-celestial">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-cosmic-100 mb-4">No prompts yet</h3>
            <p className="text-cosmic-400 mb-6 max-w-md mx-auto">
              Start creating amazing AI prompts and share them with the community. Your first prompt could be the next big hit!
            </p>
            <MotionButton 
              variant="primary" 
              size="lg"
              onClick={() => setShowCreate(true)}
              delay={1.0}
            >
              <Plus size={20} className="mr-2" />
              Create Your First Prompt
            </MotionButton>
          </MotionCard>
        )}
      </div>

      {/* Enhanced Create/Edit Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
            onClick={() => {
              setShowCreate(false)
              setEditingPrompt(null)
              setForm({ title: '', description: '', template: '', category: '', price: '', image_url: '' })
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl glass-card-strong p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold gradient-celestial">
                  {editingPrompt ? 'Edit Prompt' : 'Create New Prompt'}
                </h3>
                <button
                  onClick={() => {
                    setShowCreate(false)
                    setEditingPrompt(null)
                    setForm({ title: '', description: '', template: '', category: '', price: '', image_url: '' })
                  }}
                  className="text-cosmic-400 hover:text-cosmic-200 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Form Section */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-cosmic-200 text-sm font-medium mb-2">Title *</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Enter a compelling title"
                      className="w-full bg-cosmic-800/50 border border-cosmic-600/50 rounded-xl py-3 px-4 text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:border-celestial-500 focus-celestial backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-cosmic-200 text-sm font-medium mb-2">Description *</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Describe what this prompt does and its benefits"
                      className="w-full bg-cosmic-800/50 border border-cosmic-600/50 rounded-xl py-3 px-4 text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:border-celestial-500 focus-celestial backdrop-blur-sm min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label className="block text-cosmic-200 text-sm font-medium mb-2">Prompt Template *</label>
                    <textarea
                      value={form.template}
                      onChange={(e) => setForm({ ...form, template: e.target.value })}
                      placeholder="The actual prompt that buyers will use"
                      className="w-full bg-cosmic-800/50 border border-cosmic-600/50 rounded-xl py-3 px-4 text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:border-celestial-500 focus-celestial backdrop-blur-sm min-h-[120px] font-mono text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cosmic-200 text-sm font-medium mb-2">Category *</label>
                      <input
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        placeholder="e.g., Writing, Art, Development"
                        className="w-full bg-cosmic-800/50 border border-cosmic-600/50 rounded-xl py-3 px-4 text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:border-celestial-500 focus-celestial backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-cosmic-200 text-sm font-medium mb-2">Price (USD) *</label>
                      <input
                        type="number"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full bg-cosmic-800/50 border border-cosmic-600/50 rounded-xl py-3 px-4 text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:border-celestial-500 focus-celestial backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-cosmic-200 text-sm font-medium mb-2">Thumbnail Image</label>
                    <div className="flex gap-2">
                      <input
                        value={form.image_url}
                        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                        placeholder="Image URL (optional)"
                        className="flex-1 bg-cosmic-800/50 border border-cosmic-600/50 rounded-xl py-3 px-4 text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:border-celestial-500 focus-celestial backdrop-blur-sm"
                      />
                      <MotionButton
                        variant="secondary"
                        size="md"
                        onClick={generateThumbnail}
                        disabled={!form.title || !form.category || isGeneratingImage}
                        className="px-4"
                      >
                        {isGeneratingImage ? (
                          <div className="w-4 h-4 border-2 border-celestial-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Wand2 size={16} className="mr-1" />
                            AI Generate
                          </>
                        )}
                      </MotionButton>
                    </div>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="lg:sticky lg:top-4">
                  <h4 className="text-lg font-semibold text-cosmic-100 mb-4">Preview</h4>
                  <MotionCard variant="glass" className="overflow-hidden">
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={form.image_url || getPromptImage(Date.now(), form.category, 400, 300)}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="300px"
                        placeholder="blur"
                        blurDataURL={getBlurDataURL()}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-4">
                      <h5 className="font-semibold text-cosmic-100 mb-2">
                        {form.title || 'Your prompt title'}
                      </h5>
                      <p className="text-cosmic-400 text-sm mb-3">
                        {form.category || 'Category'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold gradient-celestial">
                          ${form.price || '0.00'}
                        </span>
                        <span className="text-sm text-cosmic-400">0 sales</span>
                      </div>
                    </div>
                  </MotionCard>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4 justify-end">
                <MotionButton
                  variant="secondary"
                  onClick={() => {
                    setShowCreate(false)
                    setEditingPrompt(null)
                    setForm({ title: '', description: '', template: '', category: '', price: '', image_url: '' })
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </MotionButton>
                
                <MotionButton
                  variant="primary"
                  onClick={async () => {
                    const schema = z.object({
                      title: z.string().min(3, 'Title must be at least 3 characters'),
                      description: z.string().min(20, 'Description must be at least 20 characters'),
                      template: z.string().min(20, 'Template must be at least 20 characters'),
                      category: z.string().min(1, 'Category is required'),
                      price: z.string().transform((v) => Number(v)).refine((n) => Number.isFinite(n) && n >= 0, 'Price must be >= 0'),
                      image_url: z.string().url().optional().or(z.literal('')),
                    })
                    
                    const parsed = schema.safeParse(form)
                    if (!parsed.success) { 
                      show(parsed.error.issues[0]?.message || 'Invalid input', 'error')
                      return 
                    }
                    
                    const { data: { user } } = await supabase.auth.getUser()
                    if (!user) { 
                      show('You must be logged in', 'error')
                      return 
                    }
                    
                    const payload: any = {
                      title: parsed.data.title,
                      description: parsed.data.description,
                      template: parsed.data.template,
                      category: parsed.data.category,
                      price: parsed.data.price as unknown as number,
                      user_id: user.id,
                      created_at: new Date().toISOString(),
                    }
                    
                    if (parsed.data.image_url) payload.image_url = parsed.data.image_url
                    
                    try {
                      let result
                      if (editingPrompt) {
                        result = await supabase
                          .from('prompts')
                          .update(payload)
                          .eq('id', editingPrompt.id)
                          .select()
                          .single()
                      } else {
                        result = await supabase
                          .from('prompts')
                          .insert([payload])
                          .select()
                          .single()
                      }
                      
                      if (result.error) {
                        show('Failed to save prompt', 'error')
                      } else {
                        show(editingPrompt ? 'Prompt updated successfully!' : 'Prompt created successfully!', 'success')
                        setShowCreate(false)
                        setEditingPrompt(null)
                        setForm({ title: '', description: '', template: '', category: '', price: '', image_url: '' })
                        
                        if (!editingPrompt) {
                          window.location.href = `/prompt/${result.data.id}`
                        } else {
                          // Refresh the prompts list
                          window.location.reload()
                        }
                      }
                    } catch (error) {
                      show('An error occurred', 'error')
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={16} className="mr-2" />
                  {editingPrompt ? 'Update Prompt' : 'Create Prompt'}
                </MotionButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


