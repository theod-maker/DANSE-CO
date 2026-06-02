import type { Metadata } from 'next'
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
      <body>{children}</body>
    </html>
  )
}
