import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Info } from 'lucide-react'
import Link from 'next/link'
import { usePricing } from '../../hooks/useSanity'
import type { PricingRowContent } from '../../lib/fallbackContent'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const PricingCard = ({ label, price, detail, highlight, index }: PricingRowContent & { index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 10 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASING }}
      className={`group liquid-glass rounded-3xl p-7 flex items-center justify-between gap-6 relative overflow-hidden ${highlight ? 'ring-1 ring-[#6C5CA8]/25' : ''}`}
    >
      <div className="card-shimmer-layer" />

      {highlight && (
        <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-[#6C5CA8]/40 via-[#6C5CA8]/70 to-[#6C5CA8]/40 rounded-full" />
      )}

      <div className="flex-1 relative z-10">
        <div className="flex items-center gap-3 mb-1.5">
          <p className="text-[#18102E] text-lg font-medium">{label}</p>
          {highlight && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="bg-[#EDEAF6] rounded-full px-3 py-0.5 text-xs text-[#6C5CA8] font-medium"
            >
              Populaire
            </motion.span>
          )}
        </div>
        <p className="text-[#18102E]/40 text-sm">{detail}</p>
      </div>

      <div
        style={{ fontFamily: "'Instrument Serif', serif" }}
        className="text-[#6C5CA8] text-3xl md:text-4xl tracking-tight whitespace-nowrap relative z-10"
      >
        {price}
      </div>
    </motion.div>
  )
}

const PricingBlock: React.FC = () => {
  const infoRef = useRef(null)
  const infoInView = useInView(infoRef, { once: true, margin: '-60px' })
  const pricingData = usePricing()

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 mb-14">
          {pricingData.rows.map((row, index) => (
            <PricingCard key={index} {...row} index={index} />
          ))}
        </div>

        <motion.div
          ref={infoRef}
          initial={{ opacity: 0, y: 30 }}
          animate={infoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASING }}
          className="bg-[#F5F0EA] rounded-3xl p-8 md:p-10 flex gap-6"
        >
          <div className="shrink-0 mt-1">
            <Info size={22} className="text-[#18102E]/40" />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-[#18102E] text-lg font-medium">À savoir</h3>
            <ul className="flex flex-col gap-2.5">
              {pricingData.infoItems.map((info, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={infoInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.09, ease: EASING }}
                  className="flex items-start gap-3 text-[#18102E]/55 text-sm leading-relaxed"
                >
                  <Check size={14} className="shrink-0 mt-0.5 text-[#6C5CA8]/50" />
                  {info}
                </motion.li>
              ))}
            </ul>
            <div className="pt-2">
              <Link href="/contact" className="text-[#6C5CA8]/60 text-sm hover:text-[#6C5CA8] transition-colors underline underline-offset-4">
                Une question ? Contactez-nous →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingBlock
