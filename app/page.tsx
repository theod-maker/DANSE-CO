import { readHomepage, readNews, readSiteInfo } from '@/src/lib/content/readers'
import HomeContent from '@/src/components/home/HomeContent'

export default async function Home() {
  const [homepage, news, siteinfo] = await Promise.all([
    readHomepage(),
    readNews(),
    readSiteInfo(),
  ])

  return (
    <HomeContent
      homepage={homepage}
      news={news}
      siteInfo={siteinfo}
      pageData={null}
    />
  )
}
