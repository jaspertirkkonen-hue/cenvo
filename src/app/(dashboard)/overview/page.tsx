import { createServerSupabase } from '@/lib/supabase/server'
import { DollarSign, TrendingUp, MessageSquare, BarChart3 } from 'lucide-react'

export default async function OverviewPage() {
  const supabase = createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  const email = user?.email || ''

  const { data: profile } = await supabase
    .from('users')
    .select('username, avatar_url')
    .eq('id', user?.id)
    .single()

  const { data: latest } = await supabase
    .from('prompts')
    .select('title, created_at, price, sales')
    .eq('owner', user?.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data: agg } = await supabase
    .from('prompts')
    .select('price, sales')
    .eq('owner', user?.id)

  const totalSales = (agg || []).reduce((sum, p: any) => sum + ((p.sales || 0) * (p.price || 0)), 0)
  const count = (agg || []).length

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[#2563eb] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {(profile?.username || email.split('@')[0]).charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {profile?.username || email.split('@')[0]}
            </h1>
            <p className="text-slate-400">{email}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Account Value</h3>
            <DollarSign className="h-6 w-6 text-[#2563eb]" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">${totalSales.toFixed(2)}</div>
          <div className="text-sm text-slate-400">Total earnings</div>
        </div>

        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">My Prompts</h3>
            <MessageSquare className="h-6 w-6 text-[#2563eb]" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{count}</div>
          <div className="text-sm text-slate-400">Active prompts</div>
        </div>

        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Performance</h3>
            <TrendingUp className="h-6 w-6 text-[#2563eb]" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">+12.5%</div>
          <div className="text-sm text-slate-400">This month</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Performance Overview</h2>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>YTD 0,00% 0 EUR</span>
            </div>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">Performance chart placeholder</p>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-slate-400">Today</div>
              <div className="text-white font-semibold">0,00%</div>
            </div>
            <div className="text-center">
              <div className="text-slate-400">1 Week</div>
              <div className="text-white font-semibold">0,00%</div>
            </div>
            <div className="text-center">
              <div className="text-slate-400">1 Month</div>
              <div className="text-white font-semibold">0,00%</div>
            </div>
            <div className="text-center">
              <div className="text-slate-400">YTD</div>
              <div className="text-white font-semibold">0,00%</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#2563eb] rounded-full"></div>
              <div className="text-sm">
                <div className="text-white">New prompt "AI Art Generator" added</div>
                <div className="text-slate-400">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="text-sm">
                <div className="text-white">Sale recorded for "Content Creation Assistant"</div>
                <div className="text-slate-400">5 hours ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="text-sm">
                <div className="text-white">User feedback received</div>
                <div className="text-slate-400">1 day ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#2563eb] rounded-full"></div>
              <div className="text-sm">
                <div className="text-white">Profile updated</div>
                <div className="text-slate-400">2 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Prompt */}
      {latest && (
        <div className="mt-6 bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Latest Prompt</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{latest.title}</h3>
              <p className="text-slate-400">Created {new Date(latest.created_at).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">${latest.price}</div>
              <div className="text-slate-400">{latest.sales || 0} sales</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}