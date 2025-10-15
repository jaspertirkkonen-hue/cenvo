'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { User, LogOut, Bell, Search, ShoppingBag, Heart, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabaseBrowser } from '@/lib/supabase/browserClient'

export function DashboardNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const supabase = supabaseBrowser()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    const supabase = supabaseBrowser()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/market?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const navItems = [
    { href: '/overview', label: 'Overview' },
    { href: '/market', label: 'Market' },
    { href: '/myprompts', label: 'My Prompts' },
    { href: '/chat', label: 'Chat' },
    { href: '/settings', label: 'Settings' },
  ]

  return (
    <header className="bg-[#0B0C10]/90 backdrop-blur-sm border-b border-slate-800/50 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/overview" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#0EA5E9] rounded-xl flex items-center justify-center shadow-lg shadow-[rgba(79,70,229,0.35)]">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-[#E5E7EB] hidden md:block">Cenvo</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-[#E5E7EB]'
                    : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <div className="h-0.5 bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] mt-1 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Global Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF]" size={18} />
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#151821] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#4F46E5] transition-colors"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Create Prompt Button */}
            <Link
              href="/myprompts?create=true"
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] hover:shadow-[0_0_30px_rgba(79,70,229,0.35)] text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300"
            >
              <Plus size={18} />
              Create
            </Link>

            {/* Notifications */}
            <button className="relative text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors p-2">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#0EA5E9] rounded-full"></span>
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 text-[#E5E7EB] hover:bg-[#151821] p-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#0EA5E9] rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="hidden md:block text-sm">{user?.email?.split('@')[0] || 'User'}</span>
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-[#151821] border border-slate-700 rounded-xl shadow-xl overflow-hidden"
                  >
                    <Link
                      href="/myprompts?tab=purchases"
                      className="flex items-center gap-3 px-4 py-3 text-[#E5E7EB] hover:bg-[#0B0C10] transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <ShoppingBag size={16} />
                      My Purchases
                    </Link>
                    <Link
                      href="/myprompts?tab=favorites"
                      className="flex items-center gap-3 px-4 py-3 text-[#E5E7EB] hover:bg-[#0B0C10] transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Heart size={16} />
                      My Favorites
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-[#0B0C10] transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
