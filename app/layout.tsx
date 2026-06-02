import type { Metadata } from 'next'
import DynamicWrapper from '@/src/components/layout/DynamicWrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'Danse&CO',
  description: 'École de danse sportive à Saint-Michel-Chef-Chef',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <DynamicWrapper>{children}</DynamicWrapper>
      </body>
    </html>
  )
}
