import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { SanityLive } from '@/sanity/lib/live'
import VisualEditingWrapper from '@/src/components/layout/VisualEditingWrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'Danse&CO',
  description: 'École de danse sportive à Saint-Michel-Chef-Chef',
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
