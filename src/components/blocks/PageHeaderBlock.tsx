import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { PageHeaderBlockType } from '../../lib/pageBuilderTypes'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const PageHeaderBlock: React.FC<PageHeaderBlockType> = ({ eyebrow, title, titleHighlight, subtitle }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const words = title.split(' ')

  return (
    <div ref={ref} className="max-w-6xl mx-auto px-6 pt-40 pb-16">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6"
        >
          {eyebrow}
        </motion.p>
      )}

      <h1
        style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
        className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl text-[#18102E] mb-8"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', marginRight: '0.3em' }}
            initial={{ opacity: 0, y: 36, rotateX: 14 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASING }}
            className={titleHighlight && word === titleHighlight ? 'text-[#6C5CA8] italic' : ''}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: EASING }}
          className="text-[#18102E]/50 text-base md:text-lg leading-relaxed max-w-xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default PageHeaderBlock
