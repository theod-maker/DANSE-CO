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
    text: "Créé par des amis passionnés par la danse, Dans'&Co ouvre ses portes à Besné. Un lieu d'apprentissage de la danse à deux, chaleureux et ouvert à tous.",
    images: ['/images/histoire/histoire-1.avif'],
  },
  {
    year: '2016–2020',
    label: "L'essor",
    text: "Danses de salon, west coast swing, salsa cubaine, rock'n roll... Stages, soirées de Saint-Sylvestre, formation de compétiteurs sur le territoire national, cours de hip hop et modern jazz. Les membres sont sur tous les fronts pour faire prospérer le club.",
    images: ['/images/histoire/histoire-2.avif', '/images/histoire/histoire-3.avif'],
  },
  {
    year: '2020',
    label: 'Une pause',
    text: "Le Covid passe par là, apportant son lot de péripéties. L'activité cesse quelque temps, mais la passion, elle, ne s'arrête jamais.",
    images: ['/images/histoire/histoire-4.avif'],
  },
  {
    year: '2023',
    label: 'Un nouveau départ',
    text: "Le choix est fait de déplacer le club à Saint-Michel-Chef-Chef. Repartir de zéro, entamer le même périple, proche de l'océan.",
    images: ['/images/histoire/histoire-5.avif'],
  },
]

type Event = typeof events[0] & { index: number }

const TimelineEvent = ({ year, label, text, images, index }: Event) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0

  return (
    <div ref={ref}>
      {/* Mobile: timeline verticale à gauche */}
      <div className="md:hidden flex gap-5">
        <div className="flex flex-col items-center shrink-0">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1, ease: EASING }}
            className="w-3 h-3 rounded-full bg-[#6C5CA8] ring-4 ring-[#6C5CA8]/20 mt-1.5"
          />
          <div className="w-px flex-1 bg-gradient-to-b from-[#6C5CA8]/40 to-transparent mt-2" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
          className="flex-1 pb-6 flex flex-col gap-4"
        >
          <div className="liquid-glass rounded-3xl p-6">
            <p className="text-[#6C5CA8] text-xs uppercase tracking-[0.2em] font-medium mb-1">{year}</p>
            <h3 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[#18102E] text-xl italic mb-3">
              {label}
            </h3>
            <p className="text-[#18102E]/60 text-sm leading-relaxed">{text}</p>
          </div>
          <div className="flex flex-col gap-3">
            {images.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: EASING }}
                className="rounded-2xl overflow-hidden liquid-glass aspect-[4/3]"
              >
                <img src={src} alt="Archive Dans'&Co" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Desktop: timeline alternée au centre */}
      <div className="hidden md:grid md:grid-cols-[1fr_48px_1fr] items-center gap-4">
        {isEven ? (
          <>
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
              className="liquid-glass rounded-3xl p-7 text-right"
            >
              <p className="text-[#6C5CA8] text-xs uppercase tracking-[0.2em] font-medium mb-1">{year}</p>
              <h3 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[#18102E] text-2xl italic mb-4">{label}</h3>
              <p className="text-[#18102E]/60 text-sm leading-relaxed">{text}</p>
            </motion.div>
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1, ease: EASING }}
                className="relative z-10 w-4 h-4 rounded-full bg-[#6C5CA8] ring-4 ring-[#6C5CA8]/20"
              />
            </div>
            <div className="flex flex-col gap-3 max-w-[220px]">
              {images.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, x: 28 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.25 + i * 0.1, ease: EASING }}
                  className="rounded-2xl overflow-hidden liquid-glass aspect-[4/3]"
                >
                  <img src={src} alt="Archive Dans'&Co" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-3 max-w-[220px] ml-auto">
              {images.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, x: -28 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.25 + i * 0.1, ease: EASING }}
                  className="rounded-2xl overflow-hidden liquid-glass aspect-[4/3]"
                >
                  <img src={src} alt="Archive Dans'&Co" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1, ease: EASING }}
                className="relative z-10 w-4 h-4 rounded-full bg-[#6C5CA8] ring-4 ring-[#6C5CA8]/20"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
              className="liquid-glass rounded-3xl p-7"
            >
              <p className="text-[#6C5CA8] text-xs uppercase tracking-[0.2em] font-medium mb-1">{year}</p>
              <h3 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[#18102E] text-2xl italic mb-4">{label}</h3>
              <p className="text-[#18102E]/60 text-sm leading-relaxed">{text}</p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

export default function HistoireContent() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />
      <main className="max-w-5xl mx-auto px-6 pt-40 pb-32 relative">
        <div
          className="absolute pointer-events-none [animation:orb-drift-alt_14s_ease-in-out_infinite]"
          style={{ width: 450, height: 450, top: '0', left: '-120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,33,168,0.05) 0%, transparent 70%)', filter: 'blur(55px)' }}
        />

        <div ref={headerRef} className="mb-24 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6"
          >
            L'Histoire
          </motion.p>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
            className="text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05] text-[#18102E] mb-8"
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
            className="text-[#18102E]/50 text-base leading-relaxed max-w-sm mx-auto"
          >
            De Besné à Saint-Michel-Chef-Chef, une passion qui traverse le temps.
          </motion.p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[#6C5CA8]/30 via-[#6C5CA8]/15 to-transparent" />
          <div className="flex flex-col gap-16 relative z-10">
            {events.map((event, index) => (
              <TimelineEvent key={event.year} {...event} index={index} />
            ))}
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
