import { NextResponse } from 'next/server'

export async function GET() {
  // Supabase handles cookie setting via redirect; just bounce to overview
  return NextResponse.redirect(new URL('/overview', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
}

