import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Nos Professeurs',
  description: "Rencontrez l'équipe de Dans&CO. Des professeurs passionnés pour vous accompagner dans votre apprentissage de la danse à Saint-Michel-Chef-Chef.",
}
import { fallbackInstructors, fallbackPageTexts } from '@/src/lib/fallbackContent'
import InstructorsContent from '@/src/components/pages/InstructorsContent'

export default async function Instructors() {
  return (
    <InstructorsContent
      team={fallbackInstructors}
      pageTexts={fallbackPageTexts}
      pageData={null}
    />
  )
}
