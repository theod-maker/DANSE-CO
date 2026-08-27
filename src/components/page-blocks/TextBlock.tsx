'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { TextBlockContent } from '@/src/lib/content/pageBlocks'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

export default function TextBlock({ body }: TextBlockContent) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const paragraphs = body.split(/\n\s*\n/).filter((p) => p.trim().length > 0)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASING }}
      className="mx-auto max-w-2xl px-6 py-10"
    >
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4 text-sm leading-relaxed text-[#18102E]/60 last:mb-0">
          {paragraph}
        </p>
      ))}
    </motion.div>
  )
}
