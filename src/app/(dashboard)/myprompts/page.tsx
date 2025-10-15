import dynamic from 'next/dynamic'
import { createServerSupabase } from '@/lib/supabase/server'
export const runtime = 'nodejs'
export const revalidate = 300

const MyPromptsClient = dynamic(() => import('./MyPromptsClient'), { ssr: false })

export default async function MyPromptsPage() {
  const supabase = createServerSupabase()
  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user
  if (!user) return <MyPromptsClient user={null} prompts={[]} />

  const { data } = await supabase
    .from('prompts')
    .select('id, title, description, category, price, sales, created_at, image_url')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <MyPromptsClient user={user} prompts={data || []} />
}
