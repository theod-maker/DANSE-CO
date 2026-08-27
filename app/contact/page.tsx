import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Dans&CO. Téléphone, email, adresse courrier. Nous répondons rapidement à toutes vos questions sur les cours de danse.',
}
import { readSiteInfo, readPageTexts, readVenues, readPageBlocks } from '@/src/lib/content/readers'
import ContactContent from '@/src/components/pages/ContactContent'

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
