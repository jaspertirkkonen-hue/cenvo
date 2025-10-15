import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import fs from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

async function generatePromptImages() {
  console.log('🎨 Cenvo AI Image Generator started...')

  const { data: prompts, error } = await supabase
    .from('prompts')
    .select('id, title, description, image_url')

  if (error) throw new Error('❌ Failed to load prompts: ' + error.message)

  for (const prompt of prompts || []) {
    if (prompt.image_url && !prompt.image_url.includes('placeholder')) {
      console.log(`✅ ${prompt.title} already has an image, skipping.`)
      continue
    }

    try {
      console.log(`🖼️ Generating image for: ${prompt.title}`)

      const result = await openai.images.generate({
        model: 'gpt-image-1',
        prompt: `Cinematic, professional product-style concept illustration representing: "${prompt.title}". ${prompt.description}. Futuristic, elegant, high-quality.`,
        size: '1024x1024'
      })

      const imageData = result?.data?.[0]?.b64_json
      if (!imageData) {
        console.error(`⚠️ No image returned for ${prompt.title}`)
        continue
      }

      const buffer = Buffer.from(imageData, 'base64')
      const filePath = `public/prompts/${prompt.id}.png`

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, buffer, {
          contentType: 'image/png',
          upsert: true,
        })

      if (uploadError) {
        console.error(`❌ Upload failed for ${prompt.title}:`, uploadError.message)
        continue
      }

      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!.replace('.co', '.in')}/storage/v1/object/public/${filePath}`

      const { error: updateError } = await supabase
        .from('prompts')
        .update({ image_url: publicUrl })
        .eq('id', prompt.id)

      if (updateError) {
        console.error(`⚠️ Failed to update ${prompt.title}:`, updateError.message)
      } else {
        console.log(`✅ Image generated and updated for: ${prompt.title}`)
      }

    } catch (err: any) {
      console.error(`💥 Error while processing ${prompt.title}:`, err.message)
    }
  }

  console.log('🏁 All missing images generated successfully.')
}

generatePromptImages()


