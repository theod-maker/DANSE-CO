import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { HomepageContent } from '../../lib/fallbackContent'

interface Props {
  content: HomepageContent
}

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const PhilosophySection: React.FC<Props> = ({ content }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const titleWords = content.philosophyTitle.split(' ')

  return (
    <section ref={ref} className="bg-[#F5F0EA] py-28 md:py-40 px-6 relative overflow-hidden">

      {/* Orbe ambiance gauche */}
      <div
        className="absolute pointer-events-none [animation:orb-drift-alt_16s_ease-in-out_infinite]"
        style={{
          width: 500,
          height: 500,
          bottom: '-80px',
          left: '-150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Orbe ambiance droite */}
      <div
        className="absolute pointer-events-none [animation:orb-drift_18s_ease-in-out_infinite]"
        style={{
          width: 350,
          height: 350,
          top: '20%',
          right: '-80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(219,39,119,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#18102E] tracking-tight mb-16 md:mb-24"
          style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
              initial={{ opacity: 0, y: 36, rotateX: 16 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.85, delay: i * 0.09, ease: EASING }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <div className="grid md:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: EASING }}
            className="rounded-3xl overflow-hidden aspect-[4/3]"
          >
            <img
              src={content.philosophyImageUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&q=85'}
              alt="Cours de danse"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: EASING }}
            className="flex flex-col justify-center gap-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: EASING }}
            >
              <p className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-4">
                {content.philosophyBlock1Label}
              </p>
              <p className="text-[#18102E]/65 text-base md:text-lg leading-relaxed">
                {content.philosophyBlock1Text}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.65, ease: EASING }}
              className="w-full h-px bg-[#18102E]/10 origin-left"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.75, ease: EASING }}
            >
              <p className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-4">
                {content.philosophyBlock2Label}
              </p>
              <p className="text-[#18102E]/65 text-base md:text-lg leading-relaxed">
                {content.philosophyBlock2Text}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PhilosophySection
