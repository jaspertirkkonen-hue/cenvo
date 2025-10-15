import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import fs from 'fs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

async function generateImages() {
  console.log('🎨 Generating missing prompt images...')
  const { data: prompts, error } = await supabase.from('prompts').select('id, title, description, image_url')

  if (error) throw error

  for (const p of prompts || []) {
    if (!p.image_url || p.image_url.includes('placeholder')) {
      const promptText = `High quality, cinematic product photo style image representing: ${p.title}. ${p.description}`
      console.log(`🖼️ Generating image for: ${p.title}`)

      const result = await openai.images.generate({
        model: 'gpt-image-1',
        prompt: promptText,
        size: '1024x1024',
      })

      const base64Image = (result as any).data[0].b64_json as string
      const buffer = Buffer.from(base64Image, 'base64')
      const fileName = `prompts/${p.id}.png`

      const { error: uploadError } = await supabase.storage.from('public').upload(fileName, buffer, {
        contentType: 'image/png',
        upsert: true,
      })
      if (uploadError) {
        console.error(`❌ Upload failed for ${p.title}:`, uploadError.message)
        continue
      }

      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!.replace('.co', '.in')}/storage/v1/object/public/${fileName}`

      const { error: updateError } = await supabase
        .from('prompts')
        .update({ image_url: publicUrl })
        .eq('id', p.id)

      if (updateError) console.error(`⚠️ Failed to update ${p.title}:`, updateError.message)
      else console.log(`✅ Updated image for ${p.title}`)
    }
  }

  console.log('🏁 All missing images generated.')
}

generateImages()


