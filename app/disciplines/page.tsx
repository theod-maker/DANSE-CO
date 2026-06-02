import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Nos Disciplines',
  description: 'Découvrez nos disciplines : Lindy Hop, West Coast Swing, Multidanses, Danse en ligne, cours enfants. Tous niveaux à Saint-Michel-Chef-Chef.',
}
import { sanityFetch } from '@/sanity/lib/fetch'
import { disciplinesQuery, pageTextsQuery, pageQuery } from '@/sanity/lib/queries'
import { fallbackDisciplines, fallbackPageTexts, type DisciplineContent, type PageTextsContent } from '@/src/lib/fallbackContent'
import type { PageContent } from '@/src/lib/pageBuilderTypes'
import DisciplinesContent from '@/src/components/pages/DisciplinesContent'

export default async function Disciplines() {
  const [{ data: disciplinesRaw }, { data: pageTextsRaw }, { data: pageDataRaw }] = await Promise.all([
    sanityFetch({ query: disciplinesQuery }),
    sanityFetch({ query: pageTextsQuery }),
    sanityFetch({ query: pageQuery, params: { slug: '/disciplines' } }),
  ])

  return (
    <DisciplinesContent
      disciplines={(disciplinesRaw as DisciplineContent[] | null) ?? fallbackDisciplines}
      pageTexts={(pageTextsRaw as PageTextsContent | null) ?? fallbackPageTexts}
      pageData={(pageDataRaw as PageContent | null) ?? null}
    />
  )
}
