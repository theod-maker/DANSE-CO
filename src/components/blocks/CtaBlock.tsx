import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import type { CtaBlockType } from '../../lib/pageBuilderTypes'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const CtaBlock: React.FC<CtaBlockType> = ({ title, description, buttonLabel, buttonLink }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="max-w-6xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASING }}
        className="liquid-glass rounded-3xl p-8 md:p-12 text-center"
      >
        {title && (
          <h2
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-3xl md:text-4xl text-[#18102E] tracking-tight mb-4"
          >
            {title}
          </h2>
        )}
        {description && (
          <p className="text-[#18102E]/55 text-base leading-relaxed max-w-lg mx-auto mb-8">
            {description}
          </p>
        )}
        <Link
          href={buttonLink}
          className="inline-block bg-[#6C5CA8] rounded-full px-8 py-3 text-sm font-medium text-white hover:bg-[#524490] transition-colors"
        >
          {buttonLabel}
        </Link>
      </motion.div>
    </div>
  )
}

export default CtaBlock
