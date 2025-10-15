import { createServerSupabase } from '@/lib/supabase/server'
import dynamic from 'next/dynamic'

export const runtime = 'nodejs'
export const revalidate = 300

const MarketClient = dynamic(() => import('./MarketClient'), { ssr: false })

export default async function MarketPage() {
  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('prompts')
    .select('id, title, description, price, image_url, created_at, category')
    .order('created_at', { ascending: false })
    .limit(24)

  const initialPrompts = error ? [] : data || []

  return <MarketClient initialPrompts={initialPrompts} />
}
