import { sanityFetch } from '@/sanity/lib/fetch'
import { pricingQuery, pageTextsQuery, pageQuery } from '@/sanity/lib/queries'
import { fallbackPricing, fallbackPageTexts, type PricingContent, type PageTextsContent } from '@/src/lib/fallbackContent'
import type { PageContent } from '@/src/lib/pageBuilderTypes'
import PricingPageContent from '@/src/components/pages/PricingContent'

export default async function Pricing() {
  const [{ data: pricingRaw }, { data: pageTextsRaw }, { data: pageDataRaw }] = await Promise.all([
    sanityFetch({ query: pricingQuery }),
    sanityFetch({ query: pageTextsQuery }),
    sanityFetch({ query: pageQuery, params: { slug: '/pricing' } }),
  ])

  return (
    <PricingPageContent
      pricingData={(pricingRaw as PricingContent | null) ?? fallbackPricing}
      pageTexts={(pageTextsRaw as PageTextsContent | null) ?? fallbackPageTexts}
      pageData={(pageDataRaw as PageContent | null) ?? null}
    />
  )
}
