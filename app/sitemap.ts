import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://danse-co.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/planning', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/disciplines', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/instructors', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/locations', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/histoire', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/actualites', priority: 0.6, changeFrequency: 'weekly' as const },
  ]

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
