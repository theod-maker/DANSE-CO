import React from 'react'
import ServicesSection from '../asme/ServicesSection'
import { fallbackHomepage } from '../../lib/fallbackContent'
import type { ServicesBlockType } from '../../lib/pageBuilderTypes'

const ServicesBlock: React.FC<ServicesBlockType> = ({
  sectionTitle,
  sectionSubtitle,
  card1Description,
  card1ImageUrl,
  card2Description,
  card2ImageUrl,
}) => (
  <ServicesSection
    content={{
      ...fallbackHomepage,
      servicesSectionTitle: sectionTitle,
      servicesSectionSubtitle: sectionSubtitle ?? fallbackHomepage.servicesSectionSubtitle,
      servicesCard1Description: card1Description ?? fallbackHomepage.servicesCard1Description,
      servicesCard1ImageUrl: card1ImageUrl,
      servicesCard2Description: card2Description ?? fallbackHomepage.servicesCard2Description,
      servicesCard2ImageUrl: card2ImageUrl,
    }}
  />
)

export default ServicesBlock
