import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { NewsContent } from '../../lib/fallbackContent'

interface Props {
  news: NewsContent[]
}

const EASING = [0.25, 0.46, 0.45, 0.94] as const
const NEWS_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&q=80'

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

const NewsCard = ({ title, date, imageUrl, excerpt, link, index }: NewsContent & { index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASING }}
      className="group liquid-glass rounded-3xl overflow-hidden flex flex-col"
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={imageUrl || NEWS_FALLBACK_IMAGE}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18102E]/30 to-transparent pointer-events-none" />
        <div className="card-shimmer-layer" />
      </div>

      <div className="p-6 flex flex-col flex-1 gap-3">
        <p className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui">
          {formatDate(date)}
        </p>

        <h3
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-[#18102E] text-xl tracking-tight leading-snug"
        >
          {title}
        </h3>

        <p className="text-[#18102E]/55 text-sm leading-relaxed flex-1">
          {excerpt}
        </p>

        {link && (
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 3 }}
            className="mt-2 text-[#6C5CA8] text-sm font-medium flex items-center gap-1.5 hover:text-[#524490] transition-colors w-fit"
          >
            En savoir plus <ArrowUpRight size={14} />
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}

const NewsSection: React.FC<Props> = ({ news }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  if (news.length === 0) return null

  return (
    <section ref={ref} className="bg-[#F5F0EA] py-28 md:py-40 px-6 relative overflow-hidden">
      <div
        className="absolute pointer-events-none [animation:orb-drift_16s_ease-in-out_infinite]"
        style={{
          width: 400,
          height: 400,
          top: '-60px',
          right: '-100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,33,168,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASING }}
          className="mb-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6"
          >
            À LA UNE
          </motion.p>
          <h2
            style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
            className="text-4xl md:text-6xl text-[#18102E] tracking-tight"
          >
            {['Nos', 'Actualités'].map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
                initial={{ opacity: 0, y: 28, rotateX: 12 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASING }}
                className={i === 1 ? 'text-[#6C5CA8] italic' : ''}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <NewsCard key={item._id} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsSection
