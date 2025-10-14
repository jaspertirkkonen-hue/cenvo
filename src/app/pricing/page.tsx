import Link from 'next/link'
import { Check, Star, ArrowRight } from 'lucide-react'
import { TopNav } from '@/components/nav/TopNav'

export const metadata = {
  title: 'Pricing - Cenvo',
  description: 'Choose the plan that fits your needs. Upgrade or downgrade at any time.',
}

export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: '$9',
      period: '/month',
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 10 prompts',
        'Basic analytics',
        'Community support',
        'Standard templates',
        'API access'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For growing creators and small teams',
      features: [
        'Unlimited prompts',
        'Advanced analytics',
        'Priority support',
        'Premium templates',
        'Team collaboration',
        'Custom branding',
        'Advanced API'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment',
        'Advanced security',
        'Custom training'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-[#030712]">
      <TopNav />
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#f1f5f9] mb-6">
            Simple, Transparent <span className="text-[#2563eb]">Pricing</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative bg-[#0f172a]/50 backdrop-blur-sm border rounded-2xl p-8 ${
                plan.popular 
                  ? 'border-[#2563eb] ring-2 ring-[#2563eb]/20' 
                  : 'border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#2563eb] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={16} />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#2563eb] flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`w-full block text-center font-semibold py-3 px-6 rounded-lg transition-colors ${
                  plan.popular
                    ? 'bg-[#2563eb] hover:bg-blue-700 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Can I change plans anytime?</h3>
              <p className="text-slate-400">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Is there a free trial?</h3>
              <p className="text-slate-400">Yes, we offer a 14-day free trial for all plans. No credit card required.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-slate-400">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Do you offer refunds?</h3>
              <p className="text-slate-400">Yes, we offer a 30-day money-back guarantee for all plans.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-slate-300 mb-8">Contact our sales team for personalized assistance</p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Contact Sales
            <ArrowRight size={20} />
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}