import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        {/* 404 with Quantum Blue gradient */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-3xl font-bold text-[#E5E7EB] mb-4">Page Not Found</h2>
          <p className="text-[#9CA3AF] text-lg">
            The page you&#39;re looking for doesn&#39;t exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] hover:shadow-[0_0_30px_rgba(79,70,229,0.35)] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
          >
            <Home size={20} />
            Go Home
          </Link>
          <Link
            href="/market"
            className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-[#4F46E5] text-[#E5E7EB] font-semibold px-8 py-3 rounded-xl transition-all duration-300"
          >
            <Search size={20} />
            Browse Marketplace
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4F46E5] animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-[#0EA5E9] animate-pulse delay-100"></div>
          <div className="w-3 h-3 rounded-full bg-[#4F46E5] animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  )
}
