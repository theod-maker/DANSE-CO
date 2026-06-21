'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AppNavbar from '@/src/components/layout/AppNavbar'
import AppFooter from '@/src/components/layout/AppFooter'
import type { NewsContent } from '@/src/lib/fallbackContent'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const UNSPLASH_FALLBACK = 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function NewsCard({ item, index }: { item: NewsContent; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASING }}
      className="liquid-glass rounded-3xl overflow-hidden flex flex-col group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.imageUrl ?? UNSPLASH_FALLBACK}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-6 flex flex-col flex-1 gap-3">
        <p className="text-[#6C5CA8] text-xs tracking-widest uppercase font-ui">
          {formatDate(item.date)}
        </p>
        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-[#18102E] text-xl md:text-2xl tracking-tight leading-snug"
        >
          {item.title}
        </h2>
        <p className="text-[#18102E]/60 text-sm leading-relaxed flex-1">{item.excerpt}</p>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 self-start text-xs text-[#6C5CA8] border border-[#6C5CA8]/30 rounded-full px-4 py-2 hover:bg-[#6C5CA8]/10 transition-colors"
          >
            En savoir plus
          </a>
        )}
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
      className="liquid-glass rounded-3xl p-12 text-center col-span-full"
    >
      <p
        style={{ fontFamily: "'Instrument Serif', serif" }}
        className="text-[#18102E]/40 text-2xl italic mb-3"
      >
        Les prochaines actualités arrivent bientôt
      </p>
      <p className="text-[#18102E]/30 text-sm">
        Stages, compétitions et événements du club seront affichés ici.
      </p>
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
        <div ref={headerRef} className="mb-20 relative z-10">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {news.length === 0 ? (
            <EmptyState />
          ) : (
            news.map((item, i) => <NewsCard key={item._id} item={item} index={i} />)
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
