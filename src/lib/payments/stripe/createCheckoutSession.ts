import { getStripeClient } from './stripeClient'

export async function createCheckoutSession(params: { promptId: number; price: number; buyerId: string }) {
  // Mocked response until real integration
  const stripe = getStripeClient()
  return {
    id: 'cs_test_mock',
    url: '/checkout/mocked',
  }
}


