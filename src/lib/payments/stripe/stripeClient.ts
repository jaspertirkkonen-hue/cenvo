import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

export function getStripeClient(): Stripe {
  if (stripeInstance) return stripeInstance
  const apiKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder'
  stripeInstance = new Stripe(apiKey, {
    apiVersion: '2024-06-20',
    typescript: true,
  })
  return stripeInstance
}


