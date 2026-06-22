'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AppNavbar from '@/src/components/layout/AppNavbar'
import AppFooter from '@/src/components/layout/AppFooter'
import type { NewsContent } from '@/src/lib/fallbackContent'

const EASING = [0.25, 0.46, 0.45, 0.94] as const
const UNSPLASH_FALLBACK = 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80'

const ROTATIONS = [-1.8, 1.2, -0.7, 2.1, -1.4, 0.9, -2.0, 1.6]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

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
        {item.imageUrl && (
          <div className="relative h-44 overflow-hidden">
            <img
              src={item.imageUrl ?? UNSPLASH_FALLBACK}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-5 flex flex-col gap-2">
          <p className="text-[#6C5CA8] text-xs tracking-widest uppercase font-ui">{formatDate(item.date)}</p>
          <h2
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-[#18102E] text-lg md:text-xl tracking-tight leading-snug"
          >
            {item.title}
          </h2>
          <p className="text-[#18102E]/55 text-sm leading-relaxed">{item.excerpt}</p>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 self-start text-xs text-[#6C5CA8] border border-[#6C5CA8]/30 rounded-full px-4 py-1.5 hover:bg-[#6C5CA8]/10 transition-colors"
            >
              En savoir plus
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASING }}
      className="liquid-glass rounded-3xl p-12 text-center"
    >
      <p style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[#18102E]/40 text-2xl italic mb-3">
        Les prochaines actualités arrivent bientôt
      </p>
      <p className="text-[#18102E]/30 text-sm">Stages, compétitions et événements du club seront affichés ici.</p>
    </motion.div>
  )
}

interface ActualitesContentProps {
  news: NewsContent[]
}

export default function ActualitesContent({ news }: ActualitesContentProps) {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />
      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative">
        <div
          className="absolute pointer-events-none [animation:orb-drift-alt_14s_ease-in-out_infinite]"
          style={{ width: 450, height: 450, top: '0', left: '-120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,33,168,0.05) 0%, transparent 70%)', filter: 'blur(55px)' }}
        />

        <div ref={headerRef} className="mb-16 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6"
          >
            Actualités
          </motion.p>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl text-[#18102E] mb-8"
          >
            {['Nos', 'Actualités'].map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
                initial={{ opacity: 0, y: 36, rotateX: 14 }}
                animate={headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASING }}
                className={i === 1 ? 'text-[#6C5CA8] italic' : ''}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: EASING }}
            className="text-[#18102E]/50 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Stages, compétitions et événements de votre studio de danse.
          </motion.p>
        </div>

        <div className="relative z-10 rounded-3xl p-8 md:p-12 pt-12" style={{ background: 'rgba(107,92,168,0.04)', border: '1px solid rgba(107,92,168,0.08)' }}>
          {news.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 items-start">
              {[0, 1, 2].map(col => (
                <div key={col} className="flex flex-col gap-8 pt-4">
                  {news.filter((_, i) => i % 3 === col).map((item, i) => (
                    <PinnedCard key={item._id} item={item} index={col + i * 3} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
