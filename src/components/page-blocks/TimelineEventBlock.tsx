'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { TimelineEventBlockContent } from '@/src/lib/content/pageBlocks'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

interface TimelineEventBlockProps extends TimelineEventBlockContent {
  index: number
}

export default function TimelineEventBlock({ year, label, text, imageUrls, index }: TimelineEventBlockProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0

  return (
    <div ref={ref}>
      <div className="md:hidden flex gap-5">
        <div className="flex flex-col items-center shrink-0">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1, ease: EASING }}
            className="w-3 h-3 rounded-full bg-[#6C5CA8] ring-4 ring-[#6C5CA8]/20 mt-1.5"
          />
          <div className="w-px flex-1 bg-gradient-to-b from-[#6C5CA8]/40 to-transparent mt-2" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
          className="flex-1 pb-6 flex flex-col gap-4"
        >
          <div className="liquid-glass rounded-3xl p-6">
            <p className="text-[#6C5CA8] text-xs uppercase tracking-[0.2em] font-medium mb-1">{year}</p>
            <h3 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[#18102E] text-xl italic mb-3">
              {label}
            </h3>
            <p className="text-[#18102E]/60 text-sm leading-relaxed">{text}</p>
          </div>
          <div className="flex flex-col gap-3">
            {imageUrls.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: EASING }}
                className="rounded-2xl overflow-hidden liquid-glass aspect-[4/3]"
              >
                <img src={src} alt="Archive Dans'&Co" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="hidden md:grid md:grid-cols-[1fr_48px_1fr] items-center gap-4">
        {isEven ? (
          <>
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
              className="liquid-glass rounded-3xl p-7 text-right"
            >
              <p className="text-[#6C5CA8] text-xs uppercase tracking-[0.2em] font-medium mb-1">{year}</p>
              <h3 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[#18102E] text-2xl italic mb-4">{label}</h3>
              <p className="text-[#18102E]/60 text-sm leading-relaxed">{text}</p>
            </motion.div>
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1, ease: EASING }}
                className="relative z-10 w-4 h-4 rounded-full bg-[#6C5CA8] ring-4 ring-[#6C5CA8]/20"
              />
            </div>
            <div className="flex flex-col gap-3 max-w-[220px]">
              {imageUrls.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, x: 28 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.25 + i * 0.1, ease: EASING }}
                  className="rounded-2xl overflow-hidden liquid-glass aspect-[4/3]"
                >
                  <img src={src} alt="Archive Dans'&Co" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-3 max-w-[220px] ml-auto">
              {imageUrls.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, x: -28 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.25 + i * 0.1, ease: EASING }}
                  className="rounded-2xl overflow-hidden liquid-glass aspect-[4/3]"
                >
                  <img src={src} alt="Archive Dans'&Co" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1, ease: EASING }}
                className="relative z-10 w-4 h-4 rounded-full bg-[#6C5CA8] ring-4 ring-[#6C5CA8]/20"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
              className="liquid-glass rounded-3xl p-7"
            >
              <p className="text-[#6C5CA8] text-xs uppercase tracking-[0.2em] font-medium mb-1">{year}</p>
              <h3 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[#18102E] text-2xl italic mb-4">{label}</h3>
              <p className="text-[#18102E]/60 text-sm leading-relaxed">{text}</p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
