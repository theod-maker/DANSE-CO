'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ScheduleGrid } from '@/src/components/planning/ScheduleGrid'
import RegistrationInfo from '@/src/components/planning/RegistrationInfo'
import AppNavbar from '@/src/components/layout/AppNavbar'
import AppFooter from '@/src/components/layout/AppFooter'
import BlockRenderer from '@/src/components/blocks/BlockRenderer'
import type { SiteInfoContent, PageTextsContent } from '@/src/lib/fallbackContent'
import type { PageContent } from '@/src/lib/pageBuilderTypes'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const AdhesionDownload = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASING }} className="mt-20">
      <p className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-4">Adhésion</p>
      <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-3xl md:text-4xl tracking-tight text-[#18102E] mb-4">
        Formulaire d'inscription
      </h2>
      <p className="text-[#18102E]/60 text-sm leading-relaxed max-w-xl mb-8">
        Téléchargez et remplissez le formulaire d'adhésion avant de vous présenter à l'une de nos permanences. Apportez-le accompagné des documents requis et du règlement de la cotisation.
      </p>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2, ease: EASING }} className="liquid-glass rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-xl">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#6C5CA8]/10 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C5CA8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <polyline points="9 15 12 18 15 15" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-[#18102E] text-sm font-medium mb-1">Formulaire d'adhésion Dans'&Co</p>
          <p className="text-[#18102E]/40 text-xs mb-4">PDF — À imprimer et apporter à la permanence</p>
          <a
            href="/formulaire-adhesion.pdf"
            download
            className="inline-flex items-center gap-2 bg-[#6C5CA8] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#5a4a96] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Télécharger
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

const formulas = [
  { label: 'Ouverture de bal de mariage', description: 'Une chorégraphie sur mesure pour un moment inoubliable le jour J.' },
  { label: 'Enterrement de vie de jeune fille & garçon', description: 'Un atelier danse original et festif pour célébrer ce moment unique.' },
  { label: 'Démonstration professionnelle', description: 'Prestation scénique pour vos événements privés ou professionnels en Loire-Atlantique.' },
]

const SpecialFormulas = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASING }} className="mt-20">
      <p className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-4">Formules spéciales</p>
      <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-3xl md:text-4xl tracking-tight text-[#18102E] mb-4">
        Au-delà des cours
      </h2>
      <p className="text-[#18102E]/60 text-sm leading-relaxed max-w-xl mb-10">
        Nous proposons des formules personnalisées pour vos événements en Loire-Atlantique. N'hésitez pas à nous contacter pour en savoir plus.
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {formulas.map((f, i) => (
          <motion.div key={f.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASING }} className="liquid-glass rounded-2xl p-6 flex flex-col gap-3">
            <p className="text-[#6C5CA8] text-xs uppercase tracking-widest font-medium">{f.label}</p>
            <p className="text-[#18102E]/60 text-sm leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.45, ease: EASING }} className="mt-8">
        <a href="/contact" className="inline-flex items-center gap-2 bg-[#6C5CA8] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#5a4a96] transition-colors">
          Nous contacter
        </a>
      </motion.div>
    </motion.div>
  )
}

interface Props {
  siteInfo: SiteInfoContent
  pageTexts: PageTextsContent
  pageData: PageContent | null
}

export default function PlanningContent({ siteInfo, pageTexts, pageData }: Props) {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  if (pageData) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <AppNavbar />
        <main className="pb-32"><BlockRenderer blocks={pageData.blocks} /></main>
        <AppFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />
      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative">
        <div className="absolute pointer-events-none [animation:orb-drift_15s_ease-in-out_infinite]" style={{ width: 460, height: 460, top: '-40px', right: '-120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,33,168,0.05) 0%, transparent 70%)', filter: 'blur(55px)' }} />
        <div ref={headerRef} className="mb-16 relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6">
            SAISON {siteInfo.season}
          </motion.p>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }} className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl text-[#18102E] mb-8">
            {['Planning', 'des', 'Cours'].map((word, i) => (
              <motion.span key={i} style={{ display: 'inline-block', marginRight: '0.3em' }} initial={{ opacity: 0, y: 36, rotateX: 14 }} animate={headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASING }} className={i === 2 ? 'text-[#6C5CA8] italic' : ''}>
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.45, ease: EASING }} className="text-[#18102E]/50 text-base md:text-lg leading-relaxed max-w-xl">
            {pageTexts.planningSubtitle}
          </motion.p>
        </div>
        <div className="relative z-10">
          <ScheduleGrid />
          <RegistrationInfo />
          <SpecialFormulas />
          <AdhesionDownload />
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
