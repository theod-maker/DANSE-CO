import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Actualités',
  description: 'Actualités et événements de Dans&CO. Stages, compétitions, nouveautés de votre studio de danse à Saint-Michel-Chef-Chef.',
}
import { readNews, readSiteInfo } from '@/src/lib/content/readers'
import ActualitesContent from '@/src/components/pages/ActualitesContent'

export default async function Actualites() {
  const [news, siteinfo] = await Promise.all([readNews(), readSiteInfo()])

  return (
    <ActualitesContent
      siteInfo={siteinfo} news={news} />
  )
}
