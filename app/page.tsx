import type { Metadata } from 'next'
import { buildPageMetadata } from '@/src/lib/content/pageMetadata'
import {
  readHomepage,
  readNews,
  readSiteInfo,
  readHomepageSections,
} from '@/src/lib/content/readers'
import HomeContent from '@/src/components/home/HomeContent'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('accueil')
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
