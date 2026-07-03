import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // Default to dashboard if no 'next' parameter is found
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    // FIX: Added 'await' here because Next.js made cookies asynchronous!
    const cookieStore = await cookies();
    
    // We build a custom client right here to absolutely guarantee cookie writing permissions
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch (error) {
              // Ignore error if called from a Server Component
            }
          },
        },
      }
    );

    // Exchange the Google code for a secure session cookie
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error("Auth Callback Error:", error.message);
      // If it fails, send them back to login with an error flag
      return NextResponse.redirect(`${origin}/login?error=auth-failed`);
    }
  }

  // Teleport the user to the dashboard
  return NextResponse.redirect(`${origin}${next}`);
}