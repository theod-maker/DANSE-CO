import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Actualités',
  description: 'Actualités et événements de Danse&CO. Stages, compétitions, nouveautés de votre école de danse à Saint-Michel-Chef-Chef.',
}
import ActualitesContent from '@/src/components/pages/ActualitesContent'

export default function Actualites() {
  return <ActualitesContent />
}
