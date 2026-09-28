import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Tarifs',
  description: 'Tarifs des cours de danse Dans&CO. Formules solo et couple, cotisation, stages ponctuels. Saison 2026-2027.',
}
import { readPricing, readPageTexts, readSiteInfo, readPageBlocks } from '@/src/lib/content/readers'
import PricingPageContent from '@/src/components/pages/PricingContent'

export default async function Pricing() {
  const [pricing, pagetexts, siteinfo, blocks] = await Promise.all([
    readPricing(),
    readPageTexts(),
    readSiteInfo(),
    readPageBlocks('tarifs'),
  ])

  return (
    <PricingPageContent
      siteInfo={siteinfo}
      pricingData={pricing}
      pageTexts={pagetexts}
      blocks={blocks}
    />
  )
}
