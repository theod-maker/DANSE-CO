import { sanityFetch } from '@/sanity/lib/fetch'
import { homepageQuery, newsQuery, pageQuery } from '@/sanity/lib/queries'
import { fallbackHomepage, fallbackNews, type HomepageContent, type NewsContent } from '@/src/lib/fallbackContent'
import type { PageContent } from '@/src/lib/pageBuilderTypes'
import HomeContent from '@/src/components/home/HomeContent'

export default async function Home() {
  const [{ data: homepageRaw }, { data: newsRaw }, { data: pageDataRaw }] = await Promise.all([
    sanityFetch({ query: homepageQuery }),
    sanityFetch({ query: newsQuery }),
    sanityFetch({ query: pageQuery, params: { slug: '/' } }),
  ])

  return (
    <HomeContent
      homepage={(homepageRaw as HomepageContent | null) ?? fallbackHomepage}
      news={(newsRaw as NewsContent[] | null) ?? fallbackNews}
      pageData={(pageDataRaw as PageContent | null) ?? null}
    />
  )
}
