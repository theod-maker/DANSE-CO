import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { HomepageContent } from '../../lib/fallbackContent'

interface Props {
  content: HomepageContent
}

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const ServiceCard = ({
  imageUrl,
  imageAlt,
  tag,
  title,
  description,
  href,
  index,
}: {
  imageUrl: string
  imageAlt: string
  tag: string
  title: string
  description: string
  href: string
  index: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.85, delay: index * 0.15, ease: EASING }}
      className="group liquid-glass rounded-3xl overflow-hidden flex flex-col h-full cursor-pointer"
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18102E]/40 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-60" />

        {/* Shimmer overlay on hover */}
        <div className="card-shimmer-layer" />
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui">
            {tag}
          </p>
          <Link
            to={href}
            className="liquid-glass rounded-full p-2 text-[#6C5CA8]/60 transition-all group-hover:text-[#6C5CA8] group-hover:scale-110 group-hover:rotate-12"
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <h3
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-[#18102E] text-xl md:text-2xl mb-3 tracking-tight"
        >
          {title}
        </h3>

        <p className="text-[#18102E]/50 text-sm leading-relaxed">
          {description}
        </p>

        <motion.div
          className="mt-6 h-px bg-[#6C5CA8]/20 origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.15, ease: EASING }}
        />
      </div>
    </motion.div>
  )
}

const ServicesSection: React.FC<Props> = ({ content }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const titleWords = content.servicesSectionTitle.split(' ')

  const services = [
    {
      imageUrl: content.servicesCard1ImageUrl || 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=900&q=85',
      imageAlt: 'Nos disciplines de danse',
      tag: 'DÉCOUVRIR',
      title: 'Nos Disciplines',
      description: content.servicesCard1Description,
      href: '/disciplines',
    },
    {
      imageUrl: content.servicesCard2ImageUrl || 'https://images.unsplash.com/photo-1535525153316-d772a249b53a?w=900&q=85',
      imageAlt: 'Cours et stages de danse',
      tag: 'PLANNING',
      title: 'Cours & Stages',
      description: content.servicesCard2Description,
      href: '/planning',
    },
  ]

  return (
    <section ref={ref} className="bg-[#FDFBF7] py-28 md:py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(107,33,168,0.04)_0%,_transparent_60%)] pointer-events-none" />

      {/* Orbe décoratif */}
      <div
        className="absolute pointer-events-none [animation:orb-drift-slow_20s_ease-in-out_infinite]"
        style={{
          width: 400,
          height: 400,
          top: '10%',
          left: '-100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,33,168,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASING }}
          className="flex items-baseline justify-between mb-16"
        >
          <h2
            style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
            className="text-3xl md:text-5xl text-[#18102E] tracking-tight"
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
                initial={{ opacity: 0, y: 20, rotateX: 10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.09, ease: EASING }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <p className="text-[#18102E]/40 text-sm hidden md:block">
            {content.servicesSectionSubtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
