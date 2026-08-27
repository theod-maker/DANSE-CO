import type { Metadata } from 'next'
import { readNews, readSiteInfo, readPageBlocks, readPageSeo } from '@/src/lib/content/readers'
import ActualitesContent from '@/src/components/pages/ActualitesContent'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await readPageSeo('actualites')
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: [
        seo.imageUrl
          ? { url: seo.imageUrl }
          : { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Dans&CO — Studio de danse à Saint-Michel-Chef-Chef' },
      ],
    },
  }
}

export default async function Actualites() {
  const [news, siteinfo, blocks] = await Promise.all([
    readNews(),
    readSiteInfo(),
    readPageBlocks('actualites'),
  ])

  return <ActualitesContent siteInfo={siteinfo} news={news} blocks={blocks} />
}
