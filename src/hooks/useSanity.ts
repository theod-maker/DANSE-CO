import { useState, useEffect } from 'react'
import { sanityClient, isSanityConfigured } from '../lib/sanityClient'
import {
  homepageQuery,
  instructorsQuery,
  scheduleQuery,
  pricingQuery,
  siteInfoQuery,
  disciplinesQuery,
  venuesQuery,
  registrationInfoQuery,
  pageTextsQuery,
  newsQuery,
} from '../lib/sanityQueries'
import {
  fallbackHomepage,
  fallbackInstructors,
  fallbackSchedule,
  fallbackPricing,
  fallbackSiteInfo,
  fallbackDisciplines,
  fallbackVenues,
  fallbackRegistrationInfo,
  fallbackPageTexts,
  fallbackNews,
  type HomepageContent,
  type InstructorContent,
  type ScheduleEntryContent,
  type PricingContent,
  type SiteInfoContent,
  type DisciplineContent,
  type VenueContent,
  type RegistrationInfoContent,
  type PageTextsContent,
  type NewsContent,
} from '../lib/fallbackContent'

function useSanityData<T>(query: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback)

  useEffect(() => {
    if (!isSanityConfigured) return
    sanityClient
      .fetch<T>(query)
      .then((result) => {
        if (result && (!Array.isArray(result) || result.length > 0)) setData(result)
      })
      .catch((err) => { if (import.meta.env.DEV) console.warn('[useSanity]', err) })
  }, [query])

  return data
}

export function useHomepage(): HomepageContent {
  return useSanityData<HomepageContent>(homepageQuery, fallbackHomepage)
}

export function useInstructors(): InstructorContent[] {
  return useSanityData<InstructorContent[]>(instructorsQuery, fallbackInstructors)
}

export function useSchedule(): ScheduleEntryContent[] {
  return useSanityData<ScheduleEntryContent[]>(scheduleQuery, fallbackSchedule)
}

export function usePricing(): PricingContent {
  return useSanityData<PricingContent>(pricingQuery, fallbackPricing)
}

export function useSiteInfo(): SiteInfoContent {
  return useSanityData<SiteInfoContent>(siteInfoQuery, fallbackSiteInfo)
}

export function useDisciplines(): DisciplineContent[] {
  return useSanityData<DisciplineContent[]>(disciplinesQuery, fallbackDisciplines)
}

export function useVenues(): VenueContent[] {
  return useSanityData<VenueContent[]>(venuesQuery, fallbackVenues)
}

export function useRegistrationInfo(): RegistrationInfoContent {
  return useSanityData<RegistrationInfoContent>(registrationInfoQuery, fallbackRegistrationInfo)
}

export function usePageTexts(): PageTextsContent {
  return useSanityData<PageTextsContent>(pageTextsQuery, fallbackPageTexts)
}

export function useNews(): NewsContent[] {
  return useSanityData<NewsContent[]>(newsQuery, fallbackNews)
}
