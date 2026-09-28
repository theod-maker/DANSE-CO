'use server'

import { cookies } from 'next/headers'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { hashPassword, validatePasswordChange, verifyPassword } from '../../../src/lib/password'
import {
  sessionCookieName,
  SESSION_DURATION_SECONDS,
  createSessionToken,
} from '../../../src/lib/session'

export interface PasswordChangeState {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function changePassword(
  _previousState: PasswordChangeState,
  formData: FormData
): Promise<PasswordChangeState> {
  const account = await getCurrentAdmin()
  if (!account) {
    return { status: 'error', message: 'Votre session a expiré. Reconnectez-vous.' }
  }

  const currentPassword = String(formData.get('currentPassword') ?? '')
  const newPassword = String(formData.get('newPassword') ?? '')
  const confirmation = String(formData.get('confirmation') ?? '')

  const validationError = validatePasswordChange(currentPassword, newPassword, confirmation)
  if (validationError) {
    return { status: 'error', message: validationError }
  }

  const stored = await prisma.adminUser.findUnique({
    where: { id: account.id },
    select: { passwordHash: true },
  })

  if (!stored) {
    return { status: 'error', message: 'Compte introuvable.' }
  }

  const isCurrentPasswordValid = await verifyPassword(currentPassword, stored.passwordHash)
  if (!isCurrentPasswordValid) {
    return { status: 'error', message: 'Le mot de passe actuel est incorrect.' }
  }

  const changedAt = new Date()

  await prisma.adminUser.update({
    where: { id: account.id },
    data: { passwordHash: await hashPassword(newPassword), passwordChangedAt: changedAt },
  })

  const cookieStore = await cookies()
  cookieStore.set(sessionCookieName(), await createSessionToken(account.id), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  })

  return {
    status: 'success',
    message: 'Mot de passe modifié. Les autres sessions ouvertes ont été déconnectées.',
  }
}
