import { Edit, Trash2, Eye, Download, MoreHorizontal } from 'lucide-react'

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
      rating: 4.8
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
      rating: 4.9
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
      rating: 4.7
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

      {/* Prompts Table */}
      <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {prompts.map((prompt) => (
                <tr key={prompt.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{prompt.title}</div>
                      <div className="text-sm text-slate-400">ID: {prompt.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2563eb]/20 text-[#2563eb]">
                      {prompt.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    ${prompt.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{prompt.sales}</div>
                    <div className="text-xs text-slate-400">{prompt.downloads} downloads</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    ${(prompt.sales * prompt.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      prompt.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {prompt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {new Date(prompt.created).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-[#2563eb] hover:text-blue-700 p-1">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-500 hover:text-green-700 p-1">
                        <Edit size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-white p-1">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="mt-8 bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Performance Overview</h2>
        <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl text-slate-400 mb-4">📊</div>
            <p className="text-slate-400">Performance chart placeholder</p>
            <p className="text-sm text-slate-500 mt-2">Track your prompt performance over time</p>
          </div>
        </div>
      </div>
    </div>
  )
}