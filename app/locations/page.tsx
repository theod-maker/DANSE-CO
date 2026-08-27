import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Nos Salles',
  description: 'Retrouvez Dans&CO au Canopus et à la salle Caraïbes à Saint-Michel-Chef-Chef. Adresses, cartes et accès.',
}
import { readVenues, readPageTexts, readSiteInfo, readPageBlocks } from '@/src/lib/content/readers'
import LocationsContent from '@/src/components/pages/LocationsContent'

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
