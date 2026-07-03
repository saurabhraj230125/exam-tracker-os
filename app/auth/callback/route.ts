import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // 1. Grab the exact URL the user just landed on
  const requestUrl = new URL(request.url);
  
  // 2. Extract the secret "code" Supabase sent back from Google
  const code = requestUrl.searchParams.get('code');
  
  // 3. Where should we send them? Default to the dashboard!
  const next = requestUrl.searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    // 4. Exchange the code for a secure session cookie
    await supabase.auth.exchangeCodeForSession(code);
  }

  // 5. Instantly teleport them to the Dashboard
  return NextResponse.redirect(new URL(next, request.url));
}