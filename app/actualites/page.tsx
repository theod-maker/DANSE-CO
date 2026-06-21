import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Actualités',
  description: 'Actualités et événements de Dans&CO. Stages, compétitions, nouveautés de votre studio de danse à Saint-Michel-Chef-Chef.',
}
import { fallbackNews } from '@/src/lib/fallbackContent'
import ActualitesContent from '@/src/components/pages/ActualitesContent'

export default async function Actualites() {
  return (
    <ActualitesContent news={fallbackNews} />
  )
}
