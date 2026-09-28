import type { Metadata } from 'next'
import { readPageSeo } from './readers.ts'
import { SEO_PAGES, type PageSeoFields } from './seoPages.ts'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dansandco.fr'

const DEFAULT_SHARE_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Dans&CO — Studio de danse à Saint-Michel-Chef-Chef',
}

function isCustomized(seo: PageSeoFields, defaults: PageSeoFields): boolean {
  return (
    seo.title !== defaults.title ||
    seo.description !== defaults.description ||
    seo.imageUrl !== defaults.imageUrl
  )
}

export async function buildPageMetadata(pageKey: string): Promise<Metadata> {
  const page = SEO_PAGES.find((candidate) => candidate.key === pageKey)
  if (!page) throw new Error(`Page SEO inconnue : ${pageKey}`)

  const seo = await readPageSeo(pageKey)
  const title = page.isHomePage ? { absolute: seo.title } : seo.title

  if (!isCustomized(seo, page.defaults)) {
    return { title, description: seo.description }
  }

  return {
    title,
    description: seo.description,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: page.isHomePage ? SITE_URL : `${SITE_URL}${page.path}`,
      siteName: 'Dans&CO',
      title: seo.title,
      description: seo.description,
      images: [seo.imageUrl ? { url: seo.imageUrl } : DEFAULT_SHARE_IMAGE],
    },
  }
}
