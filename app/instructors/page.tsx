import type { Metadata } from 'next'
import { buildPageMetadata } from '@/src/lib/content/pageMetadata'
import { readInstructors, readPageTexts, readSiteInfo, readPageBlocks } from '@/src/lib/content/readers'
import InstructorsContent from '@/src/components/pages/InstructorsContent'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('professeurs')
}

export default async function Instructors() {
  const [instructors, pagetexts, siteinfo, blocks] = await Promise.all([
    readInstructors(),
    readPageTexts(),
    readSiteInfo(),
    readPageBlocks('professeurs'),
  ])

  return (
    <InstructorsContent
      siteInfo={siteinfo}
      team={instructors}
      pageTexts={pagetexts}
      blocks={blocks}
    />
  )
}
