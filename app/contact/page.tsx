import type { Metadata } from 'next'
import { readSiteInfo, readPageTexts, readVenues, readPageBlocks, readPageSeo } from '@/src/lib/content/readers'
import ContactContent from '@/src/components/pages/ContactContent'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await readPageSeo('contact')
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

export default async function Contact() {
  const [siteinfo, pagetexts, venues, blocks] = await Promise.all([
    readSiteInfo(),
    readPageTexts(),
    readVenues(),
    readPageBlocks('contact'),
  ])

  return (
    <ContactContent
      siteInfo={siteinfo}
      pageTexts={pagetexts}
      venues={venues}
      blocks={blocks}
    />
  )
}
