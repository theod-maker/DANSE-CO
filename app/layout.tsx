import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { SanityLive } from '@/sanity/lib/live'
import VisualEditingWrapper from '@/src/components/layout/VisualEditingWrapper'
import './globals.css'

const siteUrl = 'https://danse-co.vercel.app'

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
      <body>
        {children}
        <SanityLive />
        {isDraftMode && <VisualEditingWrapper />}
      </body>
    </html>
  )
}
