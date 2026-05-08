import React from 'react'
import AboutSection from '../asme/AboutSection'
import { fallbackHomepage } from '../../lib/fallbackContent'
import type { AboutBlockType } from '../../lib/pageBuilderTypes'

const AboutBlock: React.FC<AboutBlockType> = ({ title }) => (
  <AboutSection content={{ ...fallbackHomepage, aboutTitle: title }} />
)

export default AboutBlock
