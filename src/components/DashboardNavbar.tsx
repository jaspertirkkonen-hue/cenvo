'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, LogOut, Bell, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export function DashboardNavbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const navItems = [
    { href: '/overview', label: 'Overview' },
    { href: '/market', label: 'Market' },
    { href: '/myprompts', label: 'My Prompts' },
    { href: '/chat', label: 'Chat' },
    { href: '/settings', label: 'Settings' },
  ]

  return (
    <header className="bg-[#030712] border-b border-slate-800 sticky top-0 z-50">
      <nav className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/overview" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-white">Cenvo</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-[#2563eb]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#2563eb] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            <button className="text-slate-400 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm text-slate-300">{user?.email?.split('@')[0] || 'User'}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}