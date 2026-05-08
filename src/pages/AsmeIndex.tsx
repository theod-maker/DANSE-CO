import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, ArrowRight, ChevronDown } from 'lucide-react'

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
import { Link } from 'react-router-dom'
import AboutSection from '../components/asme/AboutSection'
import FeaturedVideoSection from '../components/asme/FeaturedVideoSection'
import PhilosophySection from '../components/asme/PhilosophySection'
import ServicesSection from '../components/asme/ServicesSection'
import AppFooter from '../components/layout/AppFooter'
import AppNavbar from '../components/layout/AppNavbar'
import NewsSection from '../components/asme/NewsSection'
import BlockRenderer from '../components/blocks/BlockRenderer'
import { useHomepage, useSiteInfo, useNews } from '../hooks/useSanity'
import { usePage } from '../hooks/usePage'

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const HeroOrb = ({
  size,
  color,
  style,
  animClass,
}: {
  size: number
  color: string
  style: React.CSSProperties
  animClass: string
}) => (
  <div
    className={`absolute rounded-full pointer-events-none ${animClass}`}
    style={{
      width: size,
      height: size,
      background: color,
      filter: `blur(${Math.round(size * 0.35)}px)`,
      opacity: 0.65,
      ...style,
    }}
  />
)

const AnimatedWords = ({
  text,
  className,
  style,
  delayStart = 0,
  once = true,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
  delayStart?: number
  once?: boolean
}) => {
  const words = text.split(' ')
  return (
    <span className={className} style={{ perspective: '1000px', display: 'block', ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={{ opacity: 0, y: 28, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.75, delay: delayStart + i * 0.08, ease: EASING }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

const AsmeIndex: React.FC = () => {
  const [videoOpacity, setVideoOpacity] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadeDuration = 500
  const content = useHomepage()
  const siteInfo = useSiteInfo()
  const news = useNews()
  const pageData = usePage('/')

  const handleCanPlay = () => {
    let start = performance.now()
    const animate = (time: number) => {
      const progress = (time - start) / fadeDuration
      if (progress < 1) {
        setVideoOpacity(progress)
        requestAnimationFrame(animate)
      } else {
        setVideoOpacity(1)
      }
    }
    requestAnimationFrame(animate)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const remaining = videoRef.current.duration - videoRef.current.currentTime
      if (remaining <= fadeDuration / 1000 && remaining > 0) {
        setVideoOpacity(remaining / (fadeDuration / 1000))
      }
    }
  }

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      handleCanPlay()
    }
  }

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
      <section className="bg-[#F5F0EA] relative min-h-screen flex flex-col items-center overflow-hidden">

        {/* Orbes d'ambiance */}
        <HeroOrb
          size={520}
          color="radial-gradient(circle, rgba(107,33,168,0.08) 0%, transparent 70%)"
          style={{ top: '-80px', right: '-100px' }}
          animClass="[animation:orb-drift_12s_ease-in-out_infinite]"
        />
        <HeroOrb
          size={380}
          color="radial-gradient(circle, rgba(219,39,119,0.06) 0%, transparent 70%)"
          style={{ bottom: '80px', left: '-80px' }}
          animClass="[animation:orb-drift-alt_10s_ease-in-out_infinite]"
        />
        <HeroOrb
          size={280}
          color="radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)"
          style={{ top: '40%', right: '15%' }}
          animClass="[animation:orb-drift-slow_14s_ease-in-out_infinite]"
        />

        <img
          src={content.heroImageUrl || 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=1600&q=85'}
          alt="Danse"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-15"
        />

        {/* Gradient de bas */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#F5F0EA] to-transparent pointer-events-none z-10" />

        <nav className="z-20 w-full max-w-5xl mt-8 px-6">
          <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-[#18102E] text-xl tracking-tight"
                >
                  Danse&amp;CO
                </motion.span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                {['Planning', 'Disciplines', 'Tarifs'].map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  >
                    <Link
                      to={`/${label.toLowerCase()}`}
                      className="text-[#18102E]/60 text-sm hover:text-[#18102E] transition-colors"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                <Link to="/contact" className="text-[#18102E]/60 text-sm hover:text-[#18102E] transition-colors">Contact</Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
              >
                <Link to="/planning" className="bg-[#6C5CA8] rounded-full px-6 py-2 text-sm font-medium text-white hover:bg-[#524490] transition-colors">S'inscrire</Link>
              </motion.div>
            </div>
          </div>
        </nav>

        <div className="z-10 flex-1 flex flex-col items-center justify-center md:-translate-y-[20%] text-center px-6">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 0.4, letterSpacing: '0.3em' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xs uppercase text-[#18102E] mb-8 tracking-[0.3em]"
          >
            École de Danse · Saint-Michel-Chef-Chef
          </motion.p>

          <h1
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight mb-8 text-[#18102E]"
          >
            <AnimatedWords text={content.heroTitle} delayStart={0.3} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASING }}
            className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center w-full max-w-[calc(100vw-3rem)] md:max-w-md mb-6"
          >
            <input
              type="email"
              placeholder="Votre email"
              className="bg-transparent border-none outline-none flex-1 text-[#18102E] placeholder:text-[#18102E]/40 text-sm"
            />
            <Link to="/contact" className="bg-[#6C5CA8] rounded-full p-2 text-white hover:bg-[#524490] transition-colors">
              <ArrowRight size={20} />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: EASING }}
            className="text-[#18102E] text-sm leading-relaxed max-w-sm mb-8"
          >
            {content.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease: EASING }}
          >
            <Link
              to="/planning"
              className="cta-pulse bg-[#18102E] rounded-full px-8 py-3 text-sm font-medium text-white hover:bg-[#18102E]/80 transition-colors"
            >
              Voir le planning
            </Link>
          </motion.div>
        </div>

        {/* Icônes sociales */}
        <div className="z-10 pb-8 flex items-center gap-3">
          {siteInfo.instagramUrl && (
            <motion.a
              href={siteInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="liquid-glass rounded-full p-3.5 text-[#18102E]/40 hover:text-[#6C5CA8] transition-all hover:scale-110"
            >
              <InstagramIcon size={18} />
            </motion.a>
          )}
          {siteInfo.twitterUrl && (
            <motion.a
              href={siteInfo.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.48 }}
              className="liquid-glass rounded-full p-3.5 text-[#18102E]/40 hover:text-[#6C5CA8] transition-all hover:scale-110"
            >
              <TwitterIcon size={18} />
            </motion.a>
          )}
          {siteInfo.websiteUrl && (
            <motion.a
              href={siteInfo.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.56 }}
              className="liquid-glass rounded-full p-3.5 text-[#18102E]/40 hover:text-[#6C5CA8] transition-all hover:scale-110"
            >
              <Globe size={18} />
            </motion.a>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <span className="text-[#18102E]/30 text-[10px] tracking-widest uppercase">Découvrir</span>
          <div className="scroll-indicator text-[#18102E]/40">
            <ChevronDown size={16} />
          </div>
        </motion.div>
      </section>

      <AboutSection content={content} />
      <FeaturedVideoSection content={content} />
      <PhilosophySection content={content} />
      <ServicesSection content={content} />
      <NewsSection news={news} />
      <AppFooter />
    </div>
  )
}

export default AsmeIndex
