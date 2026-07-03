import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. Check if the user has a valid secure badge (cookie)
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Grab the exact URL they are trying to visit
  const url = request.nextUrl.clone()

  // 🛡️ RULE 1: If they ARE logged in, and try to look at the /login page...
  // INSTANTLY teleport them to the /dashboard. No flashes, no loading screens.
  if (user && url.pathname.startsWith('/login')) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // 🛡️ RULE 2: If they are NOT logged in, and try to sneak into the /dashboard...
  // INSTANTLY kick them back to the /login page.
  if (!user && url.pathname.startsWith('/dashboard')) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}