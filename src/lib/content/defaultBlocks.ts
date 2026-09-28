import type { ResolvedBlock, TimelineEventBlockContent } from './pageBlocks.ts'
import type { PageBlockPageKey } from './revalidate.ts'

export const FIXED_BLOCKS_BY_PAGE: Record<Exclude<PageBlockPageKey, 'histoire'>, string[]> = {
  disciplines: ['disciplinesGrid'],
  professeurs: ['instructorsGrid', 'competition'],
  salles: ['venuesGrid'],
  planning: ['scheduleGrid', 'registrationInfo', 'specialFormulas'],
  contact: ['contactMain', 'venuesMap'],
  actualites: ['newsGrid'],
  tarifs: ['pricingRows', 'pricingInfo'],
}

export const HISTOIRE_EVENTS: TimelineEventBlockContent[] = [
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

export function defaultPageBlocks(pageKey: PageBlockPageKey): ResolvedBlock[] {
  if (pageKey === 'histoire') {
    return HISTOIRE_EVENTS.map((content, index) => ({
      id: `default-histoire-${index}`,
      kind: 'timelineEvent',
      content,
    }))
  }

  return FIXED_BLOCKS_BY_PAGE[pageKey].map((fixedKey) => ({
    id: `default-${fixedKey}`,
    kind: 'fixed',
    fixedKey,
  }))
}
