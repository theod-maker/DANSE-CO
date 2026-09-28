import type { Metadata } from 'next'
import { buildPageMetadata } from '@/src/lib/content/pageMetadata'
import {
  readSiteInfo,
  readPageTexts,
  readSchedule,
  readRegistrationInfo,
  readPageBlocks,
} from '@/src/lib/content/readers'
import PlanningContent from '@/src/components/pages/PlanningContent'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('planning')
}

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
