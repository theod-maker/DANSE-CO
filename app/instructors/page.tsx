import type { Metadata } from 'next'
import { readInstructors, readPageTexts, readSiteInfo, readPageBlocks, readPageSeo } from '@/src/lib/content/readers'
import InstructorsContent from '@/src/components/pages/InstructorsContent'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await readPageSeo('professeurs')
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

export default async function Instructors() {
  const [instructors, pagetexts, siteinfo, blocks] = await Promise.all([
    readInstructors(),
    readPageTexts(),
    readSiteInfo(),
    readPageBlocks('professeurs'),
  ])

  return (
    <InstructorsContent
      siteInfo={siteinfo}
      team={instructors}
      pageTexts={pagetexts}
      blocks={blocks}
    />
  )
}
