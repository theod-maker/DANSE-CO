import type { Metadata } from 'next'
import { readVenues, readPageTexts, readSiteInfo, readPageBlocks, readPageSeo } from '@/src/lib/content/readers'
import LocationsContent from '@/src/components/pages/LocationsContent'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await readPageSeo('salles')
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
