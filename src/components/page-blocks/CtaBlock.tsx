'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import type { CtaBlockContent } from '@/src/lib/content/pageBlocks'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

export default function CtaBlock({ title, description, buttonLabel, buttonLink }: CtaBlockContent) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="mx-auto max-w-2xl px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASING }}
        className="liquid-glass rounded-3xl p-8 text-center"
      >
        {title && (
          <h3
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="mb-3 text-2xl tracking-tight text-[#18102E]"
          >
            {title}
          </h3>
        )}
        {description && <p className="mb-6 text-sm leading-relaxed text-[#18102E]/60">{description}</p>}
        <Link
          href={buttonLink}
          className="inline-flex items-center gap-2 rounded-full bg-[#6C5CA8] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#5a4a96]"
        >
          {buttonLabel}
        </Link>
      </motion.div>
    </div>
  )
}
