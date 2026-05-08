import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useInstructors } from '../../hooks/useSanity'
import type { InstructorContent } from '../../lib/fallbackContent'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const InstructorCard = ({ name, specialty, bio, experience, photoUrl, index }: InstructorContent & { index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const fromLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -40 : 40, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: EASING }}
      className="group liquid-glass rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden"
    >
      <span
        style={{ fontFamily: "'Instrument Serif', serif" }}
        className="absolute -right-2 -bottom-4 text-[120px] leading-none text-[#6C5CA8]/5 pointer-events-none select-none italic transition-all duration-500 group-hover:text-[#6C5CA8]/10"
      >
        {name.charAt(0)}
      </span>

      <div className="card-shimmer-layer" />

      {photoUrl && (
        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 relative z-10">
          <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-start justify-between relative z-10">
        <div>
          <h3 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[#18102E] text-3xl tracking-tight mb-1">
            {name}
          </h3>
          <p className="text-[#6C5CA8] text-xs tracking-widest uppercase font-medium">{specialty}</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 + index * 0.12 }}
          className="bg-[#EDEAF6] rounded-full px-4 py-1.5"
        >
          <span className="text-[#6C5CA8] text-xs font-medium">{experience}</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 + index * 0.12, ease: EASING }}
        className="w-full h-px bg-[#18102E]/8 origin-left"
      />

      <p className="text-[#18102E]/60 text-sm leading-relaxed flex-1 relative z-10">{bio}</p>
    </motion.div>
  )
}

const InstructorsGridBlock: React.FC = () => {
  const team = useInstructors()

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((prof, index) => (
            <InstructorCard key={prof._id} {...prof} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default InstructorsGridBlock
