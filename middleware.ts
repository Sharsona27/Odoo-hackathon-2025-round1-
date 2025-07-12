import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/messages',
];

// Routes that are only accessible to non-authenticated users
const authRoutes = [
  '/auth/login',
  '/auth/register',
];

// Routes that are only accessible to admin users
const adminRoutes = [
  '/admin',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the token from the request
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  // Check if the user is authenticated
  const isAuthenticated = !!token;
  
  // Check if the user is an admin
  const isAdmin = token?.isAdmin === true;
  
  // Redirect authenticated users away from auth routes
  if (isAuthenticated && authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Redirect non-authenticated users away from protected routes
  if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // Redirect non-admin users away from admin routes
  if ((!isAuthenticated || !isAdmin) && adminRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\.png$|.*\.svg$).*)',
  ],
};