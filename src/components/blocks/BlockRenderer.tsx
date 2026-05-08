import React from 'react'
import type { PageBlock } from '../../lib/pageBuilderTypes'
import HeroBlock from './HeroBlock'
import PageHeaderBlock from './PageHeaderBlock'
import RichTextBlock from './RichTextBlock'
import ImageBlock from './ImageBlock'
import GalleryBlock from './GalleryBlock'
import CtaBlock from './CtaBlock'
import DividerBlock from './DividerBlock'
import DisciplinesGridBlock from './DisciplinesGridBlock'
import InstructorsGridBlock from './InstructorsGridBlock'
import ScheduleBlock from './ScheduleBlock'
import PricingBlock from './PricingBlock'
import VenuesBlock from './VenuesBlock'
import NewsBlock from './NewsBlock'
import ContactBlock from './ContactBlock'
import AboutBlock from './AboutBlock'
import PhilosophyBlock from './PhilosophyBlock'
import FeaturedVideoBlock from './FeaturedVideoBlock'
import ServicesBlock from './ServicesBlock'

interface Props {
  blocks: PageBlock[]
}

const BlockRenderer: React.FC<Props> = ({ blocks }) => (
  <>
    {blocks.map((block) => {
      switch (block._type) {
        case 'heroBlock':
          return <HeroBlock key={block._key} {...block} />
        case 'pageHeaderBlock':
          return <PageHeaderBlock key={block._key} {...block} />
        case 'richTextBlock':
          return <RichTextBlock key={block._key} {...block} />
        case 'imageBlock':
          return <ImageBlock key={block._key} {...block} />
        case 'galleryBlock':
          return <GalleryBlock key={block._key} {...block} />
        case 'ctaBlock':
          return <CtaBlock key={block._key} {...block} />
        case 'dividerBlock':
          return <DividerBlock key={block._key} />
        case 'disciplinesGridBlock':
          return <DisciplinesGridBlock key={block._key} />
        case 'instructorsGridBlock':
          return <InstructorsGridBlock key={block._key} />
        case 'scheduleBlock':
          return <ScheduleBlock key={block._key} />
        case 'pricingBlock':
          return <PricingBlock key={block._key} />
        case 'venuesBlock':
          return <VenuesBlock key={block._key} />
        case 'newsBlock':
          return <NewsBlock key={block._key} />
        case 'contactBlock':
          return <ContactBlock key={block._key} />
        case 'aboutBlock':
          return <AboutBlock key={block._key} {...block} />
        case 'philosophyBlock':
          return <PhilosophyBlock key={block._key} {...block} />
        case 'featuredVideoBlock':
          return <FeaturedVideoBlock key={block._key} {...block} />
        case 'servicesBlock':
          return <ServicesBlock key={block._key} {...block} />
        default:
          return null
      }
    })}
  </>
)

export default BlockRenderer
