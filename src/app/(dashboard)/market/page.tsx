import dynamic from 'next/dynamic'
import { createServerSupabase } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const revalidate = 300

const MarketClient = dynamic(() => import('./MarketClient'), { ssr: false })

export default async function MarketPage() {
  const supabase = createServerSupabase()
  
  // Fetch initial data directly from Supabase
  const [promptsResult, categoriesResult] = await Promise.all([
    supabase
      .from('prompts')
      .select('id, title, description, price, image_url, created_at, category, sales, user_id')
      .order('created_at', { ascending: false })
      .limit(24),
    supabase
      .from('prompts')
      .select('category')
      .not('category', 'is', null)
  ])

  const initialPrompts = promptsResult.data || []
  const categories = categoriesResult.data?.map(item => item.category).filter(Boolean) || []

  return <MarketClient initialPrompts={initialPrompts} categories={categories} />
}
