// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 🚧 TEMPORARILY DISABLED FOR UI DEVELOPMENT 🚧
  // This allows you to freely navigate to /dashboard without being redirected to /app
  return NextResponse.next();
}

// Keep the config so Next.js knows which paths to run middleware on (even if it just passes through)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}