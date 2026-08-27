import type { Metadata } from 'next'
import {
  readSiteInfo,
  readPageTexts,
  readSchedule,
  readRegistrationInfo,
  readPageBlocks,
  readPageSeo,
} from '@/src/lib/content/readers'
import PlanningContent from '@/src/components/pages/PlanningContent'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await readPageSeo('planning')
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: [
        seo.imageUrl
          ? { url: seo.imageUrl }
          : { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Dans&CO — Studio de danse à Saint-Michel-Chef-Chef' },
      ],
    },
  }
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
