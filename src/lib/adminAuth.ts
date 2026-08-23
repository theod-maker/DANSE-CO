import { cookies } from 'next/headers'
import { prisma } from './db.ts'
import { SESSION_COOKIE_NAME, verifySessionToken } from './session.ts'

export interface AdminAccount {
  id: string
  username: string
  displayName: string
}

export async function getCurrentAdmin(): Promise<AdminAccount | null> {
  const cookieStore = await cookies()
  const userId = await verifySessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value)
  if (!userId) return null

  const account = await prisma.adminUser.findUnique({
    where: { id: userId },
    select: { id: true, username: true, displayName: true },
  })

  return account
}

export async function requireCurrentAdmin(): Promise<AdminAccount> {
  const account = await getCurrentAdmin()
  if (!account) {
    throw new Error('Session admin requise')
  }
  return account
}
