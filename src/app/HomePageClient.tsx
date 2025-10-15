'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Zap, Shield, CheckCircle, Users, Star, Brain, Rocket, Globe } from 'lucide-react'
import dynamicImport from 'next/dynamic'
import { motion } from 'framer-motion'
import { MotionCard } from '@/components/MotionCard'
import { MotionButton } from '@/components/MotionButton'
import { MotionHeading, MotionText } from '@/components/MotionText'
import { getHeroImage } from '@/lib/utils/unsplash'

// Dynamic imports for performance
const MeshBG = dynamicImport(() => import('@/components/graphics/MeshBG'), {
  loading: () => <div className="w-full h-full bg-cosmic-900/20" />,
  ssr: false
})

const AiCard1 = dynamicImport(() => import('@/components/graphics/AiCard1'), {
  loading: () => <div className="w-full h-full bg-cosmic-900/20 animate-pulse" />,
  ssr: false
})

export default function HomePageClient() {
  return (
    <>
      <div className="min-h-screen bg-cosmic-950 bg-celestial-pattern">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <MeshBG />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <MotionHeading 
                level={1}
                className="text-6xl md:text-8xl font-bold mb-6 gradient-text"
                delay={0.2}
              >
                Cenvo
              </MotionHeading>
              <MotionText 
                className="text-xl md:text-2xl text-cosmic-300 mb-8 max-w-3xl mx-auto"
                delay={0.4}
              >
                The ultimate marketplace for AI prompts. Buy, sell, and discover powerful prompts that unlock the full potential of generative AI.
              </MotionText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <MotionButton
                size="lg"
                className="bg-gradient-celestial hover:shadow-celestial-strong text-white px-8 py-4 text-lg font-semibold"
                delay={0.8}
              >
                <span>Explore Marketplace</span>
                <ArrowRight className="ml-2" size={20} />
              </MotionButton>
              <MotionButton
                variant="ghost"
                size="lg"
                className="border-celestial-500 text-celestial-400 hover:bg-celestial-500/10 px-8 py-4 text-lg font-semibold"
                delay={1.0}
              >
                <span>Start Selling</span>
                <Sparkles className="ml-2" size={20} />
              </MotionButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="bg-cosmic-900/30 backdrop-blur-xl rounded-3xl p-8 border border-cosmic-700/50 shadow-2xl">
                <AiCard1 />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-cosmic-900/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-16"
            >
              <MotionHeading 
                level={2}
                className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
                delay={0.2}
              >
                Why Choose Cenvo?
              </MotionHeading>
              <MotionText 
                className="text-xl text-cosmic-300 max-w-3xl mx-auto"
                delay={0.4}
              >
                Join thousands of creators and businesses leveraging AI prompts to achieve extraordinary results.
              </MotionText>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Brain, title: 'AI-Powered', desc: 'Leverage cutting-edge AI to create and optimize prompts with enterprise-grade security', color: 'from-celestial-500 to-celestial-600' },
                { icon: Users, title: 'Community Driven', desc: 'Join a thriving community of creators, developers, and AI enthusiasts sharing knowledge', color: 'from-purple-500 to-pink-500' },
                { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security with encrypted transactions and verified creator profiles', color: 'from-green-500 to-emerald-500' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true, margin: '-50px' }}
                  className="group"
                >
                  <MotionCard className="h-full p-8 text-center bg-cosmic-900/40 backdrop-blur-xl border-cosmic-700/50 hover:border-cosmic-600/50 transition-all duration-300">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-celestial group-hover:shadow-celestial-strong transition-all duration-300`} aria-hidden="true">
                      <span className="text-white text-2xl">⚡</span>
                    </div>
                    <h3 className="text-2xl font-bold text-cosmic-100 mb-4">{feature.title}</h3>
                    <p className="text-cosmic-400 leading-relaxed">{feature.desc}</p>
                  </MotionCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-16"
            >
              <MotionHeading 
                level={2}
                className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
                delay={0.2}
              >
                How It Works
              </MotionHeading>
              <MotionText 
                className="text-xl text-cosmic-300 max-w-3xl mx-auto"
                delay={0.4}
              >
                Get started in minutes and begin creating, selling, or buying AI prompts.
              </MotionText>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { num: 1, title: 'Browse & Discover', desc: 'Explore thousands of high-quality prompts across categories like writing, coding, marketing, and more.' },
                { num: 2, title: 'Purchase & Download', desc: 'Buy prompts instantly with secure payments. Download and start using them in your AI tools immediately.' },
                { num: 3, title: 'Create & Sell', desc: 'Upload your own prompts, set your price, and earn money from your AI expertise and creativity.' }
              ].map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true, margin: '-50px' }}
                  className="text-center group"
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
                  
                  <h3 className="text-2xl font-bold text-cosmic-100 mb-4">{step.title}</h3>
                  <p className="text-cosmic-400 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-6 bg-cosmic-900/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-16"
            >
              <MotionHeading 
                level={2}
                className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
                delay={0.2}
              >
                Loved by Creators
              </MotionHeading>
              <MotionText 
                className="text-xl text-cosmic-300 max-w-3xl mx-auto"
                delay={0.4}
              >
                See what our community has to say about their Cenvo experience.
              </MotionText>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Sarah Chen', role: 'Content Creator', quote: '"Cenvo has revolutionized how I approach content creation. The prompts are incredibly effective and save me hours of work."', rating: 5 },
                { name: 'Marcus Johnson', role: 'Developer', quote: '"The coding prompts have been a game-changer for my projects. High-quality, well-tested, and immediately usable."', rating: 5 },
                { name: 'Emily Rodriguez', role: 'Marketing Manager', quote: '"Our marketing campaigns have never been more effective. The strategic prompts from Cenvo deliver exceptional results."', rating: 5 }
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <MotionCard className="p-8 bg-cosmic-900/40 backdrop-blur-xl border-cosmic-700/50">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-cosmic-300 mb-6 italic">
                      {testimonial.quote}
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-celestial rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-cosmic-100">{testimonial.name}</p>
                        <p className="text-cosmic-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </MotionCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <MotionHeading 
                level={2}
                className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
                delay={0.2}
              >
                Ready to Get Started?
              </MotionHeading>
              <MotionText 
                className="text-xl text-cosmic-300 mb-8"
                delay={0.4}
              >
                Join thousands of creators and businesses already using Cenvo to unlock the power of AI.
              </MotionText>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true, margin: '-50px' }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <MotionButton
                  size="lg"
                  className="bg-gradient-celestial hover:shadow-celestial-strong text-white px-8 py-4 text-lg font-semibold"
                  delay={0.8}
                >
                  <Link href="/register" className="flex items-center">
                    <span>Get Started Free</span>
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </MotionButton>
                <MotionButton
                  variant="ghost"
                  size="lg"
                  className="border-celestial-500 text-celestial-400 hover:bg-celestial-500/10 px-8 py-4 text-lg font-semibold"
                  delay={1.0}
                >
                  <Link href="/market" className="flex items-center">
                    <span>Browse Marketplace</span>
                    <Globe className="ml-2" size={20} />
                  </Link>
                </MotionButton>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
