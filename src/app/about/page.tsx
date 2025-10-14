import { Calendar, Users, Target, Award, ArrowRight, Rocket, Eye, Star } from 'lucide-react'
import Link from 'next/link'
import { TopNav } from '@/components/nav/TopNav'

export const metadata = {
  title: 'About - Cenvo',
  description: 'We\'re building the future of AI prompt creation, one innovation at a time.',
}

export default function AboutPage() {
  const timeline = [
    {
      year: '2023',
      title: 'The Vision',
      description: 'Founded with a mission to democratize AI prompt creation and make it accessible to everyone.',
      icon: Target
    },
    {
      year: '2024',
      title: 'Platform Launch',
      description: 'Launched the first version of Cenvo with basic prompt sharing and marketplace features.',
      icon: Users
    },
    {
      year: '2024',
      title: 'Community Growth',
      description: 'Reached 10,000+ active users and 50,000+ shared prompts across the platform.',
      icon: Award
    },
    {
      year: '2025',
      title: 'AI Integration',
      description: 'Integrated advanced AI features and launched enterprise solutions for large organizations.',
      icon: Calendar
    }
  ]

  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible with AI and prompt engineering.',
      icon: Rocket
    },
    {
      title: 'Community',
      description: 'Our users are at the heart of everything we do. We build for the community, by the community.',
      icon: Users
    },
    {
      title: 'Transparency',
      description: 'We believe in open communication and transparent practices in all our operations.',
      icon: Eye
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every feature, every interaction, and every user experience.',
      icon: Star
    }
  ]

  return (
    <div className="min-h-screen bg-[#030712]">
      <TopNav />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#f1f5f9] mb-6">
            About <span className="text-[#2563eb]">Cenvo</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            We're building the future of AI prompt creation, one innovation at a time.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#f1f5f9] mb-6">Our Mission</h2>
              <p className="text-lg text-slate-300 mb-6">
                At Cenvo, we believe that AI should be accessible to everyone. Our mission is to democratize 
                AI prompt creation by providing a platform where creators, developers, and businesses can 
                discover, create, and share high-quality prompts.
              </p>
              <p className="text-lg text-slate-300">
                We're not just building a marketplace – we're building a community that empowers the next 
                generation of AI creators to push the boundaries of what's possible.
              </p>
            </div>
            <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2563eb] mb-2">10K+</div>
                  <div className="text-slate-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2563eb] mb-2">50K+</div>
                  <div className="text-slate-400">Shared Prompts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2563eb] mb-2">99.9%</div>
                  <div className="text-slate-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2563eb] mb-2">24/7</div>
                  <div className="text-slate-400">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-[#0f172a]/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#2563eb] rounded-full flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[#2563eb] font-semibold text-lg mb-2">{item.year}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-300 text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#2563eb]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-[#2563eb]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#0f172a]/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Be part of the future of AI prompt creation. Start your journey with Cenvo today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Get Started Free
            </Link>
            <Link 
              href="/pricing" 
              className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}