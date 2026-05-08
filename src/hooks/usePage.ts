import { useState, useEffect } from 'react'
import { sanityClient, isSanityConfigured } from '../lib/sanityClient'
import { pageQuery } from '../lib/pageBuilderQueries'
import type { PageContent } from '../lib/pageBuilderTypes'

export function usePage(slug: string): PageContent | null {
  const [page, setPage] = useState<PageContent | null>(null)

  useEffect(() => {
    if (!isSanityConfigured) return
    sanityClient
      .fetch<PageContent>(pageQuery, { slug })
      .then((result) => {
        if (result) setPage(result)
      })
      .catch(() => {})
  }, [slug])

  return page
}
