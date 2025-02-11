import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware'

export default async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Public routes
  const publicRoutes = ['/', '/auth/login', '/api/auth']
  if (publicRoutes.includes(pathname) || pathname.includes('_next')) {
    return NextResponse.next()
  }

  // Protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Admin routes
  if (pathname.startsWith('/admin') && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Prevent admin from accessing user dashboard
  if (pathname.startsWith('/dashboard') && token.role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}