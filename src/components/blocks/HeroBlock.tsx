import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { HeroBlockType } from '../../lib/pageBuilderTypes'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const AnimatedWords = ({ text, delayStart = 0 }: { text: string; delayStart?: number }) => {
  const words = text.split(' ')
  return (
    <span style={{ perspective: '1000px', display: 'block' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={{ opacity: 0, y: 28, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.75, delay: delayStart + i * 0.08, ease: EASING }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

const HeroBlock: React.FC<HeroBlockType> = ({ tagline, title, description, imageUrl, ctaLabel, ctaLink }) => {
  const [_emailValue, setEmailValue] = useState('')

  return (
    <section className="bg-[#F5F0EA] relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute rounded-full pointer-events-none [animation:orb-drift_12s_ease-in-out_infinite]"
        style={{
          width: 520,
          height: 520,
          top: '-80px',
          right: '-100px',
          background: 'radial-gradient(circle, rgba(107,33,168,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.65,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none [animation:orb-drift-alt_10s_ease-in-out_infinite]"
        style={{
          width: 380,
          height: 380,
          bottom: '80px',
          left: '-80px',
          background: 'radial-gradient(circle, rgba(219,39,119,0.06) 0%, transparent 70%)',
          filter: 'blur(70px)',
          opacity: 0.65,
        }}
      />

      <img
        src={imageUrl || 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=1600&q=85'}
        alt="Danse"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-15"
      />

      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#F5F0EA] to-transparent pointer-events-none z-10" />

      <div className="z-10 flex flex-col items-center text-center px-6 -translate-y-8">
        {tagline && (
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 0.4, letterSpacing: '0.3em' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xs uppercase text-[#18102E] mb-8 tracking-[0.3em]"
          >
            {tagline}
          </motion.p>
        )}

        <h1
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight mb-8 text-[#18102E]"
        >
          <AnimatedWords text={title} delayStart={0.3} />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASING }}
          className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center w-full max-w-md mb-6"
        >
          <input
            type="email"
            placeholder="Votre email"
            onChange={(e) => setEmailValue(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-[#18102E] placeholder:text-[#18102E]/40 text-sm"
          />
          <Link href="/contact" className="bg-[#6C5CA8] rounded-full p-2 text-white hover:bg-[#524490] transition-colors">
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: EASING }}
            className="text-[#18102E] text-sm leading-relaxed max-w-sm mb-8"
          >
            {description}
          </motion.p>
        )}

        {ctaLabel && ctaLink && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease: EASING }}
          >
            <Link
              href={ctaLink}
              className="cta-pulse bg-[#18102E] rounded-full px-8 py-3 text-sm font-medium text-white hover:bg-[#18102E]/80 transition-colors"
            >
              {ctaLabel}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default HeroBlock
