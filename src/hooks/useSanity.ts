import { useState, useEffect } from 'react'
import { sanityClient, isSanityConfigured } from '../lib/sanityClient'
import {
  homepageQuery,
  instructorsQuery,
  scheduleQuery,
  pricingQuery,
} from '../lib/sanityQueries'
import {
  fallbackHomepage,
  fallbackInstructors,
  fallbackSchedule,
  fallbackPricing,
  type HomepageContent,
  type InstructorContent,
  type ScheduleEntryContent,
  type PricingContent,
} from '../lib/fallbackContent'

function useSanityData<T>(query: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback)

  useEffect(() => {
    if (!isSanityConfigured) return
    sanityClient
      .fetch<T>(query)
      .then((result) => {
        if (result) setData(result)
      })
      .catch(() => {})
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
