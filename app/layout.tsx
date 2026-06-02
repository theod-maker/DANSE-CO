import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { SanityLive } from '@/sanity/lib/live'
import DynamicWrapper from '@/src/components/layout/DynamicWrapper'
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
        <DynamicWrapper>{children}</DynamicWrapper>
        <SanityLive />
        {isDraftMode && <VisualEditingWrapper />}
      </body>
    </html>
  )
}
