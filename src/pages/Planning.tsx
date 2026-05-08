import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScheduleGrid from '../components/planning/ScheduleGrid';
import RegistrationInfo from '../components/planning/RegistrationInfo';
import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';
import BlockRenderer from '../components/blocks/BlockRenderer';
import { useSiteInfo, usePageTexts } from '../hooks/useSanity';
import { usePage } from '../hooks/usePage';

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const Planning = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const siteInfo = useSiteInfo();
  const pageTexts = usePageTexts();
  const pageData = usePage('/planning')

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

      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative">

        {/* Orbe décoratif */}
        <div
          className="absolute pointer-events-none [animation:orb-drift_15s_ease-in-out_infinite]"
          style={{
            width: 460,
            height: 460,
            top: '-40px',
            right: '-120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(107,33,168,0.05) 0%, transparent 70%)',
            filter: 'blur(55px)',
          }}
        />

        <div ref={headerRef} className="mb-16 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6"
          >
            SAISON {siteInfo.season}
          </motion.p>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl text-[#18102E] mb-8"
          >
            {['Planning', 'des', 'Cours'].map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
                initial={{ opacity: 0, y: 36, rotateX: 14 }}
                animate={headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASING }}
                className={i === 2 ? 'text-[#6C5CA8] italic' : ''}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45, ease: EASING }}
            className="text-[#18102E]/50 text-base md:text-lg leading-relaxed max-w-xl"
          >
            {pageTexts.planningSubtitle}
          </motion.p>
        </div>

        <div className="relative z-10">
          <ScheduleGrid />
          <RegistrationInfo />
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Planning;
