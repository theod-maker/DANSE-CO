import React from 'react'
import ScheduleGrid from '../planning/ScheduleGrid'
import RegistrationInfo from '../planning/RegistrationInfo'

const ScheduleBlock: React.FC = () => (
  <section className="py-20 md:py-28 px-6">
    <div className="max-w-6xl mx-auto">
      <ScheduleGrid />
      <RegistrationInfo />
    </div>
  </section>
)

export default ScheduleBlock
