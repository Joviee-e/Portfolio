import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'portfolio_admin_session';

async function isValid(token) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return false;
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key);
    return payload?.role === 'admin';
  } catch {
    return false;
  }
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/private-dashboard/login') ||
    pathname.startsWith('/api/auth/login') ||
    pathname.startsWith('/api/resume') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  const protectedPath = pathname.startsWith('/private-dashboard') || pathname.startsWith('/api/dashboard');
  if (!protectedPath) return NextResponse.next();

  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await isValid(token))) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/private-dashboard/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/private-dashboard/:path*', '/api/dashboard/:path*'],
};
