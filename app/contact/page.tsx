import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Dans&CO. Téléphone, email, adresse courrier. Nous répondons rapidement à toutes vos questions sur les cours de danse.',
}
import { fallbackSiteInfo, fallbackPageTexts, fallbackVenues } from '@/src/lib/fallbackContent'
import ContactContent from '@/src/components/pages/ContactContent'

export default async function Contact() {
  return (
    <ContactContent
      siteInfo={fallbackSiteInfo}
      pageTexts={fallbackPageTexts}
      venues={fallbackVenues}
      pageData={null}
    />
  )
}
