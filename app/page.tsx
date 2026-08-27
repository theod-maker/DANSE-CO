import type { Metadata } from 'next'
import {
  readHomepage,
  readNews,
  readSiteInfo,
  readHomepageSections,
  readPageSeo,
} from '@/src/lib/content/readers'
import HomeContent from '@/src/components/home/HomeContent'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await readPageSeo('accueil')
  return {
    title: { absolute: seo.title },
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

export default async function Home() {
  const [homepage, news, siteinfo, sections] = await Promise.all([
    readHomepage(),
    readNews(),
    readSiteInfo(),
    readHomepageSections(),
  ])

  return (
    <HomeContent
      homepage={homepage}
      news={news}
      siteInfo={siteinfo}
      sections={sections}
      pageData={null}
    />
  )
}
