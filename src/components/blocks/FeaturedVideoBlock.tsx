import React from 'react'
import FeaturedVideoSection from '../asme/FeaturedVideoSection'
import { fallbackHomepage } from '../../lib/fallbackContent'
import type { FeaturedVideoBlockType } from '../../lib/pageBuilderTypes'

const FeaturedVideoBlock: React.FC<FeaturedVideoBlockType> = ({ description, imageUrl }) => (
  <FeaturedVideoSection
    content={{
      ...fallbackHomepage,
      featuredVideoDescription: description ?? fallbackHomepage.featuredVideoDescription,
      featuredImageUrl: imageUrl,
    }}
  />
)

export default FeaturedVideoBlock
