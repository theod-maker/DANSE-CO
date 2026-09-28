import type { Metadata } from 'next'
import { buildPageMetadata } from '@/src/lib/content/pageMetadata'
import { readNews, readSiteInfo, readPageBlocks } from '@/src/lib/content/readers'
import ActualitesContent from '@/src/components/pages/ActualitesContent'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('actualites')
}

export default async function Actualites() {
  const [news, siteinfo, blocks] = await Promise.all([
    readNews(),
    readSiteInfo(),
    readPageBlocks('actualites'),
  ])

  return <ActualitesContent siteInfo={siteinfo} news={news} blocks={blocks} />
}
