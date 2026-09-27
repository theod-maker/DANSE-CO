import type { Metadata } from 'next'
import { prisma } from '../../../../src/lib/db'
import { MINIMUM_PASSWORD_LENGTH } from '../../../../src/lib/password'
import {
  hashInvitationToken,
  isInvitationUsable,
  isWellFormedInvitationToken,
} from '../../../../src/lib/invitation'
import { InvitationForm } from './invitation-form'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  referrer: 'no-referrer',
}

async function findUsableInvitation(token: string): Promise<{ displayName: string } | null> {
  if (!isWellFormedInvitationToken(token)) return null

  const invitation = await prisma.adminInvitation.findUnique({
    where: { tokenHash: hashInvitationToken(token) },
    select: { expiresAt: true, usedAt: true, adminUser: { select: { displayName: true } } },
  })
  if (!invitation || !isInvitationUsable(invitation)) return null
  return { displayName: invitation.adminUser.displayName }
}

export default async function InvitationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const invitation = await findUsableInvitation(token)

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8f5] px-4">
      <div className="w-full max-w-sm">
        <h1
          className="mb-2 text-3xl tracking-tight text-[#6C5CA8]"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Administration
        </h1>
        {invitation ? (
          <>
            <p className="mb-8 text-sm text-neutral-500">
              Bonjour {invitation.displayName}, choisissez votre mot de passe. Vous seul le
              connaîtrez.
            </p>
            <InvitationForm token={token} minimumLength={MINIMUM_PASSWORD_LENGTH} />
          </>
        ) : (
          <p className="mt-6 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Ce lien n’est plus valide. Demandez un nouveau lien à la personne qui vous l’a envoyé.
          </p>
        )}
      </div>
    </main>
  )
}
