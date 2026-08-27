import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: "Notre Histoire",
  description: "Découvrez l'histoire de Dans&CO, association de danse sportive à Saint-Michel-Chef-Chef en Loire-Atlantique.",
}
import { readPageTexts, readPageBlocks } from '@/src/lib/content/readers'
import HistoireContent from '@/src/components/pages/HistoireContent'

export default async function Histoire() {
  const [pagetexts, blocks] = await Promise.all([
    readPageTexts(),
    readPageBlocks('histoire'),
  ])

  return <HistoireContent pageTexts={pagetexts} blocks={blocks} />
}
