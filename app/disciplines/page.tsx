import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Nos Disciplines',
  description: 'Découvrez nos disciplines : Lindy Hop, West Coast Swing, Multidanses, Danse en ligne, cours enfants. Tous niveaux à Saint-Michel-Chef-Chef.',
}
import { fallbackDisciplines, fallbackPageTexts } from '@/src/lib/fallbackContent'
import DisciplinesContent from '@/src/components/pages/DisciplinesContent'

export default async function Disciplines() {
  return (
    <DisciplinesContent
      disciplines={fallbackDisciplines}
      pageTexts={fallbackPageTexts}
      pageData={null}
    />
  )
}
