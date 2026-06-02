import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Nos Salles',
  description: 'Retrouvez Danse&CO au Canopus et à la salle Caraïbes à Saint-Michel-Chef-Chef. Adresses, cartes et accès.',
}
import { sanityFetch } from '@/sanity/lib/fetch'
import { venuesQuery, pageTextsQuery, pageQuery } from '@/sanity/lib/queries'
import { fallbackVenues, fallbackPageTexts, type VenueContent, type PageTextsContent } from '@/src/lib/fallbackContent'
import type { PageContent } from '@/src/lib/pageBuilderTypes'
import LocationsContent from '@/src/components/pages/LocationsContent'

export default async function Locations() {
  const [{ data: venuesRaw }, { data: pageTextsRaw }, { data: pageDataRaw }] = await Promise.all([
    sanityFetch({ query: venuesQuery }),
    sanityFetch({ query: pageTextsQuery }),
    sanityFetch({ query: pageQuery, params: { slug: '/locations' } }),
  ])

  return (
    <LocationsContent
      venues={(venuesRaw as VenueContent[] | null) ?? fallbackVenues}
      pageTexts={(pageTextsRaw as PageTextsContent | null) ?? fallbackPageTexts}
      pageData={(pageDataRaw as PageContent | null) ?? null}
    />
  )
}
