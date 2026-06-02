import { sanityFetch } from '@/sanity/lib/fetch'
import { instructorsQuery, pageTextsQuery, pageQuery } from '@/sanity/lib/queries'
import { fallbackInstructors, fallbackPageTexts, type InstructorContent, type PageTextsContent } from '@/src/lib/fallbackContent'
import type { PageContent } from '@/src/lib/pageBuilderTypes'
import InstructorsContent from '@/src/components/pages/InstructorsContent'

export default async function Instructors() {
  const [{ data: teamRaw }, { data: pageTextsRaw }, { data: pageDataRaw }] = await Promise.all([
    sanityFetch({ query: instructorsQuery }),
    sanityFetch({ query: pageTextsQuery }),
    sanityFetch({ query: pageQuery, params: { slug: '/instructors' } }),
  ])

  return (
    <InstructorsContent
      team={(teamRaw as InstructorContent[] | null) ?? fallbackInstructors}
      pageTexts={(pageTextsRaw as PageTextsContent | null) ?? fallbackPageTexts}
      pageData={(pageDataRaw as PageContent | null) ?? null}
    />
  )
}
