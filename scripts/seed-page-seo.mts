import { config } from 'dotenv'

config({ path: '.env.local' })

const { prisma } = await import('../src/lib/db.ts')
const { defaultSeoMap } = await import('../src/lib/content/seoPages.ts')

function databaseHost(): string {
  const url = process.env['DATABASE_URL'] ?? ''
  const match = url.match(/@([^/]+)\//)
  return match ? match[1] : '(inconnu)'
}

console.log(`Semis du SEO des pages — base : ${databaseHost()}`)

const existing = await prisma.pageSeo.findUnique({ where: { id: 'singleton' } })

if (existing) {
  console.log('  déjà semé, ignoré')
} else {
  const pages = defaultSeoMap()
  await prisma.pageSeo.create({
    data: {
      id: 'singleton',
      pages,
      publishedSnapshot: { pages },
      publishedAt: new Date(),
    },
  })
  console.log(`  ${Object.keys(pages).length} page(s) semée(s) et publiée(s)`)
}

console.log('Terminé.')
await prisma.$disconnect()
