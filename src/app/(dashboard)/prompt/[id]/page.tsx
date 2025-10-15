import { supabaseServer } from '@/lib/supabase/serverClient'
import PromptDetailClient from './PromptDetailClient'

export const runtime = 'nodejs'
export const revalidate = 300

export default async function PromptDetailPage({ params }: { params: { id: string } }) {
  const supabase = supabaseServer()
  const { data: prompt } = await supabase
    .from('prompts')
    .select('id, title, description, template, image_url, price, category, user_id, created_at')
    .eq('id', params.id)
    .single()

  return <PromptDetailClient prompt={prompt} />
}

