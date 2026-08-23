import { NextResponse } from 'next/server'
import { prisma } from '../../../../src/lib/db'
import { hashPassword, verifyPassword } from '../../../../src/lib/password'
import {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  createSessionToken,
} from '../../../../src/lib/session'

export const runtime = 'nodejs'

const GENERIC_ERROR = 'Identifiant ou mot de passe incorrect'

let decoyHashPromise: Promise<string> | null = null

function getDecoyHash(): Promise<string> {
  decoyHashPromise ??= hashPassword('mot-de-passe-inexistant-pour-egaliser-le-temps')
  return decoyHashPromise
}

export async function POST(request: Request) {
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
  response.cookies.set(SESSION_COOKIE_NAME, await createSessionToken(account.id), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  })

  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return response
}
