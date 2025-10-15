'use client'
import { supabaseBrowser } from '@/lib/supabase/browserClient'
import { Button } from './Button'

export function Topbar() {
  const signOut = async () => {
    const supabase = supabaseBrowser()
    await supabase.auth.signOut()
    location.href = '/' // Redirect to home after logout
  }
  return (
    <header className="h-16 pl-[92px] md:pl-[260px] flex items-center justify-between border-b border-slate-600/25 pr-4">
      <div className="font-bold">Cenvo</div>
      <Button variant="ghost" onClick={signOut}>Sign out</Button>
    </header>
  )
}

