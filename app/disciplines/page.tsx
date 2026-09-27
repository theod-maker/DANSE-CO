import type { Metadata } from 'next'
import { buildPageMetadata } from '@/src/lib/content/pageMetadata'
import { readDisciplines, readPageTexts, readSiteInfo, readPageBlocks } from '@/src/lib/content/readers'
import DisciplinesContent from '@/src/components/pages/DisciplinesContent'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('disciplines')
}

export default async function Disciplines() {
  const [disciplines, pagetexts, siteinfo, blocks] = await Promise.all([
    readDisciplines(),
    readPageTexts(),
    readSiteInfo(),
    readPageBlocks('disciplines'),
  ])

  return (
    <DisciplinesContent
      siteInfo={siteinfo}
      disciplines={disciplines}
      pageTexts={pagetexts}
      blocks={blocks}
    />
  )
}
