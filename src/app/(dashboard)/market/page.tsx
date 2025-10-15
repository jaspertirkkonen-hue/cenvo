import dynamic from 'next/dynamic'
import { getCachedPrompts, getCachedCategories } from '@/lib/cache/supabase-cache'

export const runtime = 'nodejs'
export const revalidate = 300

const MarketClient = dynamic(() => import('./MarketClient'), { ssr: false })

export default async function MarketPage() {
  // Fetch initial data with caching
  const [initialPrompts, categories] = await Promise.all([
    getCachedPrompts(1, 24),
    getCachedCategories()
  ])

  return <MarketClient initialPrompts={initialPrompts} categories={categories} />
}
