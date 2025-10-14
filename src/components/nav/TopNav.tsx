'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export function TopNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    // Passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/login', label: 'Login' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#030712]/95 backdrop-blur-md shadow-xl border-b border-slate-800/50' : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between" role="navigation" aria-label="Main navigation">
        <Link 
          href="/" 
          className="flex items-center gap-3 text-2xl font-bold text-white focus-ring rounded-lg"
          aria-label="Cenvo home"
        >
          <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center shadow-lg" aria-hidden="true">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="heading-tight">Cenvo</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`relative text-sm font-medium transition-colors duration-200 focus-ring rounded px-2 py-1 ${
                pathname === link.href
                  ? 'text-[#2563eb]'
                  : 'text-slate-300 hover:text-white'
              }`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
              {pathname === link.href && (
                <span 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#2563eb] rounded-full" 
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
          <Link 
            href="/register" 
            className="bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 shadow-lg hover-lift focus-ring"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)} 
          className="md:hidden text-white focus-ring p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-[#030712]/98 backdrop-blur-md border-t border-slate-800/50">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4" role="menu">
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`transition-colors py-3 px-4 rounded-lg focus-ring ${
                  pathname === link.href 
                    ? 'text-[#2563eb] bg-[#2563eb]/10' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                }`}
                onClick={() => setMenuOpen(false)}
                role="menuitem"
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/register" 
              className="bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center shadow-lg focus-ring"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}