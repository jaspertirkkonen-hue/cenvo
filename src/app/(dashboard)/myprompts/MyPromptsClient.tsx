'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Edit, Trash2, Eye, Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import dynamic from 'next/dynamic'
import { useToast } from '@/components/ToastProvider'

const AiCard1 = dynamic(() => import('@/components/graphics/AiCard1'), { ssr: false })
const AiCard2 = dynamic(() => import('@/components/graphics/AiCard2'), { ssr: false })

export default function MyPromptsClient({ user, prompts: initialPrompts }: { user: any, prompts: any[] }) {
  const [prompts, setPrompts] = useState<any[]>(initialPrompts)
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', price: '' })
  const { show } = useToast()

  const totalSales = prompts.reduce((sum, p) => sum + (p.sales || 0), 0)
  const totalRevenue = prompts.reduce((sum, p) => sum + ((p.sales || 0) * (p.price || 0)), 0)
  const activePrompts = prompts.length

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Prompts</h1>
          <p className="text-slate-400">Manage your uploaded AI prompts and track their performance</p>
        </div>
        {!!user && (
          <button onClick={() => setShowCreate(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] text-white px-6 py-3 rounded-lg font-semibold transition-all">
            <Plus size={20} />
            Create Prompt
          </button>
        )}
      </div>

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

      {prompts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {prompts.map((prompt) => (
            <div key={prompt.id} className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-[#2563eb]/50 transition-colors">
              <div className="h-48 bg-slate-800 relative overflow-hidden">
                {prompt.image_url ? (
                  <Image src={prompt.image_url} alt={prompt.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    {prompt.id % 2 === 0 ? <AiCard1 /> : <AiCard2 />}
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <div className="px-2 py-1 rounded text-xs font-semibold bg-green-500 text-white">Active</div>
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
          <p className="text-slate-400 mb-4">You haven&#39;t created any prompts yet.</p>
          <button className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            <Plus size={20} />
            Create Your First Prompt
          </button>
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl p-4" onClick={() => setShowCreate(false)}>
          <div className="w-full max-w-lg bg-[#0f172a]/80 border border-slate-700 rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">Create Prompt</h3>
            <div className="space-y-4">
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-400" />
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-400 min-h-[120px]" />
              <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price (USD)" className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-400" />
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg border border-slate-600 text-white">Cancel</button>
              <button onClick={async () => {
                const title = form.title.trim()
                const description = form.description.trim()
                const priceNum = Number(form.price)
                if (!title || !description || !Number.isFinite(priceNum) || priceNum < 0) { show('Please provide valid title, description, and price', 'error'); return }
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) { show('You must be logged in', 'error'); return }
                const { error } = await supabase.from('prompts').insert({ title, description, price: priceNum, user_id: user.id, created_at: new Date().toISOString() })
                if (error) { show('Failed to create prompt', 'error') } else { show('Prompt created successfully', 'success'); setShowCreate(false); setForm({ title: '', description: '', price: '' }) }
              }} className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-green-400">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


