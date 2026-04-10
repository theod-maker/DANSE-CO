import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import VenueCard from '../components/locations/VenueCard';
import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';

const EASING = [0.25, 0.46, 0.45, 0.94] as const;

const venues = [
  {
    name: "Le Canopus",
    address: "129 Bd de l'Océan, 44730 Saint-Michel-Chef-Chef",
    description: "Située en bord de mer, cette salle spacieuse offre un cadre exceptionnel pour la pratique de la danse. C'est le lieu principal de nos cours du lundi soir.",
    amenities: ["Grand Parquet", "Vue Mer", "Parking Facile", "Vestiaires"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2714.7371191076226!2d-2.146603023249033!3d47.11364507114945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480572b9a76d8b9b%3A0x6b4843f54802890!2sLe%20Canopus!5e0!3m2!1sfr!2sfr!4v1712250000000!5m2!1sfr!2sfr",
    googleMapsUrl: "https://maps.app.goo.gl/uX7GfVzP7mZzR5wU9"
  },
  {
    name: "Salle Caraïbes",
    address: "Complexe de la Viauderie, 44730 Saint-Michel-Chef-Chef",
    description: "Au sein du complexe sportif, cette salle est parfaitement équipée pour les cours de salon et les stages du samedi. Une ambiance conviviale et sportive garantie.",
    amenities: ["Espace Sportif", "Miroirs", "Accessibilité PMR", "Équipement Son"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2714.800000000000!2d-2.138!3d47.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDA2JzM2LjAiTiAywrAwOCcxNi44Ilc!5e0!3m2!1sfr!2sfr!4v1712251000000!5m2!1sfr!2sfr",
    googleMapsUrl: "https://maps.app.goo.gl/uX7GfVzP7mZzR5wU9"
  }
];

const Locations = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />

      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative">

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
            OÙ NOUS TROUVER
          </motion.p>

          <h1
            style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl text-[#18102E] mb-8"
          >
            {['Nos', 'Salles'].map((word, i) => (
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
            Deux espaces magnifiques à Saint-Michel-Chef-Chef, adaptés à tous les styles de danse.
          </motion.p>
        </div>

        <div className="relative z-10">
          {venues.map((venue, index) => (
            <VenueCard key={venue.name} {...venue} index={index} />
          ))}
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Locations;
