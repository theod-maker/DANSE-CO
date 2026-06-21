'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AppNavbar from '@/src/components/layout/AppNavbar'
import AppFooter from '@/src/components/layout/AppFooter'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const events = [
  {
    year: '2016',
    label: 'Les débuts',
    text: "Créé par des amis passionnés par la danse, Dans&CO ouvre ses portes à Besné. Un lieu d'apprentissage de la danse à deux, chaleureux et ouvert à tous.",
    image: '/images/histoire/histoire-1.avif',
  },
  {
    year: '2016–2020',
    label: "L'essor",
    text: "Danses de salon, west coast swing, salsa cubaine, rock'n roll... Stages, soirées de Saint-Sylvestre, formation de compétiteurs sur le territoire national, cours de hip hop et modern jazz.",
    image: '/images/histoire/histoire-2.avif',
  },
  {
    year: '2016–2020',
    label: "Les événements",
    text: "Les membres sont sur tous les fronts pour faire prospérer le club. Compétitions, galas et soirées rythment la vie de Dans&CO.",
    image: '/images/histoire/histoire-3.avif',
  },
  {
    year: '2020',
    label: 'Une pause',
    text: "Après de nombreuses péripéties, le club traverse une période difficile. Mais la passion, elle, ne s'arrête jamais.",
    image: '/images/histoire/histoire-4.avif',
  },
  {
    year: '2024',
    label: 'Un nouveau départ',
    text: "Le choix est fait de déplacer le club à Saint-Michel-Chef-Chef. Repartir de zéro, entamer le même périple, proche de l'océan.",
    image: '/images/histoire/histoire-5.avif',
  },
]

function HistoryCard({ event, index }: { event: typeof events[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASING }}
      className="liquid-glass rounded-3xl overflow-hidden flex flex-col group"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image}
          alt={event.label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-6 flex flex-col gap-3">
        <p className="text-[#6C5CA8] text-xs tracking-widest uppercase font-ui">{event.year}</p>
        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-[#18102E] text-xl md:text-2xl tracking-tight leading-snug"
        >
          {event.label}
        </h2>
        <p className="text-[#18102E]/60 text-sm leading-relaxed">{event.text}</p>
      </div>
    </motion.article>
  )
}

export default function HistoireContent() {
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
            Notre Histoire
          </motion.p>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl text-[#18102E] mb-8"
          >
            {['Notre', 'Histoire'].map((word, i) => (
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
            De Besné à Saint-Michel-Chef-Chef, une passion qui traverse le temps.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {events.map((event, i) => (
            <HistoryCard key={`${event.year}-${event.label}`} event={event} index={i} />
          ))}
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
