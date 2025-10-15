import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { getCachedUserPrompts } from '@/lib/cache/supabase-cache'
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
  const { createServerSupabase } = await import('@/lib/supabase/server')
  const supabase = createServerSupabase()
  const { data: userData } = await supabase.auth.getUser()
  return userData?.user
}

// Server component for fetching user stats
async function getUserStats(userId: string) {
  const [myPrompts, purchases] = await Promise.all([
    getCachedUserPrompts(userId),
    // Add cached purchases when available
    Promise.resolve([])
  ])

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
      <Suspense fallback={<LazyWrapper />}>
        <OverviewClient user={null} stats={null} recentActivity={[]} />
      </Suspense>
    )
  }

  const [stats, activities] = await Promise.all([
    getUserStats(user.id),
    Promise.resolve([]) // Simplified for now
  ])

  return (
    <Suspense fallback={<LazyWrapper />}>
      <OverviewClient user={user} stats={stats} recentActivity={activities} />
    </Suspense>
  )
}
