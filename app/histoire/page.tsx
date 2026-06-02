import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: "Notre Histoire",
  description: "Découvrez l'histoire de Danse&CO, association de danse sportive à Saint-Michel-Chef-Chef en Loire-Atlantique.",
}
import HistoireContent from '@/src/components/pages/HistoireContent'

export default function Histoire() {
  return <HistoireContent />
}
