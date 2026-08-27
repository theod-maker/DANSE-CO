import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Planning des Cours',
  description: 'Consultez le planning des cours de danse Dans&CO. Horaires, jours et salles pour tous les niveaux à Saint-Michel-Chef-Chef.',
}
import {
  readSiteInfo,
  readPageTexts,
  readSchedule,
  readRegistrationInfo,
  readPageBlocks,
} from '@/src/lib/content/readers'
import PlanningContent from '@/src/components/pages/PlanningContent'

export default async function Planning() {
  const [siteinfo, pagetexts, schedule, registrationInfo, blocks] = await Promise.all([
    readSiteInfo(),
    readPageTexts(),
    readSchedule(),
    readRegistrationInfo(),
    readPageBlocks('planning'),
  ])

  return (
    <PlanningContent
      siteInfo={siteinfo}
      pageTexts={pagetexts}
      schedule={schedule}
      registrationInfo={registrationInfo}
      blocks={blocks}
    />
  )
}
