'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AppNavbar from '@/src/components/layout/AppNavbar'
import AppFooter from '@/src/components/layout/AppFooter'
import BlockRenderer from '@/src/components/blocks/BlockRenderer'
import type { InstructorContent, PageTextsContent } from '@/src/lib/fallbackContent'
import type { PageContent } from '@/src/lib/pageBuilderTypes'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const CompetitionSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASING }} className="mt-20 relative z-10">
      <p className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-4">Compétition</p>
      <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-3xl md:text-4xl tracking-tight text-[#18102E] mb-4">Section Compétition</h2>
      <p className="text-[#18102E]/60 text-sm leading-relaxed max-w-2xl mb-6">
        Chez Dans'&Co, notre section compétition rassemble des couples de danseurs passionnés qui représentent fièrement le club dans toute la France. Nos danseurs s'entraînent quotidiennement avec rigueur et enthousiasme pour exceller dans différents styles de danse, en alliant technique, créativité et énergie.
      </p>
      <div className="liquid-glass rounded-2xl p-6 grid sm:grid-cols-2 gap-8 max-w-2xl">
        <div>
          <p className="text-[#6C5CA8] text-xs uppercase tracking-widest font-medium mb-3">Danses latines</p>
          <p className="text-[#18102E]/70 text-sm">Samba · Chachacha · Rumba · Paso doble · Jive</p>
        </div>
        <div>
          <p className="text-[#6C5CA8] text-xs uppercase tracking-widest font-medium mb-3">Danses standard</p>
          <p className="text-[#18102E]/70 text-sm">Valse lente · Tango · Valse viennoise · Slowfoxtrot · Quickstep</p>
        </div>
      </div>
    </motion.div>
  )
}

const InstructorCard = ({ name, specialty, bio, experience, photoUrl, index }: InstructorContent & { index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: index * 0.12, ease: EASING }} className="group liquid-glass rounded-3xl overflow-hidden flex flex-col md:flex-row relative">
      <div className="card-shimmer-layer" />
      <span style={{ fontFamily: "'Instrument Serif', serif" }} className="absolute -right-2 -bottom-4 text-[120px] leading-none text-[#6C5CA8]/5 pointer-events-none select-none italic transition-all duration-500 group-hover:text-[#6C5CA8]/10">{name.charAt(0)}</span>
      {photoUrl && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15, ease: EASING }} className="md:w-64 shrink-0 overflow-hidden">
          <img src={photoUrl} alt={name} className="w-full h-56 md:h-full object-cover" />
        </motion.div>
      )}
      <div className="p-6 md:p-8 flex flex-col gap-5 flex-1 relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h3 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[#18102E] text-2xl md:text-3xl tracking-tight mb-1">{name}</h3>
            {specialty && <p className="text-[#6C5CA8] text-xs tracking-widest uppercase font-medium">{specialty}</p>}
          </div>
          {experience && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.25 }} className="bg-[#EDEAF6] rounded-full px-4 py-1.5">
              <span className="text-[#6C5CA8] text-xs font-medium">{experience}</span>
            </motion.div>
          )}
        </div>
        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: EASING }} className="w-full h-px bg-[#18102E]/8 origin-left" />
        <p className="text-[#18102E]/60 text-sm leading-relaxed">{bio}</p>
      </div>
    </motion.div>
  )
}

interface Props {
  team: InstructorContent[]
  pageTexts: PageTextsContent
  pageData: PageContent | null
}

export default function InstructorsContent({ team, pageTexts, pageData }: Props) {
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
        <div className="absolute pointer-events-none [animation:orb-drift-alt_14s_ease-in-out_infinite]" style={{ width: 450, height: 450, top: '0', left: '-120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,33,168,0.05) 0%, transparent 70%)', filter: 'blur(55px)' }} />
        <div ref={headerRef} className="mb-20 relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6">L'ÉQUIPE</motion.p>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }} className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl text-[#18102E] mb-8">
            {['Votre', 'Professeur'].map((word, i) => (
              <motion.span key={i} style={{ display: 'inline-block', marginRight: '0.3em' }} initial={{ opacity: 0, y: 36, rotateX: 14 }} animate={headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASING }} className={i === 1 ? 'text-[#6C5CA8] italic' : ''}>{word}</motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35, ease: EASING }} className="text-[#18102E]/50 text-base md:text-lg leading-relaxed max-w-xl">
            {pageTexts.instructorsSubtitle}
          </motion.p>
        </div>
        <div className={`grid gap-6 relative z-10 ${team.length === 1 ? 'max-w-3xl' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {team.map((prof, index) => <InstructorCard key={prof._id} {...prof} index={index} />)}
        </div>
        <CompetitionSection />
      </main>
      <AppFooter />
    </div>
  )
}
