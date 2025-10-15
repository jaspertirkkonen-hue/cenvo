import { NextRequest } from 'next/server'
import { getOpenAI } from '@/lib/openai'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY missing' }), { status: 503 })
  }
  try {
    const { prompt, input, language } = await req.json()

    const sys = `You are an AI that previews the expected output of a paid prompt. 
    Be concise, safe, and avoid any disallowed content. Provide a convincing, realistic preview 
    that showcases the prompt’s value. If input is missing, synthesize a plausible one. 
    Respond in ${language || 'English'}.`

    const messages = [
      { role: 'system', content: sys },
      { role: 'user', content: `PROMPT TEMPLATE:\n${prompt}\n\nUSER INPUT:\n${input || 'N/A'}` },
    ] as const

    const openai = getOpenAI()
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as any,
      temperature: 0.7,
    })

    return new Response(
      JSON.stringify({ preview: completion.choices?.[0]?.message?.content ?? '' }),
      { status: 200 }
    )
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'preview_failed' }), { status: 500 })
  }
}


