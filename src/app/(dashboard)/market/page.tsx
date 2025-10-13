import { Search, Filter, Star, Eye, Download } from 'lucide-react'

export default function MarketPage() {
  const prompts = [
    {
      id: 1,
      title: 'AI Content Writer Pro',
      description: 'Advanced content generation with SEO optimization and brand voice consistency.',
      category: 'Writing',
      price: 29.99,
      rating: 4.8,
      downloads: 1247,
      author: 'AI Expert',
      image: '/images/ux.jpg'
    },
    {
      id: 2,
      title: 'Image Generator Master',
      description: 'Create stunning visuals with detailed prompts for any style or concept.',
      category: 'Art',
      price: 19.99,
      rating: 4.9,
      downloads: 2156,
      author: 'Creative Pro',
      image: '/images/curated.jpg'
    },
    {
      id: 3,
      title: 'Code Debugger Assistant',
      description: 'Debug and optimize code with intelligent error detection and solutions.',
      category: 'Development',
      price: 39.99,
      rating: 4.7,
      downloads: 892,
      author: 'Dev Master',
      image: '/images/secure.jpg'
    },
    {
      id: 4,
      title: 'Business Strategy Planner',
      description: 'Comprehensive business planning with market analysis and growth strategies.',
      category: 'Business',
      price: 49.99,
      rating: 4.6,
      downloads: 634,
      author: 'Strategy Expert',
      image: '/images/pitch.jpg'
    },
    {
      id: 5,
      title: 'Crypto Trading Bot',
      description: 'Automated trading strategies with risk management and market analysis.',
      category: 'Finance',
      price: 79.99,
      rating: 4.5,
      downloads: 423,
      author: 'Crypto Pro',
      image: '/images/crypto.jpg'
    },
    {
      id: 6,
      title: 'Global Market Analyzer',
      description: 'Real-time market analysis with global economic indicators and trends.',
      category: 'Finance',
      price: 59.99,
      rating: 4.8,
      downloads: 756,
      author: 'Market Expert',
      image: '/images/global.jpg'
    }
  ]

  const categories = ['All', 'Writing', 'Art', 'Development', 'Business', 'Finance']

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
              className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:border-[#2563eb]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === 'All'
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-[#2563eb]/50 transition-colors group">
            {/* Image */}
            <div className="h-48 bg-slate-800 relative overflow-hidden">
              <img 
                src={prompt.image} 
                alt={prompt.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-[#2563eb] text-white px-2 py-1 rounded text-xs font-semibold">
                  {prompt.category}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-[#2563eb] transition-colors">
                  {prompt.title}
                </h3>
                <div className="text-2xl font-bold text-white">${prompt.price}</div>
              </div>

              <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                {prompt.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{prompt.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>{prompt.downloads}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>2.1k views</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  by <span className="text-white">{prompt.author}</span>
                </div>
                <button className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
          Load More Prompts
        </button>
      </div>
    </div>
  )
}