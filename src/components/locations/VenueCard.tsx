import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Navigation, Check } from 'lucide-react';

const EASING = [0.25, 0.46, 0.45, 0.94] as const;

interface VenueProps {
  name: string;
  address: string;
  description: string;
  amenities: string[];
  mapEmbedUrl: string;
  googleMapsUrl: string;
  index: number;
}

const VenueCard = ({ name, address, description, amenities, mapEmbedUrl, googleMapsUrl, index }: VenueProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -50 : 50, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      transition={{ duration: 0.85, delay: index * 0.1, ease: EASING }}
      className="group liquid-glass rounded-3xl overflow-hidden grid md:grid-cols-2 mb-6 relative"
    >
      <div className="card-shimmer-layer" />

      <div className="aspect-[4/3] md:aspect-auto min-h-[280px] overflow-hidden">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Carte ${name}`}
        />
      </div>

      <div className="p-8 md:p-10 flex flex-col gap-6 justify-center relative z-10">
        <div>
          <p className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-3">SALLE</p>
          <h2
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-[#18102E] text-3xl md:text-4xl tracking-tight mb-3"
          >
            {name}
          </h2>
          <div className="flex items-start gap-2 text-[#18102E]/40 text-sm">
            <MapPin size={14} className="shrink-0 mt-0.5" />
            <span>{address}</span>
          </div>
        </div>

        <p className="text-[#18102E]/55 text-sm leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {amenities.map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 + i * 0.06 }}
              className="bg-[#EDEAF6] rounded-full px-3 py-1.5 text-xs text-[#6C5CA8] flex items-center gap-1.5 font-medium"
            >
              <Check size={11} />
              {item}
            </motion.span>
          ))}
        </div>

        <motion.a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#6C5CA8] text-white rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 w-fit hover:bg-[#524490] transition-colors"
        >
          Y Aller <Navigation size={15} />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default VenueCard;
