import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Nos Professeurs',
  description: "Rencontrez l'équipe de Dans&CO. Des professeurs passionnés pour vous accompagner dans votre apprentissage de la danse à Saint-Michel-Chef-Chef.",
}
import { readInstructors, readPageTexts, readSiteInfo, readPageBlocks } from '@/src/lib/content/readers'
import InstructorsContent from '@/src/components/pages/InstructorsContent'

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
