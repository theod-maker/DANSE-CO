import { config } from 'dotenv'

config({ path: '.env.local' })

const { prisma } = await import('../src/lib/db.ts')

function databaseHost(): string {
  const url = process.env['DATABASE_URL'] ?? ''
  const match = url.match(/@([^/]+)\//)
  return match ? match[1] : '(inconnu)'
}

const FIXED_BLOCKS_BY_PAGE: Record<string, string[]> = {
  disciplines: ['disciplinesGrid'],
  professeurs: ['instructorsGrid', 'competition'],
  salles: ['venuesGrid'],
  planning: ['scheduleGrid', 'registrationInfo', 'specialFormulas'],
  contact: ['contactMain', 'venuesMap'],
  actualites: ['newsGrid'],
  tarifs: ['pricingRows', 'pricingInfo'],
}

const HISTOIRE_EVENTS = [
  {
    year: '2016',
    label: 'Les débuts',
    text: "Créé par des amis passionnés par la danse, Dans'&Co ouvre ses portes à Besné. Un lieu d'apprentissage de la danse à deux, chaleureux et ouvert à tous.",
    imageUrls: ['/images/histoire/histoire-1.avif'],
  },
  {
    year: '2016–2020',
    label: "L'essor",
    text: "Danses de salon, west coast swing, salsa cubaine, rock'n roll... Stages, soirées de Saint-Sylvestre, formation de compétiteurs sur le territoire national, cours de hip hop et modern jazz. Les membres sont sur tous les fronts pour faire prospérer le club.",
    imageUrls: ['/images/histoire/histoire-2.avif', '/images/histoire/histoire-3.avif'],
  },
  {
    year: '2020',
    label: 'Une pause',
    text: "Le Covid passe par là, apportant son lot de péripéties. L'activité cesse quelque temps, mais la passion, elle, ne s'arrête jamais.",
    imageUrls: ['/images/histoire/histoire-4.avif'],
  },
  {
    year: '2023',
    label: 'Un nouveau départ',
    text: "Le choix est fait de déplacer le club à Saint-Michel-Chef-Chef. Repartir de zéro, entamer le même périple, proche de l'océan.",
    imageUrls: ['/images/histoire/histoire-5.avif'],
  },
]

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
