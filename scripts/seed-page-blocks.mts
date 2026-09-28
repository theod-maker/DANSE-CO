import { config } from 'dotenv'

config({ path: '.env.local' })

const { prisma } = await import('../src/lib/db.ts')
const { FIXED_BLOCKS_BY_PAGE, HISTOIRE_EVENTS } = await import('../src/lib/content/defaultBlocks.ts')

function databaseHost(): string {
  const url = process.env['DATABASE_URL'] ?? ''
  const match = url.match(/@([^/]+)\//)
  return match ? match[1] : '(inconnu)'
}

async function seedFixedBlocks(pageKey: string, fixedKeys: string[]): Promise<number> {
  const existing = await prisma.pageBlock.count({ where: { pageKey } })
  if (existing > 0) return 0

  await prisma.pageBlock.createMany({
    data: fixedKeys.map((fixedKey, index) => ({
      pageKey,
      kind: 'fixed',
      fixedKey,
      displayOrder: index,
      visible: true,
    })),
  })
  return fixedKeys.length
}

async function seedHistoireEvents(): Promise<number> {
  const existing = await prisma.pageBlock.count({ where: { pageKey: 'histoire' } })
  if (existing > 0) return 0

  const now = new Date()
  await prisma.pageBlock.createMany({
    data: HISTOIRE_EVENTS.map((event, index) => ({
      pageKey: 'histoire',
      kind: 'timelineEvent',
      content: event,
      publishedSnapshot: event,
      publishedAt: now,
      displayOrder: index,
      visible: true,
    })),
  })
  return HISTOIRE_EVENTS.length
}

console.log(`Semis des blocs de page — base : ${databaseHost()}`)

for (const [pageKey, fixedKeys] of Object.entries(FIXED_BLOCKS_BY_PAGE)) {
  const count = await seedFixedBlocks(pageKey, fixedKeys)
  console.log(`  ${pageKey}: ${count > 0 ? `${count} bloc(s) fixe(s) créé(s)` : 'déjà semée, ignorée'}`)
}

const histoireCount = await seedHistoireEvents()
console.log(`  histoire: ${histoireCount > 0 ? `${histoireCount} étape(s) créée(s)` : 'déjà semée, ignorée'}`)

console.log('Terminé.')
await prisma.$disconnect()
