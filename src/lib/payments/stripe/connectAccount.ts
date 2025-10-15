import { getStripeClient } from './stripeClient'

export async function createConnectOnboardingLink(params: { userId: string; email?: string }) {
  // Placeholder stub for Stripe Connect Express onboarding
  const stripe = getStripeClient()
  // Return mock URL for now
  return {
    url: 'https://dashboard.stripe.com/test/onboarding/mock',
    createdAt: new Date().toISOString(),
  }
}


