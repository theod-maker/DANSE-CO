import type { Metadata } from 'next'
import { readPageTexts, readPageBlocks, readPageSeo } from '@/src/lib/content/readers'
import HistoireContent from '@/src/components/pages/HistoireContent'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await readPageSeo('histoire')
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

export default async function Histoire() {
  const [pagetexts, blocks] = await Promise.all([
    readPageTexts(),
    readPageBlocks('histoire'),
  ])

  return <HistoireContent pageTexts={pagetexts} blocks={blocks} />
}
