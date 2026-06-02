import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { HomepageContent } from '../../lib/fallbackContent'

interface Props {
  content: HomepageContent
}

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const FeaturedVideoSection: React.FC<Props> = ({ content }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-[#FDFBF7] pt-6 md:pt-10 pb-20 md:pb-32 px-6 relative overflow-hidden">

      {/* Orbe haut-droite */}
      <div
        className="absolute pointer-events-none [animation:orb-drift_18s_ease-in-out_infinite]"
        style={{
          width: 350,
          height: 350,
          top: '-60px',
          right: '5%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(219,39,119,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.95, ease: EASING }}
          className="relative rounded-3xl overflow-hidden aspect-video group"
        >
          <img
            src={content.featuredImageUrl || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1400&q=85'}
            alt="Danse de salon"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#18102E]/65 via-transparent to-transparent" />

          <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 lg:p-10 flex flex-col md:flex-row items-end justify-between gap-3 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: EASING }}
              className="liquid-glass rounded-2xl p-4 md:p-6 lg:p-8 max-w-md"
            >
              <p className="text-[#18102E]/50 text-xs tracking-widest uppercase mb-3">
                NOTRE APPROCHE
              </p>
              <p className="text-[#18102E] text-sm md:text-base leading-relaxed">
                {content.featuredVideoDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: EASING }}
            >
              <Link
                href="/disciplines"
                className="group/btn liquid-glass rounded-full px-8 py-3 text-[#18102E] text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all"
              >
                Explorer
                <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedVideoSection
