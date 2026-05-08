import React from 'react'
import VenueCard from '../locations/VenueCard'
import { useVenues } from '../../hooks/useSanity'

const VenuesBlock: React.FC = () => {
  const venues = useVenues()

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
