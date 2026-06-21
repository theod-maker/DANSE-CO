import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Nos Salles',
  description: 'Retrouvez Dans&CO au Canopus et à la salle Caraïbes à Saint-Michel-Chef-Chef. Adresses, cartes et accès.',
}
import { fallbackVenues, fallbackPageTexts } from '@/src/lib/fallbackContent'
import LocationsContent from '@/src/components/pages/LocationsContent'

export default async function Locations() {
  return (
    <LocationsContent
      venues={fallbackVenues}
      pageTexts={fallbackPageTexts}
      pageData={null}
    />
  )
}
