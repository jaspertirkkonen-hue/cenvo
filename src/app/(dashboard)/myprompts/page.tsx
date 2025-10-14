import Image from 'next/image'
import { Edit, Trash2, Eye, Download } from 'lucide-react'
import { AiCard1 } from '@/components/graphics/AiCard1'
import { AiCard2 } from '@/components/graphics/AiCard2'

export default function MyPromptsPage() {
  const prompts = [
    {
      id: 1,
      title: 'AI Content Writer',
      category: 'Writing',
      price: 25.00,
      sales: 120,
      status: 'Active',
      created: '2024-01-15',
      downloads: 120,
      rating: 4.8,
      image: '/images/ux.jpg'
    },
    {
      id: 2,
      title: 'Image Generator Pro',
      category: 'Art',
      price: 35.00,
      sales: 85,
      status: 'Active',
      created: '2024-01-10',
      downloads: 85,
      rating: 4.9,
      image: '/images/curated.jpg'
    },
    {
      id: 3,
      title: 'Code Debugger Helper',
      category: 'Development',
      price: 15.00,
      sales: 40,
      status: 'Inactive',
      created: '2024-01-05',
      downloads: 40,
      rating: 4.6
    },
    {
      id: 4,
      title: 'Business Strategy Planner',
      category: 'Business',
      price: 45.00,
      sales: 67,
      status: 'Active',
      created: '2024-01-01',
      downloads: 67,
      rating: 4.7,
      image: '/images/pitch.jpg'
    }
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Prompts</h1>
        <p className="text-slate-400">Manage your uploaded AI prompts and track their performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="text-2xl font-bold text-white mb-2">{prompts.length}</div>
          <div className="text-slate-400 text-sm">Total Prompts</div>
        </div>
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="text-2xl font-bold text-white mb-2">{prompts.filter(p => p.status === 'Active').length}</div>
          <div className="text-slate-400 text-sm">Active</div>
        </div>
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="text-2xl font-bold text-white mb-2">{prompts.reduce((sum, p) => sum + p.sales, 0)}</div>
          <div className="text-slate-400 text-sm">Total Sales</div>
        </div>
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="text-2xl font-bold text-white mb-2">${prompts.reduce((sum, p) => sum + (p.sales * p.price), 0).toFixed(2)}</div>
          <div className="text-slate-400 text-sm">Total Revenue</div>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-[#2563eb]/50 transition-colors">
            <div className="h-48 bg-slate-800 relative overflow-hidden">
              {prompt.image ? (
                <Image
                  src={prompt.image}
                  alt={prompt.title}
                  fill
                  className="object-cover"
                />
              ) : (
                prompt.id % 2 === 0 ? <AiCard1 className="w-full h-full" /> : <AiCard2 className="w-full h-full" />
              )}
              <div className="absolute top-4 right-4">
                <div className={`px-2 py-1 rounded text-xs font-semibold ${
                  prompt.status === 'Active' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {prompt.status}
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">{prompt.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{prompt.category}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-white">${prompt.price}</div>
                <div className="text-sm text-slate-400">{prompt.sales} sales</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-[#2563eb] hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors">
                  <Edit size={16} className="inline mr-1" />
                  Edit
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded text-sm transition-colors">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Performance Overview</h2>
        <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <p className="text-slate-400">Performance chart placeholder</p>
            <p className="text-sm text-slate-500 mt-2">Track your prompt performance over time</p>
          </div>
        </div>
      </div>
    </div>
  )
}