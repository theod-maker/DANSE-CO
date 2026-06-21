import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Planning des Cours',
  description: 'Consultez le planning des cours de danse Dans&CO. Horaires, jours et salles pour tous les niveaux à Saint-Michel-Chef-Chef.',
}
import { fallbackSiteInfo, fallbackPageTexts } from '@/src/lib/fallbackContent'
import PlanningContent from '@/src/components/pages/PlanningContent'

export default async function Planning() {
  return (
    <PlanningContent
      siteInfo={fallbackSiteInfo}
      pageTexts={fallbackPageTexts}
      pageData={null}
    />
  )
}
