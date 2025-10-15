import Link from 'next/link'
import { Check, Star, ArrowRight, Sparkles, Users } from 'lucide-react'
import { TopNav } from '@/components/nav/TopNav'

export const metadata = {
  title: 'Marketplace - Cenvo',
  description: 'Browse and purchase AI prompts. 5-10% marketplace fee on all transactions.',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <TopNav />
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#f1f5f9] mb-6">
            AI Prompt <span className="text-[#2563eb]">Marketplace</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Buy and sell high-quality AI prompts. Simple, transparent marketplace fees.
          </p>
        </div>

        {/* Marketplace Info */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#2563eb]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-[#2563eb]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">For Buyers</h3>
            <p className="text-slate-400 mb-6">
              Browse thousands of prompts. Pay only for what you use. No subscriptions required.
            </p>
            <Link
              href="/market"
              className="inline-block bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Browse Market
            </Link>
          </div>

          <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-[#2563eb] ring-2 ring-[#2563eb]/20 rounded-2xl p-8 text-center">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-[#2563eb] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star size={16} />
                Most Popular
              </div>
            </div>
            <div className="w-16 h-16 bg-[#2563eb]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-[#2563eb]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Marketplace Fee</h3>
            <div className="mb-6">
              <div className="text-5xl font-bold text-white mb-2">5-10%</div>
              <p className="text-slate-400">per transaction</p>
            </div>
            <ul className="text-left space-y-3 text-slate-300 mb-6">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-[#2563eb] flex-shrink-0" />
                Secure payments
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-[#2563eb] flex-shrink-0" />
                Instant delivery
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-[#2563eb] flex-shrink-0" />
                Quality guarantee
              </li>
            </ul>
          </div>

          <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#2563eb]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Star className="h-8 w-8 text-[#2563eb]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">For Sellers</h3>
            <p className="text-slate-400 mb-6">
              Sell your prompts and earn. Set your own prices. Get paid instantly.
            </p>
            <Link
              href="/register"
              className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Start Selling
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">How does pricing work?</h3>
              <p className="text-slate-400">Each prompt has its own price set by the seller. We charge a 5-10% marketplace fee on each transaction.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Do I need a subscription?</h3>
              <p className="text-slate-400">No! Simply create a free account, browse prompts, and purchase only what you need.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-slate-400">We accept all major credit cards and PayPal for secure transactions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Can I get a refund?</h3>
              <p className="text-slate-400">Yes, we offer refunds within 7 days if the prompt doesn&#39;t meet the description.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-slate-300 mb-8">Join thousands of creators buying and selling AI prompts</p>
          <Link 
            href="/market" 
            className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Explore Marketplace
            <ArrowRight size={20} />
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}