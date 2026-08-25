export const HOMEPAGE_KEY = 'homepage'

export interface SectionDefinition {
  key: string
  label: string
  description: string
}

export const HOMEPAGE_SECTIONS: SectionDefinition[] = [
  { key: 'about', label: 'Présentation', description: 'La phrase qui présente le studio' },
  { key: 'philosophy', label: 'Philosophie', description: 'Votre histoire et votre engagement' },
  { key: 'services', label: 'Nos cours', description: 'Ce que vous proposez, en deux cartes' },
  { key: 'featuredVideo', label: 'Mise en avant', description: 'La vidéo et son texte' },
  { key: 'news', label: 'Actualités', description: 'Les dernières annonces' },
]

export const FIXED_SECTIONS = [
  { key: 'navbar', label: 'Navigation', position: 'top' as const },
  { key: 'hero', label: 'Bannière d’accueil', position: 'top' as const },
  { key: 'footer', label: 'Pied de page', position: 'bottom' as const },
]

export interface ResolvedSection {
  key: string
  label: string
  visible: boolean
}

export function defaultSections(): ResolvedSection[] {
  return HOMEPAGE_SECTIONS.map((section) => ({
    key: section.key,
    label: section.label,
    visible: true,
  }))
}

export function resolveSections(
  stored: { sectionKey: string; displayOrder: number; visible: boolean }[]
): ResolvedSection[] {
  if (stored.length === 0) return defaultSections()

  const byKey = new Map(stored.map((entry) => [entry.sectionKey, entry]))

  const known = HOMEPAGE_SECTIONS.map((section) => {
    const entry = byKey.get(section.key)
    return {
      key: section.key,
      label: section.label,
      visible: entry ? entry.visible : true,
      order: entry ? entry.displayOrder : HOMEPAGE_SECTIONS.length,
    }
  })

  return known
    .sort((a, b) => a.order - b.order)
    .map(({ key, label, visible }) => ({ key, label, visible }))
}
