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
    <header className="bg-[#030712] border-b border-slate-800">
      {/* Top Bar */}
      <div className="bg-slate-900 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <span className="text-slate-400">Orders</span>
            <span className="text-slate-400">Transfer Money</span>
            <span className="text-slate-400">Messages 4</span>
            <span className="text-slate-400">Logout</span>
          </div>
          <button className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-1 rounded text-sm">
            Restart and Update
          </button>
        </div>
      </div>

      {/* Market Data Bar */}
      <div className="bg-slate-800 px-6 py-2">
        <div className="flex items-center gap-8 text-sm">
          <span className="text-red-400">OMXH25 -0,02% 5 063,63</span>
          <span className="text-green-400">DAX ▲+0,60% 24 387,93</span>
          <span className="text-green-400">SP500F ▲+1,74% 6 709,75</span>
          <span className="text-green-400">WTI-öljy ▲+0,40% 59,33</span>
          <span className="text-red-400">EUR/USD -0,23% 1,16</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/overview" className="flex items-center gap-2">
            <img src="/images/cenvo-logo.png" alt="Cenvo" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">Cenvo</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-[#2563eb] border-b-2 border-[#2563eb] pb-1'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-white">
              <Bell size={20} />
            </button>
            <button className="text-slate-400 hover:text-white">
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
              className="text-slate-400 hover:text-white text-sm"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
