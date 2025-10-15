import dynamic from 'next/dynamic'
import { createServerSupabase } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const revalidate = 300

const OverviewClient = dynamic(() => import('./OverviewClient'), { ssr: false })

export default async function OverviewPage() {
  const supabase = createServerSupabase()
  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user
  if (!user) {
    return <OverviewClient user={null} stats={null} recentActivity={[]} />
  }

  const { data: myPrompts } = await supabase
    .from('prompts')
    .select('id, title, description, price, sales, created_at, image_url')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const { data: purchases } = await supabase
    .from('purchases')
    .select('id, created_at, price, prompts(title)')
    .eq('buyer_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const totalPrompts = myPrompts?.length || 0
  const totalSales = (myPrompts || []).reduce((sum: number, p: any) => sum + ((p.sales || 0) * (p.price || 0)), 0)
  const totalPurchases = purchases?.length || 0
  const balance = totalSales * 0.9

  const stats = {
    totalPrompts,
    totalSales,
    totalPurchases,
    balance,
    latestPrompt: myPrompts?.[0] || null
  }

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

  return <OverviewClient user={user} stats={stats} recentActivity={activities} />
}
