import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Zap, Shield, CheckCircle, Users, Star } from 'lucide-react'
import { MeshBG } from '@/components/graphics/MeshBG'
import { AiCard1 } from '@/components/graphics/AiCard1'

export const metadata = {
  title: 'Cenvo - AI Prompt Marketplace',
  description: 'Power Generative AI With Your Data. Make the best models with the best data.',
  openGraph: {
    title: 'Cenvo - AI Prompt Marketplace',
    description: 'Power Generative AI With Your Data',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-[#030712]">
        {/* Hero Section - Match Nordea proportions */}
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <MeshBG className="w-full h-full" />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] heading-tighter animate-fade-in-up">
                  Power <span className="text-[#2563eb]">Generative AI</span> With Your Data
                </h1>
                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl animate-fade-in-up delay-100">
                  Make the best models with the best data. Cenvo leverages your enterprise data, 
                  and with our Generative AI Platform, safely unlocks the value of AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up delay-200">
                  <Link 
                    href="/register" 
                    className="inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover-lift focus-ring"
                  >
                    <ArrowRight size={20} aria-hidden="true" />
                    Get Started
                  </Link>
                  <Link 
                    href="/pricing" 
                    className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:bg-slate-800/30 focus-ring"
                  >
                    Build AI
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end animate-fade-in-up delay-300">
                <div className="w-full max-w-lg" style={{ width: '512px', height: '384px' }}>
                  <AiCard1 className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Nordea-style feature bands */}
        <section className="py-20 px-6 bg-[#0f172a]/40" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="features-heading" className="text-4xl lg:text-5xl font-bold text-white mb-6 heading-tight">
                Why Choose Cenvo?
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">Enterprise-grade AI solutions built for scale</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Sparkles, title: 'AI-Powered', desc: 'Leverage cutting-edge AI to create and optimize prompts with enterprise-grade security' },
                { icon: Zap, title: 'Lightning Fast', desc: 'Deploy and test prompts in seconds, not hours with our optimized infrastructure' },
                { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security for your AI workflows with 99.9% uptime guarantee' }
              ].map((feature, idx) => (
                <article 
                  key={idx}
                  className="bg-[#0f172a]/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-[#2563eb]/30 transition-all duration-300 hover-lift gpu-accelerated"
                >
                  <div className="w-16 h-16 bg-[#2563eb]/20 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                    <feature.icon className="h-8 w-8 text-[#2563eb]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 heading-tight">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6" aria-labelledby="how-it-works-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 id="how-it-works-heading" className="text-4xl lg:text-5xl font-bold text-white mb-6 heading-tight">
                How It Works
              </h2>
              <p className="text-xl text-slate-300">Get started in three simple steps</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { num: '1', title: 'Create Account', desc: 'Sign up for free and get instant access to our AI prompt marketplace' },
                { num: '2', title: 'Browse Prompts', desc: 'Explore thousands of high-quality prompts across various categories' },
                { num: '3', title: 'Start Building', desc: 'Download prompts and integrate them into your AI applications' }
              ].map((step, idx) => (
                <article key={idx} className="text-center">
                  <div 
                    className="w-20 h-20 bg-gradient-to-br from-[#2563eb] to-[#7c3aed] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl gpu-accelerated" 
                    aria-hidden="true"
                    style={{ width: '80px', height: '80px' }}
                  >
                    <span className="text-white font-bold text-2xl">{step.num}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 heading-tight">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 bg-[#0f172a]/40" aria-labelledby="testimonials-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 id="testimonials-heading" className="text-4xl lg:text-5xl font-bold text-white mb-6 heading-tight">
                What Our Users Say
              </h2>
              <p className="text-xl text-slate-300">Join thousands of satisfied customers</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'John Doe', role: 'AI Engineer', initials: 'JD', quote: 'Cenvo has revolutionized how we approach AI development. The quality of prompts is exceptional.' },
                { name: 'Sarah Miller', role: 'Product Manager', initials: 'SM', quote: 'The marketplace is incredibly diverse and the community support is outstanding.' },
                { name: 'Mike Rodriguez', role: 'CTO', initials: 'MR', quote: 'Best investment we\'ve made for our AI infrastructure. Highly recommend!' }
              ].map((testimonial, idx) => (
                <article 
                  key={idx}
                  className="bg-[#0f172a]/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-[#2563eb]/30 transition-all duration-300 hover-lift gpu-accelerated"
                >
                  <div className="flex items-center gap-1 mb-6" aria-label="5 star rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-slate-300 mb-8 leading-relaxed text-lg">{testimonial.quote}</blockquote>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 bg-gradient-to-br from-[#2563eb] to-[#7c3aed] rounded-full flex items-center justify-center" 
                      aria-hidden="true"
                      style={{ width: '48px', height: '48px' }}
                    >
                      <span className="text-white font-bold">{testimonial.initials}</span>
                    </div>
                    <div>
                      <cite className="text-white font-semibold not-italic">{testimonial.name}</cite>
                      <p className="text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 px-6" aria-labelledby="partners-heading">
          <div className="max-w-7xl mx-auto text-center">
            <h2 id="partners-heading" className="sr-only">Trusted Partners</h2>
            <p className="text-slate-400 mb-12 text-lg">Trusted by leading companies worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60" role="list">
              {['Microsoft', 'Meta', 'OpenAI', 'Google', 'Anthropic', 'Stripe'].map((company) => (
                <div key={company} className="text-white font-semibold text-xl" role="listitem">{company}</div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-[#0f172a]/60 to-[#1e293b]/40" aria-labelledby="cta-heading">
          <div className="max-w-5xl mx-auto text-center">
            <h2 id="cta-heading" className="text-4xl lg:text-5xl font-bold text-white mb-8 heading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl lg:text-2xl text-slate-300 mb-12 leading-relaxed">
              Join thousands of developers and businesses using Cenvo to power their AI applications
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/register" 
                className="bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover-lift text-lg focus-ring"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/pricing" 
                className="border border-slate-600 hover:border-slate-500 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 hover:bg-slate-800/30 text-lg focus-ring"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-slate-800/50 bg-[#0f172a]/60" role="contentinfo">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                  <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center" aria-hidden="true" style={{ width: '40px', height: '40px' }}>
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                  <span className="heading-tight">Cenvo</span>
                </div>
                <p className="text-slate-400 leading-relaxed">Power Generative AI With Your Data</p>
              </div>
              <nav aria-label="Product links">
                <h3 className="text-white font-semibold mb-6 text-lg">Product</h3>
                <ul className="space-y-4 text-slate-400">
                  <li><Link href="/pricing" className="hover:text-white transition-colors focus-ring rounded">Pricing</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors focus-ring rounded">Features</Link></li>
                  <li><Link href="/market" className="hover:text-white transition-colors focus-ring rounded">Marketplace</Link></li>
                </ul>
              </nav>
              <nav aria-label="Company links">
                <h3 className="text-white font-semibold mb-6 text-lg">Company</h3>
                <ul className="space-y-4 text-slate-400">
                  <li><Link href="/about" className="hover:text-white transition-colors focus-ring rounded">About</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors focus-ring rounded">Contact</Link></li>
                  <li><Link href="/careers" className="hover:text-white transition-colors focus-ring rounded">Careers</Link></li>
                </ul>
              </nav>
              <nav aria-label="Support links">
                <h3 className="text-white font-semibold mb-6 text-lg">Support</h3>
                <ul className="space-y-4 text-slate-400">
                  <li><Link href="/help" className="hover:text-white transition-colors focus-ring rounded">Help Center</Link></li>
                  <li><Link href="/docs" className="hover:text-white transition-colors focus-ring rounded">Documentation</Link></li>
                  <li><Link href="/community" className="hover:text-white transition-colors focus-ring rounded">Community</Link></li>
                </ul>
              </nav>
            </div>
            <div className="border-t border-slate-800/50 pt-8 text-center">
              <p className="text-slate-400">© 2025 Cenvo. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}