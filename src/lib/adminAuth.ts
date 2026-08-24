import { cookies } from 'next/headers'
import { prisma } from './db.ts'
import { SESSION_COOKIE_NAME, verifySessionPayload } from './session.ts'

export interface AdminAccount {
  id: string
  username: string
  displayName: string
}

export async function getCurrentAdmin(): Promise<AdminAccount | null> {
  const cookieStore = await cookies()
  const session = await verifySessionPayload(cookieStore.get(SESSION_COOKIE_NAME)?.value)
  if (!session) return null

  const account = await prisma.adminUser.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, displayName: true, passwordChangedAt: true },
  })

  if (!account) return null

  if (account.passwordChangedAt && session.issuedAtMs <= account.passwordChangedAt.getTime()) {
    return null
  }

  return { id: account.id, username: account.username, displayName: account.displayName }
}

export async function requireCurrentAdmin(): Promise<AdminAccount> {
  const account = await getCurrentAdmin()
  if (!account) {
    throw new Error('Session admin requise')
  }
  return account
}
