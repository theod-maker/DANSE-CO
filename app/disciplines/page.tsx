import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Nos Disciplines',
  description: 'Découvrez nos disciplines : Lindy Hop, West Coast Swing, Multidanses, Danse en ligne, cours enfants. Tous niveaux à Saint-Michel-Chef-Chef.',
}
import { readDisciplines, readPageTexts, readSiteInfo, readPageBlocks } from '@/src/lib/content/readers'
import DisciplinesContent from '@/src/components/pages/DisciplinesContent'

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
