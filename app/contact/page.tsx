import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Danse&CO. Téléphone, email, adresse courrier. Nous répondons rapidement à toutes vos questions sur les cours de danse.',
}
import { sanityFetch } from '@/sanity/lib/fetch'
import { siteInfoQuery, pageTextsQuery, venuesQuery, pageQuery } from '@/sanity/lib/queries'
import {
  fallbackSiteInfo, fallbackPageTexts, fallbackVenues,
  type SiteInfoContent, type PageTextsContent, type VenueContent,
} from '@/src/lib/fallbackContent'
import type { PageContent } from '@/src/lib/pageBuilderTypes'
import ContactContent from '@/src/components/pages/ContactContent'

export default async function Contact() {
  const [{ data: siteInfoRaw }, { data: pageTextsRaw }, { data: venuesRaw }, { data: pageDataRaw }] = await Promise.all([
    sanityFetch({ query: siteInfoQuery }),
    sanityFetch({ query: pageTextsQuery }),
    sanityFetch({ query: venuesQuery }),
    sanityFetch({ query: pageQuery, params: { slug: '/contact' } }),
  ])

  return (
    <ContactContent
      siteInfo={(siteInfoRaw as SiteInfoContent | null) ?? fallbackSiteInfo}
      pageTexts={(pageTextsRaw as PageTextsContent | null) ?? fallbackPageTexts}
      venues={(venuesRaw as VenueContent[] | null) ?? fallbackVenues}
      pageData={(pageDataRaw as PageContent | null) ?? null}
    />
  )
}
