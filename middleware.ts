import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE_NAME, verifySessionToken } from './src/lib/session'

const LOGIN_PATH = '/admin/login'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === LOGIN_PATH) return NextResponse.next()

  const userId = await verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value)
  if (userId) return NextResponse.next()

  const loginUrl = new URL(LOGIN_PATH, request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
