import { parseArgs } from 'node:util'
import { config } from 'dotenv'
import { hashPassword } from '../src/lib/password.ts'
import { generateInvitation, unusablePasswordSecret } from '../src/lib/invitation.ts'

config({ path: '.env.local' })

const { prisma } = await import('../src/lib/db.ts')

const USAGE =
  'Usage : node scripts/invite-admin.mts --username <identifiant> --display-name "<nom>" ' +
  '[--base-url https://dansandco.fr]'

function databaseHost(): string {
  const match = (process.env['DATABASE_URL'] ?? '').match(/@([^/]+)\//)
  return match ? match[1] : '(inconnu)'
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      username: { type: 'string' },
      'display-name': { type: 'string' },
      'base-url': { type: 'string' },
    },
  })

  const username = values.username?.trim()
  const displayName = values['display-name']?.trim()
  if (!username || !displayName) throw new Error(USAGE)

  const baseUrl = (
    values['base-url'] ??
    process.env['NEXT_PUBLIC_SITE_URL'] ??
    'https://dansandco.fr'
  ).replace(/\/$/, '')

  const existing = await prisma.adminUser.findUnique({ where: { username } })
  const account =
    existing ??
    (await prisma.adminUser.create({
      data: { username, displayName, passwordHash: await hashPassword(unusablePasswordSecret()) },
    }))

  const invitation = generateInvitation()
  await prisma.$transaction([
    prisma.adminInvitation.updateMany({
      where: { adminUserId: account.id, usedAt: null },
      data: { usedAt: new Date() },
    }),
    prisma.adminInvitation.create({
      data: {
        adminUserId: account.id,
        tokenHash: invitation.tokenHash,
        expiresAt: invitation.expiresAt,
      },
    }),
  ])

  console.log(`Base : ${databaseHost()}`)
  console.log(
    existing
      ? `Compte existant : ${account.username}. Son mot de passe actuel reste valide ` +
          `jusqu'à l'utilisation du lien.`
      : `Compte créé : ${account.username} (${account.displayName}), ` +
          'sans mot de passe utilisable.'
  )
  console.log('Les liens précédents de ce compte sont révoqués.')
  const expiry = invitation.expiresAt.toLocaleString('fr-FR')
  console.log(`\nLien à transmettre, valable jusqu'au ${expiry} :`)
  console.log(`${baseUrl}/admin/invitation/${invitation.token}\n`)
  console.log('Ce lien ne sert qu’une fois. Ne le transmettez qu’à la personne concernée.')
}

try {
  await main()
} finally {
  await prisma.$disconnect()
}
