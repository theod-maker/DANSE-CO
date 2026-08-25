import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Tarifs',
  description: 'Tarifs des cours de danse Dans&CO. Formules solo et couple, cotisation, stages ponctuels. Saison 2026-2027.',
}
import { readPricing, readPageTexts, readSiteInfo } from '@/src/lib/content/readers'
import PricingPageContent from '@/src/components/pages/PricingContent'

export default async function Pricing() {
  const [pricing, pagetexts, siteinfo] = await Promise.all([readPricing(), readPageTexts(), readSiteInfo()])

  return (
    <PricingPageContent
      siteInfo={siteinfo}
      pricingData={pricing}
      pageTexts={pagetexts}
      pageData={null}
    />
  )
}
