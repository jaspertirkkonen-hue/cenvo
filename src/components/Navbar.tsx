'use client'
import { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, LogOut } from 'lucide-react'
import { supabaseBrowser } from '@/lib/supabase/browserClient'

export const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Check auth status
    const checkAuth = async () => {
      const supabase = supabaseBrowser()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    checkAuth()

    // Listen for auth changes
    const supabase = supabaseBrowser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    const supabase = supabaseBrowser()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  // Conditional nav links based on auth
  const navLinks = user ? [
    { href: '/overview', label: 'Dashboard' },
    { href: '/market', label: 'Market' },
    { href: '/myprompts', label: 'My Prompts' },
    { href: '/settings', label: 'Settings' },
  ] : [
    { href: '/', label: 'Home' },
    { href: '/market', label: 'Market' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#030712]/90 backdrop-blur-sm shadow-lg border-b border-slate-800' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-white focus-ring rounded-lg">
          <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="heading-tight">Cenvo</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-slate-300 hover:text-white transition-colors focus-ring rounded px-2 py-1"
            >
              {link.label}
            </Link>
          ))}
          {!loading && (
            user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors focus-ring"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-slate-300 hover:text-white transition-colors focus-ring rounded px-2 py-1"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors focus-ring shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="text-white focus:outline-none focus-ring p-2 rounded-lg"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-[#030712]/95 backdrop-blur-sm border-t border-slate-800">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-slate-300 hover:text-white transition-colors py-2 focus-ring rounded px-4"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!loading && (
              user ? (
                <button
                  onClick={() => {
                    handleLogout()
                    setMenuOpen(false)
                  }}
                  className="inline-flex items-center justify-center gap-2 border border-slate-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-center focus-ring"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="border border-slate-600 hover:border-slate-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-center focus-ring"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-center focus-ring"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      )}
    </header>
  )
})