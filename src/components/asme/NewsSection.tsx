'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Music, Star, Trophy, Heart, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { NewsContent } from '../../lib/fallbackContent'

interface Props {
  news: NewsContent[]
}

const EASING = [0.25, 0.46, 0.45, 0.94] as const
const ROTATIONS = [-1.8, 1.2, -0.7, 2.1, -1.4, 0.9, -2.0, 1.6]

const CARD_THEMES = [
  {
    bg: 'bg-gradient-to-br from-[#EDEAF6] via-[#E8E2F4] to-[#F5F0EA]',
    icon: <Music size={28} className="text-[#6C5CA8]/35" />,
    accent: <div className="absolute bottom-3 right-4 text-[64px] leading-none text-[#6C5CA8]/8 select-none" style={{ fontFamily: "'Instrument Serif', serif" }}>♪</div>,
  },
  {
    bg: 'bg-gradient-to-tr from-[#F5F0EA] via-[#EDE8F5] to-[#E4DFF2]',
    icon: <Star size={28} className="text-[#6C5CA8]/35" />,
    accent: <div className="absolute top-3 left-4 text-[80px] leading-none text-[#6C5CA8]/6 select-none" style={{ fontFamily: "'Instrument Serif', serif" }}>★</div>,
  },
  {
    bg: 'bg-gradient-to-bl from-[#EAE5F5] via-[#F0EBF8] to-[#FAF7F2]',
    icon: <Trophy size={28} className="text-[#6C5CA8]/35" />,
    accent: <div className="absolute bottom-2 right-6 w-16 h-16 rounded-full bg-[#6C5CA8]/5" />,
  },
  {
    bg: 'bg-gradient-to-tl from-[#F7F3ED] via-[#EDE9F6] to-[#E6E0F3]',
    icon: <Heart size={28} className="text-[#6C5CA8]/35" />,
    accent: <div className="absolute top-4 right-4 text-[60px] leading-none text-[#6C5CA8]/7 select-none" style={{ fontFamily: "'Instrument Serif', serif" }}>♡</div>,
  },
  {
    bg: 'bg-gradient-to-r from-[#EDEAF6] via-[#F2EEF9] to-[#F5F0EA]',
    icon: <Sparkles size={28} className="text-[#6C5CA8]/35" />,
    accent: (
      <div className="absolute bottom-3 left-4 flex gap-2">
        {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#6C5CA8]/15" />)}
      </div>
    ),
  },
] as const

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

function Pin() {
  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
      <div className="w-5 h-5 rounded-full bg-[#6C5CA8] shadow-md shadow-[#6C5CA8]/40 ring-2 ring-white/60 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white/40" />
      </div>
    </div>
  )
}

function PinnedCard({ item, index }: { item: NewsContent; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const rotation = ROTATIONS[index % ROTATIONS.length]
  const theme = CARD_THEMES[index % CARD_THEMES.length]

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: rotation * 2 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: rotation } : {}}
      whileHover={{ rotate: 0, y: -6, scale: 1.02, transition: { duration: 0.25, ease: 'easeOut' } }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASING }}
      className="relative cursor-default"
      style={{ transformOrigin: 'top center' }}
    >
      <Pin />
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(24,16,46,0.12)] border border-white/60">
        {item.imageUrl ? (
          <div className="relative h-44 overflow-hidden">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover object-top" />
          </div>
        ) : (
          <div className={`relative h-36 overflow-hidden flex items-center justify-center ${theme.bg}`}>
            {theme.accent}
            <div className="flex flex-col items-center gap-2 relative z-10">
              {theme.icon}
              <span style={{ fontFamily: "'Instrument Serif', serif" }} className="text-sm text-[#6C5CA8]/30 italic tracking-wide">Dans'&Co</span>
            </div>
          </div>
        )}
        <div className="p-5 flex flex-col gap-2">
          <p className="text-[#6C5CA8] text-xs tracking-widest uppercase font-ui">{formatDate(item.date)}</p>
          <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[#18102E] text-lg md:text-xl tracking-tight leading-snug">
            {item.title}
          </h2>
          <p className="text-[#18102E]/55 text-sm leading-relaxed">{item.excerpt}</p>
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-2 self-start text-xs text-[#6C5CA8] border border-[#6C5CA8]/30 rounded-full px-4 py-1.5 hover:bg-[#6C5CA8]/10 transition-colors">
              En savoir plus
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

const NewsSection: React.FC<Props> = ({ news }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  if (news.length === 0) return null

  return (
    <section ref={ref} className="bg-[#F5F0EA] py-16 md:py-24 px-6 relative overflow-hidden">
      <div
        className="absolute pointer-events-none [animation:orb-drift_16s_ease-in-out_infinite]"
        style={{ width: 400, height: 400, top: '-60px', right: '-100px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,33,168,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASING }} className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6">
              À LA UNE
            </motion.p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }} className="text-4xl md:text-6xl text-[#18102E] tracking-tight">
              {['Nos', 'Actualités'].map((word, i) => (
                <motion.span key={i} style={{ display: 'inline-block', marginRight: '0.3em' }} initial={{ opacity: 0, y: 28, rotateX: 12 }} animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASING }} className={i === 1 ? 'text-[#6C5CA8] italic' : ''}>
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
            <Link href="/actualites" className="inline-flex items-center gap-2 text-[#6C5CA8] text-sm font-medium hover:text-[#524490] transition-colors">
              Toutes les actualités <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        <div className="rounded-3xl p-8 md:p-12 pt-12" style={{ background: 'rgba(107,92,168,0.04)', border: '1px solid rgba(107,92,168,0.08)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 items-start">
            {[0, 1, 2].map(col => (
              <div key={col} className="flex flex-col gap-8 pt-4">
                {news.filter((_, i) => i % 3 === col).map((item, i) => (
                  <PinnedCard key={item._id} item={item} index={col + i * 3} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsSection
