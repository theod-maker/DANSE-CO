import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { SanityLive } from '@/sanity/lib/live'
import VisualEditingWrapper from '@/src/components/layout/VisualEditingWrapper'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://danse-co.vercel.app'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: 'Danse&CO',
  description: 'École de danse sportive à Saint-Michel-Chef-Chef. Cours de Lindy Hop, West Coast Swing, danses de salon et plus.',
  url: siteUrl,
  telephone: '',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Canopus',
    addressLocality: 'Saint-Michel-Chef-Chef',
    postalCode: '44730',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.1697,
    longitude: -2.1467,
  },
  sport: ['Danse', 'Lindy Hop', 'West Coast Swing', 'Danses de salon'],
  priceRange: '€',
  openingHoursSpecification: [],
  sameAs: [],
}

export const metadata: Metadata = {
  title: {
    default: 'Danse&CO — École de danse à Saint-Michel-Chef-Chef',
    template: '%s | Danse&CO',
  },
  description: 'École de danse sportive à Saint-Michel-Chef-Chef. Cours de Lindy Hop, West Coast Swing, danses de salon et plus. Inscriptions ouvertes.',
  keywords: ['danse', 'cours de danse', 'Saint-Michel-Chef-Chef', 'Lindy Hop', 'West Coast Swing', 'danse sportive', 'Loire-Atlantique'],
  authors: [{ name: 'Danse&CO' }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Danse&CO — École de danse à Saint-Michel-Chef-Chef' }],
    siteName: 'Danse&CO',
    title: 'Danse&CO — École de danse à Saint-Michel-Chef-Chef',
    description: 'École de danse sportive à Saint-Michel-Chef-Chef. Cours de Lindy Hop, West Coast Swing, danses de salon et plus.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <SanityLive />
        {isDraftMode && <VisualEditingWrapper />}
      </body>
    </html>
  )
}
