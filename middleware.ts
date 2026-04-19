import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Completely block all development routes (UI and API) in production/staging environments
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dev/:path*',
    '/api/dev/:path*'
  ],
};
