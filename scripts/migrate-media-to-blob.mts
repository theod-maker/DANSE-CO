import { config } from 'dotenv'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

config({ path: '.env.local' })

const { prisma } = await import('../src/lib/db.ts')
const { uploadMediaFile } = await import('../src/lib/mediaStorage.ts')

function databaseHost(): string {
  const url = process.env['DATABASE_URL'] ?? ''
  const match = url.match(/@([^/]+)\//)
  return match ? match[1] : '(inconnu)'
}

const UPLOAD_DIRECTORY = join(process.cwd(), 'public', 'uploads')

console.log(`Migration des médias vers Vercel Blob — base : ${databaseHost()}`)

const pending = await prisma.mediaAsset.findMany({ where: { url: '' } })

if (pending.length === 0) {
  console.log('  aucun média à migrer')
} else {
  console.log(`  ${pending.length} média(s) à migrer`)
}

let migrated = 0
let missing = 0
let failed = 0

for (const asset of pending) {
  try {
    const bytes = await readFile(join(UPLOAD_DIRECTORY, asset.storedName))
    const url = await uploadMediaFile(asset.storedName, bytes, asset.mimeType)
    await prisma.mediaAsset.update({ where: { id: asset.id }, data: { url } })
    console.log(`  migré : ${asset.storedName}`)
    migrated += 1
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code === 'ENOENT') {
      console.log(`  INTROUVABLE en local, ignoré : ${asset.storedName}`)
      missing += 1
    } else {
      console.log(`  ÉCHEC : ${asset.storedName} — ${(error as Error).message}`)
      failed += 1
    }
  }
}

console.log(`Terminé. Migrées : ${migrated} | Introuvables : ${missing} | Échecs : ${failed}`)

const remaining = await prisma.mediaAsset.count({ where: { url: '' } })
if (remaining > 0) {
  console.log(`Attention : ${remaining} média(s) sans URL subsistent en base.`)
}

await prisma.$disconnect()
