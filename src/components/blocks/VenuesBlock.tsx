import React from 'react'
import VenueCard from '../locations/VenueCard'
import { fallbackDisciplines, fallbackVenues, fallbackSiteInfo, fallbackNews, fallbackInstructors, fallbackPricing } from '../../lib/fallbackContent'

const VenuesBlock: React.FC = () => {
  const venues = fallbackVenues

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {venues.map((venue, index) => (
          <VenueCard key={venue._id} {...venue} index={index} />
        ))}
      </div>
    </section>
  )
}

export default VenuesBlock
