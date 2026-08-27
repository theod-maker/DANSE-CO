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
  sections: 'contenu-sections',
  pageSeo: 'contenu-seo',
} as const

export type ContentTag = keyof typeof CONTENT_TAGS

export const PAGE_BLOCK_PAGE_KEYS = [
  'disciplines',
  'professeurs',
  'salles',
  'planning',
  'contact',
  'actualites',
  'tarifs',
  'histoire',
] as const

export type PageBlockPageKey = (typeof PAGE_BLOCK_PAGE_KEYS)[number]

export function pageBlocksTag(pageKey: PageBlockPageKey): string {
  return `pageblocks-${pageKey}`
}
