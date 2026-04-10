import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AppNavbar from '../components/layout/AppNavbar'
import AppFooter from '../components/layout/AppFooter'
import { useInstructors } from '../hooks/useSanity'
import type { InstructorContent } from '../lib/fallbackContent'

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
      {/* Initiale décorative en fond */}
      <span
        style={{ fontFamily: "'Instrument Serif', serif" }}
        className="absolute -right-2 -bottom-4 text-[120px] leading-none text-[#6C5CA8]/5 pointer-events-none select-none italic transition-all duration-500 group-hover:text-[#6C5CA8]/10"
      >
        {name.charAt(0)}
      </span>

      {/* Shimmer */}
      <div className="card-shimmer-layer" />

      {photoUrl && (
        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 relative z-10">
          <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-start justify-between relative z-10">
        <div>
          <h3
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-[#18102E] text-3xl tracking-tight mb-1"
          >
            {name}
          </h3>
          <p className="text-[#6C5CA8] text-xs tracking-widest uppercase font-medium">
            {specialty}
          </p>
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

const Instructors = () => {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const team = useInstructors()

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />

      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative">

        {/* Orbe décoratif */}
        <div
          className="absolute pointer-events-none [animation:orb-drift-alt_14s_ease-in-out_infinite]"
          style={{
            width: 450,
            height: 450,
            top: '0',
            left: '-120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(107,33,168,0.05) 0%, transparent 70%)',
            filter: 'blur(55px)',
          }}
        />

        <div ref={headerRef} className="mb-20 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6"
          >
            L'ÉQUIPE
          </motion.p>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl text-[#18102E] mb-8"
          >
            {['Vos', 'Professeurs'].map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
                initial={{ opacity: 0, y: 36, rotateX: 14 }}
                animate={headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASING }}
                className={i === 1 ? 'text-[#6C5CA8] italic' : ''}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: EASING }}
            className="text-[#18102E]/50 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Une équipe de passionnés pour vous accompagner dans votre apprentissage, quel que soit votre niveau.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          {team.map((prof, index) => (
            <InstructorCard key={prof._id} {...prof} index={index} />
          ))}
        </div>
      </main>

      <AppFooter />
    </div>
  )
}

export default Instructors
