import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { supabaseServer } from '@/lib/supabase/serverClient'
import { LazyWrapper } from '@/components/LazyWrapper'

export const runtime = 'nodejs'
export const revalidate = 300

// Lazy load the client component with custom fallback
const OverviewClient = dynamic(() => import('./OverviewClient'), { 
  ssr: false,
  loading: () => (
    <LazyWrapper>
      <div className="p-6 space-y-6">
        <div className="h-8 bg-cosmic-800/50 rounded-lg animate-pulse" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-cosmic-800/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </LazyWrapper>
  )
})

// Server component for fetching user data
async function getUserData() {
  const supabase = supabaseServer()
  const { data: userData } = await supabase.auth.getUser()
  return userData?.user
}

// Server component for fetching user stats
async function getUserStats(userId: string) {
  const supabase = supabaseServer()
  
  const [promptsResult, purchasesResult] = await Promise.all([
    supabase
      .from('prompts')
      .select('id, title, description, price, sales, created_at, image_url, category, template')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),
    supabase
      .from('purchases')
      .select('id, created_at, amount')
      .eq('user_id', userId)
  ])

  const myPrompts = promptsResult.data || []
  const purchases = purchasesResult.data || []

  const totalPrompts = myPrompts?.length || 0
  const totalSales = (myPrompts || []).reduce((sum: number, p: any) => sum + ((p.sales || 0) * (p.price || 0)), 0)
  const totalPurchases = purchases?.length || 0
  const balance = totalSales * 0.9

  return {
    totalPrompts,
    totalSales,
    totalPurchases,
    balance,
    latestPrompt: myPrompts?.[0] || null
  }
}

export default async function OverviewPage() {
  const user = await getUserData()
  
  if (!user) {
    return (
      <Suspense fallback={<LazyWrapper><div>Loading...</div></LazyWrapper>}>
        <OverviewClient user={null} stats={null} recentActivity={[]} />
      </Suspense>
    )
  }

  const [stats, activities] = await Promise.all([
    getUserStats(user.id),
    Promise.resolve([]) // Simplified for now
  ])

  return (
    <Suspense fallback={<LazyWrapper><div>Loading...</div></LazyWrapper>}>
      <OverviewClient user={user} stats={stats} recentActivity={activities} />
    </Suspense>
  )
}
