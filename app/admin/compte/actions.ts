'use server'

import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { hashPassword, validatePasswordChange, verifyPassword } from '../../../src/lib/password'

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

  await prisma.adminUser.update({
    where: { id: account.id },
    data: { passwordHash: await hashPassword(newPassword) },
  })

  return { status: 'success', message: 'Mot de passe modifié.' }
}
