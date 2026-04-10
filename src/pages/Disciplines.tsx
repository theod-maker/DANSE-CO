import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Music, Zap, Heart, Star } from 'lucide-react';
import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';

const EASING = [0.25, 0.46, 0.45, 0.94] as const

interface Discipline {
  title: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
}

const DisciplineCard = ({ title, icon, description, benefits, index }: Discipline & { index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -50 : 50, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASING }}
      className="group liquid-glass rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden"
    >
      {/* Grand numéro décoratif en fond */}
      <span
        style={{ fontFamily: "'Instrument Serif', serif" }}
        className="absolute -right-3 -bottom-6 text-[140px] leading-none text-[#6C5CA8]/6 pointer-events-none select-none italic font-bold transition-all duration-500 group-hover:text-[#6C5CA8]/10 group-hover:scale-105 group-hover:-translate-y-2"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Shimmer */}
      <div className="card-shimmer-layer" />

      <motion.div
        className="text-[#6C5CA8]/50 transition-colors duration-300 group-hover:text-[#6C5CA8]"
        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
      >
        {icon}
      </motion.div>

      <div className="relative z-10">
        <h3
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-[#18102E] text-2xl md:text-3xl tracking-tight mb-3"
        >
          {title}
        </h3>
        <p className="text-[#18102E]/55 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto pt-2 relative z-10">
        {benefits.map((benefit, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 + i * 0.06 }}
            className="bg-[#EDEAF6] rounded-full px-4 py-1.5 text-xs text-[#6C5CA8] tracking-wide font-medium"
          >
            {benefit}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const Disciplines = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const disciplines: Discipline[] = [
    {
      title: "Rock & Roll",
      icon: <Zap size={32} />,
      description: "Le Rock est une danse dynamique et festive. Nous enseignons le pas de base en 6 temps, idéal pour s'amuser rapidement en soirée.",
      benefits: ["Cardio", "Énergie", "Convivialité"]
    },
    {
      title: "Danses de Salon",
      icon: <Star size={32} />,
      description: "Apprenez les classiques de l'élégance : Valse, Tango, Chachacha, Paso Doble et Rumba. Un voyage à travers les styles et les époques.",
      benefits: ["Posture", "Élégance", "Coordination"]
    },
    {
      title: "Salsa Cubaine",
      icon: <Heart size={32} />,
      description: "Plongez dans les rythmes ensoleillés de Cuba. Une danse de couple fluide, joyeuse et accessible à tous.",
      benefits: ["Rythme", "Lâcher-prise", "Soleil"]
    },
    {
      title: "West Coast Swing",
      icon: <Music size={32} />,
      description: "La version moderne et fluide du swing. Se danse sur une grande variété de musiques actuelles (Pop, RnB, Blues).",
      benefits: ["Créativité", "Musicalité", "Modernité"]
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />

      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative">

        {/* Orbe de fond */}
        <div
          className="absolute pointer-events-none [animation:orb-drift_16s_ease-in-out_infinite]"
          style={{
            width: 500,
            height: 500,
            top: '-50px',
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
            CE QUE NOUS ENSEIGNONS
          </motion.p>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl text-[#18102E] mb-8"
          >
            {['Nos', 'Disciplines'].map((word, i) => (
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
            Explorez une grande variété de styles de danse, enseignés avec passion et expertise pour tous les niveaux.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {disciplines.map((item, index) => (
            <DisciplineCard key={index} {...item} index={index} />
          ))}
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Disciplines;
