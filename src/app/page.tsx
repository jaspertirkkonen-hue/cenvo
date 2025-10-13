import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Shield, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-12">
            <img src="/images/cenvo-logo.png" alt="Cenvo" className="h-16 mx-auto mb-8" />
            <h1 className="text-6xl font-bold text-[#f1f5f9] mb-6">
              Power <span className="text-[#2563eb]">Generative AI</span> With Your Data
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              Make the best models with the best data. Cenvo leverages your enterprise data, 
              and with our Generative AI Platform, safely unlocks the value of AI.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link 
              href="/register" 
              className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              <ArrowRight size={20} />
              Get Started
            </Link>
            <Link 
              href="/pricing" 
              className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Build AI
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <Sparkles className="h-12 w-12 text-[#2563eb] mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered</h3>
              <p className="text-slate-400">Leverage cutting-edge AI to create and optimize prompts with enterprise-grade security</p>
            </div>
            <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <Zap className="h-12 w-12 text-[#2563eb] mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
              <p className="text-slate-400">Deploy and test prompts in seconds, not hours with our optimized infrastructure</p>
            </div>
            <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <Shield className="h-12 w-12 text-[#2563eb] mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Secure & Reliable</h3>
              <p className="text-slate-400">Enterprise-grade security for your AI workflows with 99.9% uptime guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 px-6 bg-[#0f172a]/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400 mb-8">Cenvo works with Generative AI Companies, U.S. Government Agencies, Enterprises & Startups</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-white font-semibold text-lg">Microsoft</div>
            <div className="text-white font-semibold text-lg">Meta</div>
            <div className="text-white font-semibold text-lg">GM</div>
            <div className="text-white font-semibold text-lg">Toyota</div>
            <div className="text-white font-semibold text-lg">Fox</div>
            <div className="text-white font-semibold text-lg">Accenture</div>
            <div className="text-white font-semibold text-lg">Koch</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2025 Cenvo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}