import { NextRequest, NextResponse } from 'next/server'
import verifyToken from './utils/verify-token'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('dogs@token')?.value
  const isAuthenticated = token ? await verifyToken(token) : false

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/conta')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (isAuthenticated && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/conta', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/conta/:path*', '/login/:path*'],
}
