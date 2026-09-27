import type { Metadata } from 'next'
import { buildPageMetadata } from '@/src/lib/content/pageMetadata'
import { readPageTexts, readPageBlocks } from '@/src/lib/content/readers'
import HistoireContent from '@/src/components/pages/HistoireContent'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('histoire')
}

export default async function Histoire() {
  const [pagetexts, blocks] = await Promise.all([
    readPageTexts(),
    readPageBlocks('histoire'),
  ])

  return <HistoireContent pageTexts={pagetexts} blocks={blocks} />
}
