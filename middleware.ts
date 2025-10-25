import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminPath = '/admin';
  if (request.nextUrl.pathname.startsWith(adminPath)) {
    const auth = request.cookies.get('admin_auth')?.value;
    const password = process.env.ADMIN_PASSWORD;
    if (auth !== password) {
      const loginUrl = new URL('/admin-login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
