import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const { prisma } = await import('../src/lib/db.ts')
const { buildStoredName, writeMediaFile, publicPathFor } = await import('../src/lib/mediaStorage.ts')
const F = await import('../src/lib/fallbackContent.ts')

const SINGLETON_ID = 'singleton'
const FORCE = process.argv.includes('--force')

const MIME_BY_EXTENSION: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  avif: 'image/avif',
}

function databaseHost(): string {
  const url = process.env['DATABASE_URL'] ?? ''
  const match = url.match(/@([^/]+)\//)
  return match ? match[1] : '(inconnu)'
}

async function countExistingContent(): Promise<Record<string, number>> {
  const [disciplines, schedule, news, instructors, venues, homepage, pricing, siteInfo, registration, pageTexts] =
    await Promise.all([
      prisma.discipline.count(),
      prisma.scheduleEntry.count(),
      prisma.news.count(),
      prisma.instructor.count(),
      prisma.venue.count(),
      prisma.homepage.count(),
      prisma.pricing.count(),
      prisma.siteInfo.count(),
      prisma.registrationInfo.count(),
      prisma.pageTexts.count(),
    ])

  return {
    disciplines,
    planning: schedule,
    actualites: news,
    professeurs: instructors,
    salles: venues,
    accueil: homepage,
    tarifs: pricing,
    informations: siteInfo,
    inscriptions: registration,
    textes: pageTexts,
  }
}

function collectImagePaths(): string[] {
  const paths = new Set<string>()

  for (const discipline of F.fallbackDisciplines) if (discipline.imageUrl) paths.add(discipline.imageUrl)
  for (const instructor of F.fallbackInstructors) if (instructor.photoUrl) paths.add(instructor.photoUrl)
  for (const venue of F.fallbackVenues) if (venue.imageUrl) paths.add(venue.imageUrl)

  const homepageImageKeys = [
    'heroImageUrl',
    'philosophyImageUrl',
    'featuredImageUrl',
    'servicesCard1ImageUrl',
    'servicesCard2ImageUrl',
  ] as const

  for (const key of homepageImageKeys) {
    const value = F.fallbackHomepage[key]
    if (value) paths.add(value)
  }

  return [...paths]
}

async function importImages(): Promise<Map<string, string>> {
  const mapping = new Map<string, string>()

  for (const sourcePath of collectImagePaths()) {
    const originalName = sourcePath.split('/').pop() ?? 'image'
    const extension = originalName.split('.').pop()?.toLowerCase() ?? ''
    const mimeType = MIME_BY_EXTENSION[extension] ?? 'image/jpeg'

    const existing = await prisma.mediaAsset.findFirst({ where: { originalName } })
    if (existing) {
      mapping.set(sourcePath, publicPathFor(existing.storedName))
      continue
    }

    let bytes: Buffer
    try {
      bytes = await readFile(join(process.cwd(), 'public', sourcePath.replace(/^\//, '')))
    } catch {
      console.warn(`  image introuvable, chemin conserve tel quel : ${sourcePath}`)
      continue
    }

    const storedName = buildStoredName(originalName, mimeType)
    await writeMediaFile(storedName, new Uint8Array(bytes))
    await prisma.mediaAsset.create({
      data: { storedName, originalName, mimeType, sizeBytes: bytes.length },
    })

    mapping.set(sourcePath, publicPathFor(storedName))
  }

  return mapping
}

function remap(path: string | undefined, mapping: Map<string, string>): string | null {
  if (!path) return null
  return mapping.get(path) ?? path
}

async function importCollections(mapping: Map<string, string>): Promise<void> {
  for (const [index, discipline] of F.fallbackDisciplines.entries()) {
    const data = {
      title: discipline.title,
      iconName: discipline.iconName,
      description: discipline.description,
      benefits: discipline.benefits,
      imageUrl: remap(discipline.imageUrl, mapping),
      displayOrder: index,
    }
    const existing = await prisma.discipline.findFirst({ where: { title: discipline.title } })
    if (existing) await prisma.discipline.update({ where: { id: existing.id }, data })
    else await prisma.discipline.create({ data })
  }

  for (const [index, course] of F.fallbackSchedule.entries()) {
    const data = {
      name: course.name,
      day: course.day,
      time: course.time,
      venue: course.venue ?? null,
      level: course.level,
      displayOrder: index,
    }
    const existing = await prisma.scheduleEntry.findFirst({
      where: { day: course.day, time: course.time, name: course.name },
    })
    if (existing) await prisma.scheduleEntry.update({ where: { id: existing.id }, data })
    else await prisma.scheduleEntry.create({ data })
  }

  for (const entry of F.fallbackNews) {
    const data = {
      title: entry.title,
      date: new Date(entry.date),
      excerpt: entry.excerpt,
      imageUrl: remap(entry.imageUrl, mapping),
      link: entry.link ?? null,
    }
    const existing = await prisma.news.findFirst({ where: { title: entry.title } })
    if (existing) await prisma.news.update({ where: { id: existing.id }, data })
    else await prisma.news.create({ data })
  }

  for (const [index, instructor] of F.fallbackInstructors.entries()) {
    const data = {
      name: instructor.name,
      specialty: instructor.specialty,
      bio: instructor.bio,
      experience: instructor.experience,
      photoUrl: remap(instructor.photoUrl, mapping),
      displayOrder: index,
    }
    const existing = await prisma.instructor.findFirst({ where: { name: instructor.name } })
    if (existing) await prisma.instructor.update({ where: { id: existing.id }, data })
    else await prisma.instructor.create({ data })
  }

  for (const [index, venue] of F.fallbackVenues.entries()) {
    const data = {
      name: venue.name,
      address: venue.address,
      description: venue.description,
      amenities: venue.amenities,
      mapEmbedUrl: venue.mapEmbedUrl,
      googleMapsUrl: venue.googleMapsUrl,
      imageUrl: remap(venue.imageUrl, mapping),
      displayOrder: index,
    }
    const existing = await prisma.venue.findFirst({ where: { name: venue.name } })
    if (existing) await prisma.venue.update({ where: { id: existing.id }, data })
    else await prisma.venue.create({ data })
  }
}

async function importSingletons(mapping: Map<string, string>): Promise<void> {
  const home = F.fallbackHomepage
  const homepageData = {
    heroImageUrl: remap(home.heroImageUrl, mapping),
    heroTagline: home.heroTagline ?? '',
    heroTitle: home.heroTitle,
    heroDescription: home.heroDescription,
    aboutTitle: home.aboutTitle,
    philosophyTitle: home.philosophyTitle,
    philosophyBlock1Label: home.philosophyBlock1Label,
    philosophyBlock1Text: home.philosophyBlock1Text,
    philosophyBlock2Label: home.philosophyBlock2Label,
    philosophyBlock2Text: home.philosophyBlock2Text,
    philosophyImageUrl: remap(home.philosophyImageUrl, mapping),
    featuredVideoDescription: home.featuredVideoDescription,
    featuredImageUrl: remap(home.featuredImageUrl, mapping),
    featuredSectionLabel: home.featuredSectionLabel ?? '',
    servicesSectionTitle: home.servicesSectionTitle,
    servicesSectionSubtitle: home.servicesSectionSubtitle,
    servicesCard1Description: home.servicesCard1Description,
    servicesCard1ImageUrl: remap(home.servicesCard1ImageUrl, mapping),
    servicesCard2Description: home.servicesCard2Description,
    servicesCard2ImageUrl: remap(home.servicesCard2ImageUrl, mapping),
  }
  await prisma.homepage.upsert({
    where: { id: SINGLETON_ID },
    update: homepageData,
    create: { id: SINGLETON_ID, ...homepageData },
  })

  const pricing = F.fallbackPricing
  await prisma.$transaction([
    prisma.pricingRow.deleteMany({ where: { pricingId: SINGLETON_ID } }),
    prisma.pricing.upsert({
      where: { id: SINGLETON_ID },
      update: { season: pricing.season, membershipFee: pricing.membershipFee, infoItems: pricing.infoItems },
      create: {
        id: SINGLETON_ID,
        season: pricing.season,
        membershipFee: pricing.membershipFee,
        infoItems: pricing.infoItems,
      },
    }),
    prisma.pricingRow.createMany({
      data: pricing.rows.map((row, index) => ({
        pricingId: SINGLETON_ID,
        label: row.label,
        price: row.price,
        detail: row.detail,
        highlight: row.highlight ?? false,
        displayOrder: index,
      })),
    }),
  ])

  const siteInfo = F.fallbackSiteInfo
  await prisma.siteInfo.upsert({
    where: { id: SINGLETON_ID },
    update: siteInfo,
    create: { id: SINGLETON_ID, ...siteInfo },
  })

  const registration = F.fallbackRegistrationInfo
  await prisma.registrationInfo.upsert({
    where: { id: SINGLETON_ID },
    update: registration,
    create: { id: SINGLETON_ID, ...registration },
  })

  const pageTexts = F.fallbackPageTexts
  await prisma.pageTexts.upsert({
    where: { id: SINGLETON_ID },
    update: pageTexts,
    create: { id: SINGLETON_ID, ...pageTexts },
  })
}

async function main(): Promise<void> {
  console.log(`Base ciblee : ${databaseHost()}`)

  const before = await countExistingContent()
  const total = Object.values(before).reduce((sum, count) => sum + count, 0)

  if (total > 0 && !FORCE) {
    console.log('\nLa base contient deja du contenu :')
    for (const [type, count] of Object.entries(before)) {
      if (count > 0) console.log(`  ${type.padEnd(14)} ${count}`)
    }
    console.log('\nImport annule pour ne pas ecraser ce contenu.')
    console.log('Relancer avec --force pour ecraser malgre tout.')
    await prisma.$disconnect()
    process.exit(1)
  }

  console.log('\nImport des images...')
  const mapping = await importImages()
  console.log(`  ${mapping.size} images enregistrees dans la bibliotheque`)

  console.log('Import du contenu...')
  await importCollections(mapping)
  await importSingletons(mapping)

  const after = await countExistingContent()
  console.log('\nContenu en base :')
  for (const [type, count] of Object.entries(after)) {
    console.log(`  ${type.padEnd(14)} ${count}`)
  }

  await prisma.$disconnect()
}

await main()
process.exit(0)
