'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { GalleryBlockContent } from '@/src/lib/content/pageBlocks'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

export default function GalleryBlock({ title, imageUrls, columns }: GalleryBlockContent) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const gridCols = columns === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'

  return (
    <div ref={ref} className="mx-auto max-w-6xl px-6 py-10">
      {title && (
        <p className="mb-6 text-xs uppercase tracking-widest text-[#18102E]/40">{title}</p>
      )}
      <div className={`grid gap-4 ${gridCols}`}>
        {imageUrls.map((url, index) => (
          <motion.div
            key={url}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08, ease: EASING }}
            className="aspect-[4/3] overflow-hidden rounded-2xl liquid-glass"
          >
            <img src={url} alt="" className="h-full w-full object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
