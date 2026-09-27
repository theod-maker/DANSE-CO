import type { Metadata } from 'next'
import { buildPageMetadata } from '@/src/lib/content/pageMetadata'
import { readSiteInfo, readPageTexts, readVenues, readPageBlocks } from '@/src/lib/content/readers'
import ContactContent from '@/src/components/pages/ContactContent'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('contact')
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
