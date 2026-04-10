import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';
import { usePricing } from '../hooks/useSanity';
import type { PricingRowContent } from '../lib/fallbackContent';

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const PricingCard = ({ label, price, detail, highlight, index }: PricingRowContent & { index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 10 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASING }}
      className={`group liquid-glass rounded-3xl p-7 flex items-center justify-between gap-6 relative overflow-hidden ${
        highlight ? 'ring-1 ring-[#6C5CA8]/25' : ''
      }`}
    >
      {/* Shimmer */}
      <div className="card-shimmer-layer" />

      {/* Barre accent gauche */}
      {highlight && (
        <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-[#6C5CA8]/40 via-[#6C5CA8]/70 to-[#6C5CA8]/40 rounded-full" />
      )}

      <div className="flex-1 relative z-10">
        <div className="flex items-center gap-3 mb-1.5">
          <p className="text-[#18102E] text-lg font-medium">{label}</p>
          {highlight && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="bg-[#EDEAF6] rounded-full px-3 py-0.5 text-xs text-[#6C5CA8] font-medium"
            >
              Populaire
            </motion.span>
          )}
        </div>
        <p className="text-[#18102E]/40 text-sm">{detail}</p>
      </div>
      <div
        style={{ fontFamily: "'Instrument Serif', serif" }}
        className="text-[#6C5CA8] text-3xl md:text-4xl tracking-tight whitespace-nowrap relative z-10"
      >
        {price}
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const infoRef = useRef(null);
  const infoInView = useInView(infoRef, { once: true, margin: "-60px" });
  const pricingData = usePricing();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />

      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative">

        {/* Orbe décoratif */}
        <div
          className="absolute pointer-events-none [animation:orb-drift-slow_18s_ease-in-out_infinite]"
          style={{
            width: 500,
            height: 500,
            top: '-80px',
            right: '-150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(107,33,168,0.05) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div ref={headerRef} className="mb-20 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6"
          >
            SAISON {pricingData.season}
          </motion.p>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl text-[#18102E] mb-8"
          >
            {['Nos', 'Tarifs'].map((word, i) => (
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
            Une tarification simple et transparente. Les tarifs sont annuels et incluent l'adhésion à l'association.
          </motion.p>
        </div>

        <div className="flex flex-col gap-4 mb-14 relative z-10">
          {pricingData.rows.map((row, index) => (
            <PricingCard key={index} {...row} index={index} />
          ))}
        </div>

        <motion.div
          ref={infoRef}
          initial={{ opacity: 0, y: 30 }}
          animate={infoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASING }}
          className="bg-[#F5F0EA] rounded-3xl p-8 md:p-10 flex gap-6 relative z-10"
        >
          <div className="shrink-0 mt-1">
            <Info size={22} className="text-[#18102E]/40" />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-[#18102E] text-lg font-medium">À savoir</h3>
            <ul className="flex flex-col gap-2.5">
              {pricingData.infoItems.map((info, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={infoInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.09, ease: EASING }}
                  className="flex items-start gap-3 text-[#18102E]/55 text-sm leading-relaxed"
                >
                  <Check size={14} className="shrink-0 mt-0.5 text-[#6C5CA8]/50" />
                  {info}
                </motion.li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                to="/contact"
                className="text-[#6C5CA8]/60 text-sm hover:text-[#6C5CA8] transition-colors underline underline-offset-4"
              >
                Une question ? Contactez-nous →
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Pricing;
