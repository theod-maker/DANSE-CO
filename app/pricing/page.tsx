import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Tarifs',
  description: 'Tarifs des cours de danse Dans&CO. Formules solo et couple, cotisation, stages ponctuels. Saison 2026-2027.',
}
import { fallbackPricing, fallbackPageTexts } from '@/src/lib/fallbackContent'
import PricingPageContent from '@/src/components/pages/PricingContent'

export default async function Pricing() {
  return (
    <PricingPageContent
      pricingData={fallbackPricing}
      pageTexts={fallbackPageTexts}
      pageData={null}
    />
  )
}
