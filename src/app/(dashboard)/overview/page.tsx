'use client'
import { useState, useEffect } from 'react'
import { createServerSupabase } from '@/lib/supabase/server'
import { supabase } from '@/lib/supabase/client'
import { DollarSign, TrendingUp, MessageSquare, BarChart3, ShoppingCart, Package, Wallet, Activity } from 'lucide-react'
import { KpiCard } from '@/components/cards/KpiCard'
import dynamic from 'next/dynamic'

// Dynamic import for heavy components
const Chart = dynamic(() => import('@/components/graphics/AiCard1'), {
  loading: () => <div className="h-64 bg-slate-800 rounded-lg animate-pulse" />,
  ssr: false
})

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

        // Fetch user prompts
        const { data: prompts } = await supabase
          .from('prompts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        // Fetch user purchases
        const { data: purchases } = await supabase
          .from('purchases')
          .select('*')
          .eq('buyer_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5)

        // Calculate stats
        const totalPrompts = prompts?.length || 0
        const totalSales = (prompts || []).reduce((sum, p: any) => sum + ((p.sales || 0) * (p.price || 0)), 0)
        const totalPurchases = purchases?.length || 0
        const balance = totalSales * 0.9 // After 10% fee

        setStats({
          totalPrompts,
          totalSales,
          totalPurchases,
          balance,
          latestPrompt: prompts?.[0] || null
        })

        // Set recent activity
        const activities = [
          ...(prompts || []).slice(0, 2).map((p: any) => ({
            type: 'prompt',
            title: `New prompt "${p.title}" added`,
            time: new Date(p.created_at).toLocaleDateString() || 'Recently'
          })),
          ...(purchases || []).slice(0, 2).map((p: any) => ({
            type: 'purchase',
            title: 'Prompt purchased',
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb] mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-slate-400">No data available. Start by creating your first prompt!</p>
        </div>
      </div>
    )
  }

  const email = user?.email || ''

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[#2563eb] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {email.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {email.split('@')[0]}
            </h1>
            <p className="text-slate-400">{email}</p>
          </div>
        </div>
      </div>

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
        <div className="lg:col-span-2 bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Analytics Overview</h2>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Activity className="h-4 w-4" />
              <span>Real-time data</span>
            </div>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">Analytics chart coming soon</p>
              <p className="text-slate-500 text-sm mt-2">Track your prompt performance over time</p>
            </div>
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
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'prompt' ? 'bg-[#2563eb]' : 'bg-green-500'
                  }`}></div>
                  <div className="text-sm flex-1">
                    <div className="text-white">{activity.title}</div>
                    <div className="text-slate-400">{activity.time}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400">
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Latest Prompt */}
      {stats.latestPrompt && (
        <div className="mt-6 bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Latest Prompt</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{stats.latestPrompt.title}</h3>
              <p className="text-slate-400">
                Created {new Date(stats.latestPrompt.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">${stats.latestPrompt.price}</div>
              <div className="text-slate-400">{stats.latestPrompt.sales || 0} sales</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
