import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Actualités',
  description: 'Actualités et événements de Dans&CO. Stages, compétitions, nouveautés de votre studio de danse à Saint-Michel-Chef-Chef.',
}
import { readNews, readSiteInfo, readPageBlocks } from '@/src/lib/content/readers'
import ActualitesContent from '@/src/components/pages/ActualitesContent'

export default async function Actualites() {
  const [news, siteinfo, blocks] = await Promise.all([
    readNews(),
    readSiteInfo(),
    readPageBlocks('actualites'),
  ])

  return <ActualitesContent siteInfo={siteinfo} news={news} blocks={blocks} />
}
