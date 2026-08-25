import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Nos Salles',
  description: 'Retrouvez Dans&CO au Canopus et à la salle Caraïbes à Saint-Michel-Chef-Chef. Adresses, cartes et accès.',
}
import { readVenues, readPageTexts, readSiteInfo } from '@/src/lib/content/readers'
import LocationsContent from '@/src/components/pages/LocationsContent'

export default async function Locations() {
  const [venues, pagetexts, siteinfo] = await Promise.all([readVenues(), readPageTexts(), readSiteInfo()])

  return (
    <LocationsContent
      siteInfo={siteinfo}
      venues={venues}
      pageTexts={pagetexts}
      pageData={null}
    />
  )
}
