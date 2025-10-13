'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserPlus, Mail, Github } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const register = async () => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      router.replace('/overview')
    } catch (e: any) {
      setError(e.message)
    } finally { 
      setLoading(false) 
    }
  }

  const signInOAuth = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({ 
      provider, 
      options: { redirectTo: 'https://cenvo.io/auth/callback' } 
    })
  }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md bg-[#0f172a]/70 backdrop-blur-sm border border-slate-600/30 rounded-xl p-8">
        <div className="text-center mb-8">
          <img src="/images/cenvo-logo.png" alt="Cenvo" className="h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Join Cenvo</h1>
          <p className="text-slate-400">Create your account to get started</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input 
              className="w-full rounded-lg bg-slate-700/50 border border-slate-600/30 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#2563eb] transition-colors" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input 
              className="w-full rounded-lg bg-slate-700/50 border border-slate-600/30 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#2563eb] transition-colors" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              type="password"
              placeholder="Create a password"
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button 
            disabled={loading} 
            onClick={register} 
            className="w-full inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            <UserPlus size={18}/> 
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0f172a] text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => signInOAuth('google')} 
              className="inline-flex items-center justify-center gap-2 border border-slate-600/40 rounded-lg py-3 hover:border-slate-400 transition-colors"
            >
              <Mail size={18}/> 
              Google
            </button>
            <button 
              onClick={() => signInOAuth('github')} 
              className="inline-flex items-center justify-center gap-2 border border-slate-600/40 rounded-lg py-3 hover:border-slate-400 transition-colors"
            >
              <Github size={18}/> 
              GitHub
            </button>
          </div>

          <p className="text-sm text-slate-400 text-center">
            Already have an account?{' '}
            <Link className="text-[#2563eb] hover:text-blue-400 transition-colors" href="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}