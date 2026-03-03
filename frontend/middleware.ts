import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Handle /dashboard redirect based on role
    if (path === '/dashboard') {
      if (token.role === 'INFLUENCER') {
        return NextResponse.redirect(new URL('/influencer/dashboard', req.url))
      }
      if (token.role === 'BRAND') {
        return NextResponse.redirect(new URL('/brand/dashboard', req.url))
      }
    }

    // Redirect to onboarding if user hasn't completed it
    if (path.startsWith('/influencer/dashboard') || path.startsWith('/brand/dashboard')) {
      if (!token.role) {
        return NextResponse.redirect(new URL('/onboarding', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/influencer/:path*', '/brand/:path*', '/onboarding'],
}
