export const CONTENT_TAGS = {
  homepage: 'contenu-accueil',
  siteInfo: 'contenu-informations',
  pageTexts: 'contenu-textes',
  registrationInfo: 'contenu-inscriptions',
  pricing: 'contenu-tarifs',
  instructors: 'contenu-professeurs',
  disciplines: 'contenu-disciplines',
  venues: 'contenu-salles',
  schedule: 'contenu-planning',
  news: 'contenu-actualites',
} as const

export type ContentTag = keyof typeof CONTENT_TAGS
