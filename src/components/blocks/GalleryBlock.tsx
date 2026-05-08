import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { GalleryBlockType } from '../../lib/pageBuilderTypes'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const GalleryBlock: React.FC<GalleryBlockType> = ({ title, imageUrls, columns = 3 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const gridCols = columns === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'

  return (
    <div ref={ref} className="max-w-6xl mx-auto px-6 py-10">
      {title && (
        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-3xl text-[#18102E] tracking-tight mb-8"
        >
          {title}
        </h2>
      )}
      <div className={`grid ${gridCols} gap-3`}>
        {imageUrls.map((url, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASING }}
            className="aspect-square overflow-hidden rounded-2xl group"
          >
            <img
              src={url}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default GalleryBlock
