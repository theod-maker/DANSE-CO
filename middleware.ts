import { NextResponse, type NextRequest } from 'next/server'
import { sessionCookieName, verifySessionToken } from './src/lib/session'

const LOGIN_PATH = '/admin/login'
const INVITATION_PATH_PREFIX = '/admin/invitation/'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === LOGIN_PATH || pathname.startsWith(INVITATION_PATH_PREFIX)) {
    return NextResponse.next()
  }

  const userId = await verifySessionToken(request.cookies.get(sessionCookieName())?.value)
  if (userId) return NextResponse.next()

  const loginUrl = new URL(LOGIN_PATH, request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
