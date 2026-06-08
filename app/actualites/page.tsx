import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Actualités',
  description: 'Actualités et événements de Danse&CO. Stages, compétitions, nouveautés de votre école de danse à Saint-Michel-Chef-Chef.',
}

import { sanityFetch } from '@/sanity/lib/fetch'
import { newsQuery } from '@/sanity/lib/queries'
import { fallbackNews, type NewsContent } from '@/src/lib/fallbackContent'
import ActualitesContent from '@/src/components/pages/ActualitesContent'

export default async function Actualites() {
  const { data: newsRaw } = await sanityFetch({ query: newsQuery })

  return (
    <ActualitesContent news={(newsRaw as NewsContent[] | null) ?? fallbackNews} />
  )
}
