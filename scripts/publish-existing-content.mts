import { config } from 'dotenv'

config({ path: '.env.local' })

const { prisma } = await import('../src/lib/db.ts')
const { historyRegistry } = await import('../src/lib/content/historyRegistry.ts')

const SINGLETON_ID = 'singleton'

function databaseHost(): string {
  const url = process.env['DATABASE_URL'] ?? ''
  const match = url.match(/@([^/]+)\//)
  return match ? match[1] : '(inconnu)'
}

async function publishHomepage(): Promise<boolean> {
  const current = await historyRegistry.homepage.fetchCurrent(SINGLETON_ID)
  if (!current) return false
  await prisma.homepage.update({
    where: { id: SINGLETON_ID },
    data: { publishedSnapshot: current.data, publishedAt: new Date() },
  })
  return true
}

async function publishSiteInfo(): Promise<boolean> {
  const current = await historyRegistry.siteInfo.fetchCurrent(SINGLETON_ID)
  if (!current) return false
  await prisma.siteInfo.update({
    where: { id: SINGLETON_ID },
    data: { publishedSnapshot: current.data, publishedAt: new Date() },
  })
  return true
}

async function publishPageTexts(): Promise<boolean> {
  const current = await historyRegistry.pageTexts.fetchCurrent(SINGLETON_ID)
  if (!current) return false
  await prisma.pageTexts.update({
    where: { id: SINGLETON_ID },
    data: { publishedSnapshot: current.data, publishedAt: new Date() },
  })
  return true
}

async function publishRegistrationInfo(): Promise<boolean> {
  const current = await historyRegistry.registrationInfo.fetchCurrent(SINGLETON_ID)
  if (!current) return false
  await prisma.registrationInfo.update({
    where: { id: SINGLETON_ID },
    data: { publishedSnapshot: current.data, publishedAt: new Date() },
  })
  return true
}

async function publishPricing(): Promise<boolean> {
  const current = await historyRegistry.pricing.fetchCurrent(SINGLETON_ID)
  if (!current) return false
  await prisma.pricing.update({
    where: { id: SINGLETON_ID },
    data: { publishedSnapshot: current.data, publishedAt: new Date() },
  })
  return true
}

async function publishInstructors(): Promise<number> {
  const rows = await prisma.instructor.findMany({ select: { id: true } })
  let count = 0
  for (const row of rows) {
    const current = await historyRegistry.instructors.fetchCurrent(row.id)
    if (!current) continue
    await prisma.instructor.update({
      where: { id: row.id },
      data: { publishedSnapshot: current.data, publishedAt: new Date() },
    })
    count += 1
  }
  return count
}

async function publishDisciplines(): Promise<number> {
  const rows = await prisma.discipline.findMany({ select: { id: true } })
  let count = 0
  for (const row of rows) {
    const current = await historyRegistry.disciplines.fetchCurrent(row.id)
    if (!current) continue
    await prisma.discipline.update({
      where: { id: row.id },
      data: { publishedSnapshot: current.data, publishedAt: new Date() },
    })
    count += 1
  }
  return count
}

async function publishVenues(): Promise<number> {
  const rows = await prisma.venue.findMany({ select: { id: true } })
  let count = 0
  for (const row of rows) {
    const current = await historyRegistry.venues.fetchCurrent(row.id)
    if (!current) continue
    await prisma.venue.update({
      where: { id: row.id },
      data: { publishedSnapshot: current.data, publishedAt: new Date() },
    })
    count += 1
  }
  return count
}

async function publishSchedule(): Promise<number> {
  const rows = await prisma.scheduleEntry.findMany({ select: { id: true } })
  let count = 0
  for (const row of rows) {
    const current = await historyRegistry.schedule.fetchCurrent(row.id)
    if (!current) continue
    await prisma.scheduleEntry.update({
      where: { id: row.id },
      data: { publishedSnapshot: current.data, publishedAt: new Date() },
    })
    count += 1
  }
  return count
}

async function publishNews(): Promise<number> {
  const rows = await prisma.news.findMany({ select: { id: true } })
  let count = 0
  for (const row of rows) {
    const current = await historyRegistry.news.fetchCurrent(row.id)
    if (!current) continue
    await prisma.news.update({
      where: { id: row.id },
      data: { publishedSnapshot: current.data, publishedAt: new Date() },
    })
    count += 1
  }
  return count
}

const IS_FORCED = process.argv.includes('--force')

async function countPublishedContent(): Promise<number> {
  const published = { publishedAt: { not: null } }
  const counts = await Promise.all([
    prisma.homepage.count({ where: published }),
    prisma.siteInfo.count({ where: published }),
    prisma.pageTexts.count({ where: published }),
    prisma.registrationInfo.count({ where: published }),
    prisma.pricing.count({ where: published }),
    prisma.instructor.count({ where: published }),
    prisma.discipline.count({ where: published }),
    prisma.venue.count({ where: published }),
    prisma.scheduleEntry.count({ where: published }),
    prisma.news.count({ where: published }),
  ])
  return counts.reduce((total, count) => total + count, 0)
}

console.log(`Rattrapage de publication — base : ${databaseHost()}`)

const alreadyPublished = await countPublishedContent()
if (alreadyPublished > 0 && !IS_FORCED) {
  console.log(`\n${alreadyPublished} contenu(s) déjà publié(s) sur cette base.`)
  console.log('Ce script publie la version en cours de TOUS les contenus, brouillons compris.')
  console.log('Annulé. Relancer avec --force uniquement juste après un import, avant toute édition.')
  await prisma.$disconnect()
  process.exit(1)
}

console.log(`  homepage: ${(await publishHomepage()) ? 'publié' : 'absent, rien à publier'}`)
console.log(`  siteInfo: ${(await publishSiteInfo()) ? 'publié' : 'absent, rien à publier'}`)
console.log(`  pageTexts: ${(await publishPageTexts()) ? 'publié' : 'absent, rien à publier'}`)
console.log(`  registrationInfo: ${(await publishRegistrationInfo()) ? 'publié' : 'absent, rien à publier'}`)
console.log(`  pricing: ${(await publishPricing()) ? 'publié' : 'absent, rien à publier'}`)
console.log(`  instructors: ${await publishInstructors()} élément(s) publié(s)`)
console.log(`  disciplines: ${await publishDisciplines()} élément(s) publié(s)`)
console.log(`  venues: ${await publishVenues()} élément(s) publié(s)`)
console.log(`  schedule: ${await publishSchedule()} élément(s) publié(s)`)
console.log(`  news: ${await publishNews()} élément(s) publié(s)`)

console.log('Terminé.')
await prisma.$disconnect()
