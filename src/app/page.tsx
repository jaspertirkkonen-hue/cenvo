import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Zap, Shield, CheckCircle, Users, Star, Brain, Rocket, Globe } from 'lucide-react'
import dynamicImport from 'next/dynamic'
import { motion } from 'framer-motion'
import { MotionCard } from '@/components/MotionCard'
import { MotionButton } from '@/components/MotionButton'
import { MotionHeading, MotionText } from '@/components/MotionText'
import { getHeroImage } from '@/lib/utils/unsplash'

export const runtime = 'nodejs'

// Dynamic imports for performance
const MeshBG = dynamicImport(() => import('@/components/graphics/MeshBG'), {
  loading: () => <div className="w-full h-full bg-cosmic-900/20" />,
  ssr: false
})

const AiCard1 = dynamicImport(() => import('@/components/graphics/AiCard1'), {
  loading: () => <div className="w-full h-full bg-cosmic-900/20 animate-pulse" />,
  ssr: false
})

export const metadata = {
  title: 'Cenvo – AI Prompt Marketplace',
  description: 'Buy and sell high-quality AI prompts. Power your generative AI applications with the best data.',
  openGraph: {
    title: 'Cenvo – AI Prompt Marketplace',
    description: 'Buy and sell high-quality AI prompts. Power Generative AI With Your Data.',
    type: 'website',
    url: 'https://cenvo.io',
  },
}

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-cosmic-950 bg-celestial-pattern">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-celestial-500/10 rounded-full blur-3xl float-animation" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-celestial-600/10 rounded-full blur-3xl float-animation-delayed" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-30">
              <MeshBG className="w-full h-full" />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <MotionHeading level={1} variant="gradient" delay={0.2}>
                  Power Generative AI With Your Data
                </MotionHeading>
                
                <MotionText 
                  variant="glow" 
                  className="text-xl lg:text-2xl text-cosmic-300 leading-relaxed max-w-2xl"
                  delay={0.4}
                  stagger={0.05}
                >
                  Make the best models with the best data. Cenvo leverages your enterprise data, 
                  and with our Generative AI Platform, safely unlocks the value of AI.
                </MotionText>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <MotionButton 
                    variant="primary" 
                    size="lg" 
                    delay={0.6}
                    className="group"
                  >
                    <Link href="/login" className="flex items-center gap-2">
                      <ArrowRight size={20} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
                      Login to Dashboard
                    </Link>
                  </MotionButton>
                  
                  <MotionButton 
                    variant="secondary" 
                    size="lg" 
                    delay={0.7}
                  >
                    <Link href="/market" className="flex items-center gap-2">
                      Browse Marketplace
                    </Link>
                  </MotionButton>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end">
                <MotionCard 
                  variant="neon" 
                  delay={0.8}
                  className="w-full max-w-lg p-8"
                >
                  <div className="w-full h-80 relative overflow-hidden rounded-xl">
                    <Image 
                      src={getHeroImage('marketplace')}
                      alt="AI Marketplace Hero"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    {/* Overlay glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-celestial-500/20 via-transparent to-celestial-600/20" />
                  </div>
                </MotionCard>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 relative" aria-labelledby="features-heading">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-900/20 to-transparent" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <MotionHeading level={2} variant="gradient" className="mb-6">
                Why Choose Cenvo?
              </MotionHeading>
              <MotionText 
                variant="glow" 
                className="text-xl text-cosmic-300 max-w-3xl mx-auto"
                delay={0.2}
              >
                Enterprise-grade AI solutions built for scale
              </MotionText>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Brain, title: 'AI-Powered', desc: 'Leverage cutting-edge AI to create and optimize prompts with enterprise-grade security', color: 'from-celestial-500 to-celestial-600' },
                { icon: Zap, title: 'Lightning Fast', desc: 'Deploy and test prompts in seconds, not hours with our optimized infrastructure', color: 'from-celestial-400 to-celestial-500' },
                { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security for your AI workflows with 99.9% uptime guarantee', color: 'from-celestial-600 to-celestial-700' }
              ].map((feature, idx) => (
                <MotionCard
                  key={idx}
                  variant="glass"
                  delay={0.4 + idx * 0.1}
                  className="p-8 text-center group"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-celestial group-hover:shadow-celestial-strong transition-all duration-300`} aria-hidden="true">
                    <span className="text-white text-2xl">⚡</span>
                  </div>
                  <h3 className="text-2xl font-bold text-cosmic-100 mb-4 heading-tight">{feature.title}</h3>
                  <p className="text-cosmic-400 leading-relaxed">{feature.desc}</p>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-celestial-500/5 via-transparent to-celestial-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </MotionCard>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 relative" aria-labelledby="how-it-works-heading">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-900/10 to-transparent" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <MotionHeading level={2} variant="gradient" className="mb-6">
                How It Works
              </MotionHeading>
              <MotionText 
                variant="glow" 
                className="text-xl text-cosmic-300"
                delay={0.2}
              >
                Get started in three simple steps
              </MotionText>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { num: '1', title: 'Create Account', desc: 'Sign up for free and get instant access to our AI prompt marketplace', icon: Rocket },
                { num: '2', title: 'Browse Prompts', desc: 'Explore thousands of high-quality prompts across various categories', icon: Globe },
                { num: '3', title: 'Start Building', desc: 'Download prompts and integrate them into your AI applications', icon: Sparkles }
              ].map((step, idx) => (
                <motion.article 
                  key={idx} 
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.2 }}
                >
                  <motion.div 
                    className="w-24 h-24 bg-gradient-celestial rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-celestial group-hover:shadow-celestial-strong transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="text-white text-xl z-10">🚀</span>
                    <span className="absolute top-2 right-2 text-white font-bold text-sm bg-white/20 rounded-full w-6 h-6 flex items-center justify-center">{step.num}</span>
                    
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-cosmic-100 mb-4 heading-tight">{step.title}</h3>
                  <p className="text-cosmic-400 leading-relaxed text-lg">{step.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 relative" aria-labelledby="testimonials-heading">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-900/30 to-transparent" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <MotionHeading level={2} variant="gradient" className="mb-6">
                What Our Users Say
              </MotionHeading>
              <MotionText 
                variant="glow" 
                className="text-xl text-cosmic-300"
                delay={0.2}
              >
                Join thousands of satisfied customers
              </MotionText>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'John Doe', role: 'AI Engineer', initials: 'JD', quote: 'Cenvo has revolutionized how we approach AI development. The quality of prompts is exceptional.', color: 'from-celestial-500 to-celestial-600' },
                { name: 'Sarah Miller', role: 'Product Manager', initials: 'SM', quote: 'The marketplace is incredibly diverse and the community support is outstanding.', color: 'from-celestial-400 to-celestial-500' },
                { name: 'Mike Rodriguez', role: 'CTO', initials: 'MR', quote: 'Best investment we\'ve made for our AI infrastructure. Highly recommend!', color: 'from-celestial-600 to-celestial-700' }
              ].map((testimonial, idx) => (
                <MotionCard
                  key={idx}
                  variant="glass"
                  delay={0.4 + idx * 0.1}
                  className="p-8 group"
                >
                  <div className="flex items-center gap-1 mb-6" aria-label="5 star rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  
                  <blockquote className="text-cosmic-300 mb-8 leading-relaxed text-lg relative">
                    <span className="text-4xl text-celestial-500/50 absolute -top-2 -left-2">&ldquo;</span>
                    {testimonial.quote}
                    <span className="text-4xl text-celestial-500/50 absolute -bottom-4 -right-2">&rdquo;</span>
                  </blockquote>
                  
                  <div className="flex items-center gap-4">
                    <div 
                      className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center shadow-celestial group-hover:shadow-celestial-strong transition-all duration-300`}
                      aria-hidden="true"
                    >
                      <span className="text-white font-bold">{testimonial.initials}</span>
                    </div>
                    <div>
                      <cite className="text-cosmic-100 font-semibold not-italic">{testimonial.name}</cite>
                      <p className="text-cosmic-400">{testimonial.role}</p>
                    </div>
                  </div>
                </MotionCard>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 px-6" aria-labelledby="partners-heading">
          <div className="max-w-7xl mx-auto text-center">
            <h2 id="partners-heading" className="sr-only">Trusted Partners</h2>
            <motion.p 
              className="text-cosmic-400 mb-12 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Trusted by leading companies worldwide
            </motion.p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60" role="list">
              {['Microsoft', 'Meta', 'OpenAI', 'Google', 'Anthropic', 'Stripe'].map((company, idx) => (
                <motion.div 
                  key={company} 
                  className="text-cosmic-200 font-semibold text-xl hover:text-celestial-400 transition-colors duration-300" 
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 relative" aria-labelledby="cta-heading">
          <div className="absolute inset-0 bg-gradient-to-r from-cosmic-900/60 via-cosmic-800/40 to-cosmic-900/60" />
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <MotionHeading level={2} variant="gradient" className="mb-8">
              Ready to Get Started?
            </MotionHeading>
            
            <MotionText 
              variant="glow" 
              className="text-xl lg:text-2xl text-cosmic-300 mb-12 leading-relaxed"
              delay={0.2}
            >
              Join thousands of developers and businesses using Cenvo to power their AI applications
            </MotionText>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <MotionButton 
                variant="primary" 
                size="lg" 
                delay={0.4}
              >
                <Link href="/login">
                  Get Started Now
                </Link>
              </MotionButton>
              
              <MotionButton 
                variant="secondary" 
                size="lg" 
                delay={0.5}
              >
                <Link href="/market">
                  Explore Marketplace
                </Link>
              </MotionButton>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-cosmic-700/30 bg-cosmic-900/40 backdrop-blur-sm" role="contentinfo">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-1">
                <motion.div 
                  className="flex items-center gap-3 text-2xl font-bold text-cosmic-100 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="w-10 h-10 bg-gradient-celestial rounded-xl flex items-center justify-center shadow-celestial" aria-hidden="true">
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                  <span className="heading-tight gradient-celestial">Cenvo</span>
                </motion.div>
                <motion.p 
                  className="text-cosmic-400 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Power Generative AI With Your Data
                </motion.p>
              </div>
              
              <motion.nav 
                aria-label="Product links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-cosmic-100 font-semibold mb-6 text-lg">Product</h3>
                <ul className="space-y-4 text-cosmic-400">
                  <li><Link href="/market" className="hover:text-celestial-400 transition-colors focus-celestial rounded">Marketplace</Link></li>
                  <li><Link href="/about" className="hover:text-celestial-400 transition-colors focus-celestial rounded">About</Link></li>
                  <li><Link href="/login" className="hover:text-celestial-400 transition-colors focus-celestial rounded">Login</Link></li>
                </ul>
              </motion.nav>
              
              <motion.nav 
                aria-label="Company links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-cosmic-100 font-semibold mb-6 text-lg">Company</h3>
                <ul className="space-y-4 text-cosmic-400">
                  <li><Link href="/about" className="hover:text-celestial-400 transition-colors focus-celestial rounded">About</Link></li>
                  <li><Link href="/contact" className="hover:text-celestial-400 transition-colors focus-celestial rounded">Contact</Link></li>
                  <li><Link href="/careers" className="hover:text-celestial-400 transition-colors focus-celestial rounded">Careers</Link></li>
                </ul>
              </motion.nav>
              
              <motion.nav 
                aria-label="Support links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-cosmic-100 font-semibold mb-6 text-lg">Support</h3>
                <ul className="space-y-4 text-cosmic-400">
                  <li><Link href="/help" className="hover:text-celestial-400 transition-colors focus-celestial rounded">Help Center</Link></li>
                  <li><Link href="/docs" className="hover:text-celestial-400 transition-colors focus-celestial rounded">Documentation</Link></li>
                  <li><Link href="/community" className="hover:text-celestial-400 transition-colors focus-celestial rounded">Community</Link></li>
                </ul>
              </motion.nav>
            </div>
            
            <motion.div 
              className="border-t border-cosmic-700/30 pt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-cosmic-400">© 2025 Cenvo. All rights reserved.</p>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  )
}