'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, Archive, MessageSquare, Settings, PanelLeftClose, PanelLeftOpen, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const items = [
  { href: '/overview', label: 'Overview', icon: Home },
  { href: '/market', label: 'Market', icon: ShoppingBag },
  { href: '/myprompts', label: 'My Prompts', icon: Archive },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    const e = localStorage.getItem('cenvo:sidebar:expanded')
    if (e) setExpanded(e === '1')
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setEmail(user.email || '')
        setAvatar(user.user_metadata?.avatar_url || null)
      }
    })
  }, [])

  const toggle = () => {
    const next = !expanded
    setExpanded(next)
    localStorage.setItem('cenvo:sidebar:expanded', next ? '1' : '0')
  }

  const logout = async () => {
    await supabase.auth.signOut()
    location.href = '/login'
  }

  return (
    <aside className={`h-screen fixed left-0 top-0 border-r border-slate-600/25 bg-[linear-gradient(180deg,#030712, #0f172a)] transition-[width] duration-300 will-change-[width] ${expanded ? 'w-[260px]' : 'w-[92px]'}`}>
      {/* Logo and Toggle */}
      <div className="h-16 flex items-center px-3 justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/cenvo-logo.png" alt="Cenvo" className="h-8" />
          {expanded && <span className="text-lg font-bold text-white">Cenvo</span>}
        </div>
        <button onClick={toggle} className="p-2 rounded-md border border-slate-600/30 hover:border-slate-400 transition-colors">
          {expanded ? <PanelLeftClose size={16}/> : <PanelLeftOpen size={16}/>}        
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} className={`group relative mx-2 my-1 flex items-center gap-3 rounded-md px-3 py-2 transition-transform will-change-transform ${active ? 'bg-slate-700/15 border-l-2 border-blue-400' : 'hover:bg-slate-700/10'} `}>
              <Icon className="text-white" size={20} />
              {expanded && <span className="text-sm text-slate-400 group-hover:text-slate-100 transition-colors">{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="absolute bottom-0 w-full p-3 border-t border-slate-600/25">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-500" style={avatar ? { backgroundImage: `url(${avatar})`, backgroundSize:'cover' } : {}} />
          {expanded && <div className="text-xs text-slate-400 truncate">{email}</div>}
        </div>
        <button onClick={logout} className="mt-3 w-full inline-flex items-center justify-center gap-2 border border-slate-600/40 rounded-md py-2 hover:border-slate-400 transition-colors">
          <LogOut size={16}/> {expanded && 'Logout'}
        </button>
      </div>
    </aside>
  )
}