'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Github, Mail, KeyRound, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signInEmail = async () => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.replace('/overview')
    } catch (e: any) {
      setError(e.message)
    } finally { 
      setLoading(false) 
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email && password && !loading) {
      signInEmail()
    }
  }

  const signInOAuth = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { 
        redirectTo: process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`
      }
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#030712]">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2563eb] to-[#7c3aed] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-3xl font-bold text-white heading-tight">Cenvo</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 heading-tight">Welcome back</h1>
          <p className="text-slate-400 text-lg">Sign in to your Cenvo account</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0f172a]/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl p-8 animate-fade-in-up delay-100">
          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email address
              </label>
              <input 
                id="email"
                className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                onKeyPress={handleKeyPress}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-[#2563eb] hover:text-blue-400 transition-colors">
                  Forgot?
                </Link>
              </div>
              <input 
                id="password"
                className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                onKeyPress={handleKeyPress}
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-700/50 text-red-400 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Sign In Button */}
            <button 
              disabled={loading || !email || !password} 
              onClick={signInEmail} 
              className="w-full inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover-lift focus-ring"
            >
              <KeyRound size={18} aria-hidden="true" /> 
              {loading ? 'Signing in...' : 'Sign in'}
              {!loading && <ArrowRight size={18} aria-hidden="true" />}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-[#0f172a] text-slate-400 font-medium">Or continue with</span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => signInOAuth('google')} 
                className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-lg py-3 px-4 transition-all duration-200 focus-ring"
                aria-label="Sign in with Google"
              >
                <Mail size={18} aria-hidden="true" /> 
                <span className="font-medium">Google</span>
              </button>
              <button 
                onClick={() => signInOAuth('github')} 
                className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-lg py-3 px-4 transition-all duration-200 focus-ring"
                aria-label="Sign in with GitHub"
              >
                <Github size={18} aria-hidden="true" /> 
                <span className="font-medium">GitHub</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-slate-400 mt-6 animate-fade-in-up delay-200">
          Don't have an account?{' '}
          <Link 
            className="text-[#2563eb] hover:text-blue-400 font-semibold transition-colors focus-ring rounded px-1" 
            href="/register"
          >
            Create one
          </Link>
        </p>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link 
            href="/" 
            className="text-sm text-slate-500 hover:text-slate-400 transition-colors inline-flex items-center gap-1 focus-ring rounded px-2 py-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
