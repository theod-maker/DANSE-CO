import { NextResponse } from 'next/server'
import { prisma } from '../../../../src/lib/db'
import { hashPassword, verifyPassword } from '../../../../src/lib/password'
import {
  sessionCookieName,
  SESSION_DURATION_SECONDS,
  createSessionToken,
} from '../../../../src/lib/session'

export const runtime = 'nodejs'

const GENERIC_ERROR = 'Identifiant ou mot de passe incorrect'
const RATE_LIMIT_ERROR = 'Trop de tentatives. Réessayez dans quelques minutes.'

let decoyHashPromise: Promise<string> | null = null

function getDecoyHash(): Promise<string> {
  decoyHashPromise ??= hashPassword('mot-de-passe-inexistant-pour-egaliser-le-temps')
  return decoyHashPromise
}

const MAX_LOGIN_ATTEMPTS = 5
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000

interface RateLimitEntry {
  count: number
  resetAt: number
}

const loginAttemptsByIp = new Map<string, RateLimitEntry>()

function clientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = loginAttemptsByIp.get(ip)

  if (!entry || entry.resetAt <= now) {
    loginAttemptsByIp.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > MAX_LOGIN_ATTEMPTS
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ error: RATE_LIMIT_ERROR }, { status: 429 })
  }

  let username: unknown
  let password: unknown

  try {
    const body = await request.json()
    username = body?.username
    password = body?.password
  } catch {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 })
  }

  if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 })
  }

  const account = await prisma.adminUser.findUnique({ where: { username } })

  if (!account) {
    await verifyPassword(password, await getDecoyHash())
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 })
  }

  const isPasswordValid = await verifyPassword(password, account.passwordHash)
  if (!isPasswordValid) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 })
  }

  await prisma.adminUser.update({
    where: { id: account.id },
    data: { lastLoginAt: new Date() },
  })

  const response = NextResponse.json({ displayName: account.displayName })
  response.cookies.set(sessionCookieName(), await createSessionToken(account.id), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  })

  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(sessionCookieName(), '', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return response
}
