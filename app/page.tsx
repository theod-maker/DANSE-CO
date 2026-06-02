'use client'
export const dynamic = 'force-dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import AppNavbar from '@/src/components/layout/AppNavbar'
import AppFooter from '@/src/components/layout/AppFooter'
import NewsSection from '@/src/components/asme/NewsSection'
import BlockRenderer from '@/src/components/blocks/BlockRenderer'
import { useHomepage, useNews } from '@/src/hooks/useSanity'
import { usePage } from '@/src/hooks/usePage'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const AsmeIndex: React.FC = () => {
  const content = useHomepage()
  const news = useNews()
  const pageData = usePage('/')

  if (pageData) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <AppNavbar />
        <main className="pb-32">
          <BlockRenderer blocks={pageData.blocks} />
        </main>
        <AppFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />

      <section className="bg-[#F5F0EA] relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

        <div
          className="absolute rounded-full pointer-events-none [animation:orb-drift_12s_ease-in-out_infinite]"
          style={{
            width: 500,
            height: 500,
            top: '-80px',
            right: '-100px',
            background: 'radial-gradient(circle, rgba(107,33,168,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none [animation:orb-drift-alt_10s_ease-in-out_infinite]"
          style={{
            width: 350,
            height: 350,
            bottom: '80px',
            left: '-80px',
            background: 'radial-gradient(circle, rgba(219,39,119,0.05) 0%, transparent 70%)',
            filter: 'blur(50px)',
            willChange: 'transform',
          }}
        />

        <img
          src={content.heroImageUrl || 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=1600&q=85'}
          alt="Danse"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-15"
        />

        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#F5F0EA] to-transparent pointer-events-none z-10" />

        <div className="z-10 flex flex-col items-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs uppercase text-[#18102E] mb-8 tracking-[0.3em]"
          >
            École de Danse · Saint-Michel-Chef-Chef
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASING }}
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight mb-8 text-[#18102E]"
          >
            {content.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASING }}
            className="text-[#18102E] text-sm leading-relaxed max-w-sm mb-10"
          >
            {content.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: EASING }}
            className="flex items-center gap-4"
          >
            <Link
              href="/planning"
              className="cta-pulse bg-[#18102E] rounded-full px-8 py-3 text-sm font-medium text-white hover:bg-[#18102E]/80 transition-colors flex items-center gap-2"
            >
              Voir le planning <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="liquid-glass rounded-full px-6 py-3 text-sm font-medium text-[#18102E] hover:text-[#6C5CA8] transition-colors"
            >
              Nous contacter
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-[#18102E]/30 text-[10px] tracking-widest uppercase">Découvrir</span>
          <div className="scroll-indicator text-[#18102E]/40">
            <ChevronDown size={16} />
          </div>
        </motion.div>
      </section>

      <NewsSection news={news} />
      <AppFooter />
    </div>
  )
}

export default AsmeIndex
