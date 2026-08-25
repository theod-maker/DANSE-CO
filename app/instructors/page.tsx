import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Nos Professeurs',
  description: "Rencontrez l'équipe de Dans&CO. Des professeurs passionnés pour vous accompagner dans votre apprentissage de la danse à Saint-Michel-Chef-Chef.",
}
import { readInstructors, readPageTexts, readSiteInfo } from '@/src/lib/content/readers'
import InstructorsContent from '@/src/components/pages/InstructorsContent'

export default async function Instructors() {
  const [instructors, pagetexts, siteinfo] = await Promise.all([readInstructors(), readPageTexts(), readSiteInfo()])

  return (
    <InstructorsContent
      siteInfo={siteinfo}
      team={instructors}
      pageTexts={pagetexts}
      pageData={null}
    />
  )
}
