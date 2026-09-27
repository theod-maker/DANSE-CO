import type { Metadata } from 'next'
import { buildPageMetadata } from '@/src/lib/content/pageMetadata'
import { readVenues, readPageTexts, readSiteInfo, readPageBlocks } from '@/src/lib/content/readers'
import LocationsContent from '@/src/components/pages/LocationsContent'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('salles')
}

export default async function Locations() {
  const [venues, pagetexts, siteinfo, blocks] = await Promise.all([
    readVenues(),
    readPageTexts(),
    readSiteInfo(),
    readPageBlocks('salles'),
  ])

  return (
    <LocationsContent
      siteInfo={siteinfo}
      venues={venues}
      pageTexts={pagetexts}
      blocks={blocks}
    />
  )
}
