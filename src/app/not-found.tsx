'use client'
import Link from 'next/link'
import { Home, LogIn, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-[#2563eb] mb-4">404</div>
          <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-slate-400 text-lg">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors w-full justify-center"
          >
            <Home size={20} />
            Go Home
          </Link>
          
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors w-full justify-center"
          >
            <LogIn size={20} />
            Sign In
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-full justify-center"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
