import type { Metadata } from 'next'
import { readDisciplines, readPageTexts, readSiteInfo, readPageBlocks, readPageSeo } from '@/src/lib/content/readers'
import DisciplinesContent from '@/src/components/pages/DisciplinesContent'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await readPageSeo('disciplines')
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

export default async function Disciplines() {
  const [disciplines, pagetexts, siteinfo, blocks] = await Promise.all([
    readDisciplines(),
    readPageTexts(),
    readSiteInfo(),
    readPageBlocks('disciplines'),
  ])

  return (
    <DisciplinesContent
      siteInfo={siteinfo}
      disciplines={disciplines}
      pageTexts={pagetexts}
      blocks={blocks}
    />
  )
}
