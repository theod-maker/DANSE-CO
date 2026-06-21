import { fallbackHomepage, fallbackNews } from '@/src/lib/fallbackContent'
import HomeContent from '@/src/components/home/HomeContent'

export default async function Home() {
  return (
    <HomeContent
      homepage={fallbackHomepage}
      news={fallbackNews}
      pageData={null}
    />
  )
}
