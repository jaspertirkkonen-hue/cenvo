'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import { DollarSign, TrendingUp, MessageSquare, BarChart3, ShoppingCart, Package, Wallet, Activity } from 'lucide-react'
import { KpiCard } from '@/components/cards/KpiCard'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Sample chart data (will be replaced with real data)
const mockChartData = [
  { name: 'Jan', sales: 0 },
  { name: 'Feb', sales: 0 },
  { name: 'Mar', sales: 0 },
  { name: 'Apr', sales: 0 },
  { name: 'May', sales: 0 },
  { name: 'Jun', sales: 0 },
]

export default function OverviewPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Get user
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        if (!user) {
          setLoading(false)
          return
        }

        // Fetch user's own prompts
        const { data: myPrompts } = await supabase
          .from('prompts')
          .select('id, title, description, price, sales, created_at, image_url')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        // Fetch user purchases with prompt details
        const { data: purchases } = await supabase
          .from('purchases')
          .select('id, created_at, price, prompts(title)')
          .eq('buyer_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5)

        // Calculate stats
        const totalPrompts = myPrompts?.length || 0
        const totalSales = (myPrompts || []).reduce((sum, p: any) => sum + ((p.sales || 0) * (p.price || 0)), 0)
        const totalPurchases = purchases?.length || 0
        const balance = totalSales * 0.9 // After 10% fee

        setStats({
          totalPrompts,
          totalSales,
          totalPurchases,
          balance,
          latestPrompt: myPrompts?.[0] || null
        })

        // Set recent activity
        const activities = [
          ...(myPrompts || []).slice(0, 2).map((p: any) => ({
            type: 'prompt',
            title: `New prompt "${p.title}" added`,
            time: new Date(p.created_at).toLocaleDateString() || 'Recently'
          })),
          ...(purchases || []).slice(0, 2).map((p: any) => ({
            type: 'purchase',
            title: `Purchased: ${p.prompts?.title || 'Prompt'}`,
            time: new Date(p.created_at).toLocaleDateString() || 'Recently'
          }))
        ]
        setRecentActivity(activities)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F46E5] mx-auto mb-4"></div>
          <p className="text-[#9CA3AF]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-6">
        <div className="text-center py-12 bg-[#151821] border border-slate-700 rounded-xl">
          <p className="text-[#9CA3AF]">No data available. Start by creating your first prompt!</p>
        </div>
      </div>
    )
  }

  const email = user?.email || ''

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#0EA5E9] rounded-full flex items-center justify-center shadow-lg shadow-[rgba(79,70,229,0.35)]">
            <span className="text-white font-bold text-lg">
              {email.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#E5E7EB]">
              Welcome back, <span className="gradient-text">{email.split('@')[0]}</span>
            </h1>
            <p className="text-[#9CA3AF]">{email}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard
          label="My Prompts"
          value={stats.totalPrompts}
          icon={MessageSquare}
          change="Active prompts"
          changeType="neutral"
        />
        <KpiCard
          label="Purchases"
          value={stats.totalPurchases}
          icon={ShoppingCart}
          change="Total purchases"
          changeType="neutral"
        />
        <KpiCard
          label="Sales"
          value={`$${stats.totalSales.toFixed(2)}`}
          icon={Package}
          change="Total revenue"
          changeType="positive"
        />
        <KpiCard
          label="Balance"
          value={`$${stats.balance.toFixed(2)}`}
          icon={Wallet}
          change="After fees (10%)"
          changeType="positive"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Analytics Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-[#151821] backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover-glow"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#E5E7EB]">Sales Analytics</h2>
            <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <Activity className="h-4 w-4 text-[#0EA5E9]" />
              <span>Real-time data</span>
            </div>
          </div>
          
          {/* Recharts Chart */}
          <div className="h-64 rounded-lg mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#151821', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#E5E7EB'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="url(#colorSales)" 
                  strokeWidth={3}
                  dot={{ fill: '#4F46E5', r: 4 }}
                  activeDot={{ r: 6, fill: '#0EA5E9' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <div className="text-slate-400">Total Views</div>
              <div className="text-white font-semibold text-lg">-</div>
            </div>
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <div className="text-slate-400">Downloads</div>
              <div className="text-white font-semibold text-lg">-</div>
            </div>
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <div className="text-slate-400">Avg Rating</div>
              <div className="text-white font-semibold text-lg">-</div>
            </div>
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <div className="text-slate-400">Conversion</div>
              <div className="text-white font-semibold text-lg">-</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#151821] backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover-glow"
        >
          <h2 className="text-xl font-bold text-[#E5E7EB] mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'prompt' ? 'bg-[#4F46E5]' : 'bg-[#0EA5E9]'
                  }`}></div>
                  <div className="text-sm flex-1">
                    <div className="text-[#E5E7EB]">{activity.title}</div>
                    <div className="text-[#9CA3AF]">{activity.time}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[#9CA3AF]">
                No recent activity
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Latest Prompt */}
      {stats.latestPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-[#151821] backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover-glow"
        >
          <h2 className="text-xl font-bold text-[#E5E7EB] mb-4">Latest Prompt</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#E5E7EB]">{stats.latestPrompt.title}</h3>
              <p className="text-[#9CA3AF]">
                Created {new Date(stats.latestPrompt.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold gradient-text">${stats.latestPrompt.price}</div>
              <div className="text-[#9CA3AF]">{stats.latestPrompt.sales || 0} sales</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
