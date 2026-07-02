import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`)
  }

  const cookieStore = await cookies()
  
  // 1. We create the Redirect object FIRST
  const response = NextResponse.redirect(`${origin}${next}`)

  // 2. We build a custom Supabase client just for this route
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          // 3. THE MAGIC FIX: We staple the cookies directly onto the response object
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set({ name, value, ...options })
          })
        },
      }
    }
  )

  // 4. We trigger the exchange. When this runs, it fires the setAll function above!
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  
  if (error) {
    console.error('🚨 Session Error:', error.message)
    return NextResponse.redirect(`${origin}/login?error=session_error`)
  }

  // 5. Send the response with the cookies permanently attached
  return response
}