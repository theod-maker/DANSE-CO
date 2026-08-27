import type { ResolvedFreeBlock } from '@/src/lib/content/pageBlocks'
import type {
  TextBlockContent,
  ImageBlockContent,
  GalleryBlockContent,
  CtaBlockContent,
} from '@/src/lib/content/pageBlocks'
import TextBlock from './TextBlock'
import ImageBlock from './ImageBlock'
import GalleryBlock from './GalleryBlock'
import CtaBlock from './CtaBlock'

interface FreeBlockRendererProps {
  block: ResolvedFreeBlock
}

export default function FreeBlockRenderer({ block }: FreeBlockRendererProps) {
  if (!block.content) return null

  switch (block.kind) {
    case 'text':
      return <TextBlock {...(block.content as TextBlockContent)} />
    case 'image':
      return <ImageBlock {...(block.content as ImageBlockContent)} />
    case 'gallery':
      return <GalleryBlock {...(block.content as GalleryBlockContent)} />
    case 'cta':
      return <CtaBlock {...(block.content as CtaBlockContent)} />
    default:
      return null
  }
}
