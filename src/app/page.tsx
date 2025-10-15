import HomePageClient from './HomePageClient'

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

export default function HomePage() {
  return <HomePageClient />
}