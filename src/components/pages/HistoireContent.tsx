'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AppNavbar from '@/src/components/layout/AppNavbar'
import AppFooter from '@/src/components/layout/AppFooter'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

export default function HistoireContent() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />
      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative">
        <div className="absolute pointer-events-none [animation:orb-drift-alt_14s_ease-in-out_infinite]" style={{ width: 450, height: 450, top: '0', left: '-120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,33,168,0.05) 0%, transparent 70%)', filter: 'blur(55px)' }} />
        <div ref={headerRef} className="mb-20 relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6">L'Histoire</motion.p>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }} className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl text-[#18102E] mb-8">
            {['Notre', 'Histoire'].map((word, i) => (
              <motion.span key={i} style={{ display: 'inline-block', marginRight: '0.3em' }} initial={{ opacity: 0, y: 36, rotateX: 14 }} animate={headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASING }} className={i === 1 ? 'text-[#6C5CA8] italic' : ''}>{word}</motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35, ease: EASING }} className="text-[#18102E]/50 text-base md:text-lg leading-relaxed max-w-xl">
            Cette page est en cours de rédaction. Revenez bientôt pour découvrir l'histoire de Danse&nbsp;&amp;&nbsp;CO.
          </motion.p>
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
