'use server'

import { prisma } from '../../../../src/lib/db'
import { hashPassword, validateNewPassword } from '../../../../src/lib/password'
import { hashInvitationToken, isWellFormedInvitationToken } from '../../../../src/lib/invitation'

export interface InvitationFormState {
  status: 'idle' | 'success' | 'error'
  message: string
}

const INVALID_LINK_MESSAGE =
  'Ce lien n’est plus valide. Demandez un nouveau lien à la personne qui vous l’a envoyé.'

export async function acceptInvitation(
  _previousState: InvitationFormState,
  formData: FormData
): Promise<InvitationFormState> {
  const token = String(formData.get('token') ?? '')
  if (!isWellFormedInvitationToken(token)) {
    return { status: 'error', message: INVALID_LINK_MESSAGE }
  }

  const newPassword = String(formData.get('newPassword') ?? '')
  const confirmation = String(formData.get('confirmation') ?? '')
  const validationError = validateNewPassword(newPassword, confirmation)
  if (validationError) return { status: 'error', message: validationError }

  const passwordHash = await hashPassword(newPassword)
  const now = new Date()

  const isAccepted = await prisma.$transaction(async (transaction) => {
    const invitation = await transaction.adminInvitation.findUnique({
      where: { tokenHash: hashInvitationToken(token) },
      select: { id: true, adminUserId: true },
    })
    if (!invitation) return false

    const claimed = await transaction.adminInvitation.updateMany({
      where: { id: invitation.id, usedAt: null, expiresAt: { gt: now } },
      data: { usedAt: now },
    })
    if (claimed.count === 0) return false

    await transaction.adminUser.update({
      where: { id: invitation.adminUserId },
      data: { passwordHash, passwordChangedAt: now },
    })
    await transaction.adminInvitation.updateMany({
      where: { adminUserId: invitation.adminUserId, usedAt: null },
      data: { usedAt: now },
    })
    return true
  })

  if (!isAccepted) return { status: 'error', message: INVALID_LINK_MESSAGE }
  return { status: 'success', message: 'Mot de passe enregistré. Vous pouvez vous connecter.' }
}
