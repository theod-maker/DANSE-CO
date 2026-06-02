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
