import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { HomepageContent } from '../../lib/fallbackContent'

interface Props {
  content: HomepageContent
}

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const AboutSection: React.FC<Props> = ({ content }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const words = content.aboutTitle.split(' ')

  return (
    <section ref={ref} className="bg-[#FDFBF7] pt-32 md:pt-44 pb-10 md:pb-14 px-6 relative overflow-hidden">

      {/* Orbe décoratif */}
      <div
        className="absolute pointer-events-none [animation:orb-drift_14s_ease-in-out_infinite]"
        style={{
          width: 600,
          height: 600,
          top: '-100px',
          right: '-200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,33,168,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Ligne décorative animée */}
      {isInView && (
        <div className="absolute top-32 left-6 hidden lg:block">
          <div
            className="h-px bg-[#6C5CA8]/20 animated-line"
            style={{ width: 80, transformOrigin: 'left center' }}
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[#18102E]/40 text-sm tracking-widest uppercase mb-6"
        >
          À PROPOS
        </motion.p>

        <h2
          className="text-[#18102E] text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight max-w-5xl"
          style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
              initial={{ opacity: 0, y: 32, rotateX: 14 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.07,
                ease: EASING,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </div>
    </section>
  )
}

export default AboutSection
