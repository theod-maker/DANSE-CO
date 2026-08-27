'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ImageBlockContent } from '@/src/lib/content/pageBlocks'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

export default function ImageBlock({ imageUrl, caption, fullWidth }: ImageBlockContent) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const containerClass = fullWidth ? 'max-w-6xl' : 'max-w-2xl'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASING }}
      className={`mx-auto px-6 py-10 ${containerClass}`}
    >
      <div className="overflow-hidden rounded-3xl liquid-glass">
        <img src={imageUrl} alt={caption ?? ''} className="h-auto w-full object-cover" />
      </div>
      {caption && <p className="mt-3 text-center text-xs text-[#18102E]/40">{caption}</p>}
    </motion.div>
  )
}
