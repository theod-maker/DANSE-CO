import React from 'react'
import PhilosophySection from '../asme/PhilosophySection'
import { fallbackHomepage } from '../../lib/fallbackContent'
import type { PhilosophyBlockType } from '../../lib/pageBuilderTypes'

const PhilosophyBlock: React.FC<PhilosophyBlockType> = ({
  title,
  imageUrl,
  block1Label,
  block1Text,
  block2Label,
  block2Text,
}) => (
  <PhilosophySection
    content={{
      ...fallbackHomepage,
      philosophyTitle: title,
      philosophyImageUrl: imageUrl,
      philosophyBlock1Label: block1Label ?? fallbackHomepage.philosophyBlock1Label,
      philosophyBlock1Text: block1Text ?? fallbackHomepage.philosophyBlock1Text,
      philosophyBlock2Label: block2Label ?? fallbackHomepage.philosophyBlock2Label,
      philosophyBlock2Text: block2Text ?? fallbackHomepage.philosophyBlock2Text,
    }}
  />
)

export default PhilosophyBlock
