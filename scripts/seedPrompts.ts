import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mtaktjphgnamasbwlqqe.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function seedPrompts() {
  console.log('🌱 Starting Cenvo prompt seeding (using service key)...')

  const prompts = [
    // 🧠 Business
    {
      title: "Startup Idea Generator",
      description: "Get 5 unique, data-driven startup ideas with target market, revenue model and USP.",
      template: "Generate 5 startup ideas in the {industry} sector, each with a unique value proposition, monetization model, and estimated TAM.",
      price: 9,
      category: "Business",
      image_url: "https://cdn.cenvo.io/placeholders/business1.jpg",
      verified: true,
    },
    {
      title: "Investor Email Composer",
      description: "Write professional investor outreach emails that actually get replies.",
      template: "Compose a short, persuasive email to attract potential investors for a {startup type}. Keep it under 180 words and include a strong CTA.",
      price: 5,
      category: "Business",
      image_url: "https://cdn.cenvo.io/placeholders/business2.jpg",
      verified: true,
    },

    // 🎨 Design
    {
      title: "Logo Moodboard Creator",
      description: "Generate AI-powered moodboard briefs for logo designers.",
      template: "Create a detailed creative brief for a logo design for {brand name}, including moodboard keywords, typography style, and color palette.",
      price: 7,
      category: "Design",
      image_url: "https://cdn.cenvo.io/placeholders/design1.jpg",
      verified: true,
    },
    {
      title: "Brand Story Writer",
      description: "Turn brand concepts into compelling emotional stories with 3 tagline options.",
      template: "Write a short, emotional brand story for {brand}, focusing on mission and customer connection. Add 3 tagline ideas.",
      price: 5,
      category: "Design",
      image_url: "https://cdn.cenvo.io/placeholders/design2.jpg",
      verified: true,
    },

    // 📈 Finance
    {
      title: "Stock Analyzer Pro",
      description: "AI analyzes any stock and predicts near-term momentum.",
      template: "Analyze {ticker} and provide: key ratios, momentum indicators, and 1–3 month outlook.",
      price: 12,
      category: "Finance",
      image_url: "https://cdn.cenvo.io/placeholders/finance1.jpg",
      verified: true,
    },
    {
      title: "Crypto Market Sentiment",
      description: "Real-time crypto sentiment and trend summary.",
      template: "Summarize today’s crypto sentiment for {coin name}, using social and price data. Conclude with bullish/bearish.",
      price: 8,
      category: "Finance",
      image_url: "https://cdn.cenvo.io/placeholders/finance2.jpg",
      verified: true,
    },

    // 📸 Marketing
    {
      title: "Viral Hook Generator",
      description: "Create viral social media openings for any niche.",
      template: "Generate 5 viral hooks for {topic}, each under 10 words, emotional, curiosity-based.",
      price: 6,
      category: "Marketing",
      image_url: "https://cdn.cenvo.io/placeholders/marketing1.jpg",
      verified: true,
    },
    {
      title: "Ad Copy Optimizer",
      description: "Improve ad copy for higher CTR.",
      template: "Rewrite this ad copy: {original text}. Optimize for click-through and urgency. Return 3 ranked versions.",
      price: 7,
      category: "Marketing",
      image_url: "https://cdn.cenvo.io/placeholders/marketing2.jpg",
      verified: true,
    },

    // 🧘 Lifestyle
    {
      title: "Morning Routine Optimizer",
      description: "AI-designed morning habits to boost energy & focus.",
      template: "Design a 1-hour optimized morning routine for a {profession}, balancing productivity and health.",
      price: 5,
      category: "Lifestyle",
      image_url: "https://cdn.cenvo.io/placeholders/lifestyle1.jpg",
      verified: true,
    },
    {
      title: "Life Audit Coach",
      description: "Deep self-reflection and goal alignment assistant.",
      template: "Ask 7 powerful questions to identify life blockers and create a 7-day action plan.",
      price: 8,
      category: "Lifestyle",
      image_url: "https://cdn.cenvo.io/placeholders/lifestyle2.jpg",
      verified: true,
    },

    // 🎬 Content
    {
      title: "YouTube Script Architect",
      description: "Generate full 3-act YouTube scripts for viral content.",
      template: "Write a YouTube script about {topic} using Hook–Value–Payoff structure with timestamps.",
      price: 10,
      category: "Content",
      image_url: "https://cdn.cenvo.io/placeholders/content1.jpg",
      verified: true,
    },
    {
      title: "TikTok Idea Machine",
      description: "5 trending TikTok video ideas per niche.",
      template: "List 5 viral TikTok ideas for {niche}, with hook, visual idea, and sound suggestion.",
      price: 6,
      category: "Content",
      image_url: "https://cdn.cenvo.io/placeholders/content2.jpg",
      verified: true,
    },
  ]

  try {
    const { error } = await supabase.from('prompts').insert(prompts)

    if (error) {
      console.error('❌ Insert failed:', error.message)
    } else {
      console.log(`✅ Successfully inserted ${prompts.length} prompts into Supabase.`)
    }
  } catch (err: any) {
    console.error('💥 Unexpected error while seeding:', err.message)
  }
}

seedPrompts()


