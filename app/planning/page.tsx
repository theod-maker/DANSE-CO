import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Planning des Cours',
  description: 'Consultez le planning des cours de danse Danse&CO. Horaires, jours et salles pour tous les niveaux à Saint-Michel-Chef-Chef.',
}
import { sanityFetch } from '@/sanity/lib/fetch'
import { siteInfoQuery, pageTextsQuery, pageQuery } from '@/sanity/lib/queries'
import { fallbackSiteInfo, fallbackPageTexts, type SiteInfoContent, type PageTextsContent } from '@/src/lib/fallbackContent'
import type { PageContent } from '@/src/lib/pageBuilderTypes'
import PlanningContent from '@/src/components/pages/PlanningContent'

export default async function Planning() {
  const [{ data: siteInfoRaw }, { data: pageTextsRaw }, { data: pageDataRaw }] = await Promise.all([
    sanityFetch({ query: siteInfoQuery }),
    sanityFetch({ query: pageTextsQuery }),
    sanityFetch({ query: pageQuery, params: { slug: '/planning' } }),
  ])

  return (
    <PlanningContent
      siteInfo={(siteInfoRaw as SiteInfoContent | null) ?? fallbackSiteInfo}
      pageTexts={(pageTextsRaw as PageTextsContent | null) ?? fallbackPageTexts}
      pageData={(pageDataRaw as PageContent | null) ?? null}
    />
  )
}
