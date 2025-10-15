import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/serverClient'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    let response = NextResponse.redirect(`${requestUrl.origin}/overview`)
    
        const supabase = supabaseServer()

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return response
    }
  }

  // If there's an error or no code, redirect to login
  return NextResponse.redirect(`${requestUrl.origin}/login`)
}