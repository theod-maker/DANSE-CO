import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertCircle, FileText, Camera } from 'lucide-react';
import { fallbackRegistrationInfo, fallbackSiteInfo } from '../../lib/fallbackContent';

const RegistrationInfo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const regInfo = fallbackRegistrationInfo;
  const siteInfo = fallbackSiteInfo;

  const cards = [
    {
      icon: <AlertCircle size={20} />,
      title: "Permanences",
      content: (
        <ul className="flex flex-col gap-1.5 text-[#18102E]/50 text-sm">
          <li>
            <span className="text-[#18102E]/70">{regInfo.permanence1Days} :</span>{' '}
            {regInfo.permanence1Hours} ({regInfo.permanence1Venue})
          </li>
          <li>
            <span className="text-[#18102E]/70">{regInfo.permanence2Days} :</span>{' '}
            {regInfo.permanence2Hours} ({regInfo.permanence2Venue})
          </li>
        </ul>
      ),
    },
    {
      icon: <FileText size={20} />,
      title: "Dossier Requis",
      content: (
        <ul className="flex flex-col gap-1.5 text-[#18102E]/50 text-sm">
          {regInfo.requiredDocuments.map((doc, i) => (
            <li key={i}>{doc}</li>
          ))}
        </ul>
      ),
    },
    {
      icon: <Camera size={20} />,
      title: "Photo d'identité",
      content: (
        <p className="text-[#18102E]/50 text-sm leading-relaxed">
          {regInfo.photoNote}
        </p>
      ),
    },
  ];

  return (
    <section ref={ref} className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-10"
      >
        <p className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-4">INSCRIPTION</p>
        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-3xl md:text-4xl text-[#18102E] tracking-tight"
        >
          Comment s'inscrire ?
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="liquid-glass rounded-2xl p-6 flex flex-col gap-4"
          >
            <div className="text-[#6C5CA8]/60">{card.icon}</div>
            <h3 className="text-[#18102E] font-medium">{card.title}</h3>
            {card.content}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 text-center text-[#18102E]/40 text-sm"
      >
        Une question ? Appelez-nous au{' '}
        <a href={`tel:${siteInfo.phone.replace(/\./g, '')}`} className="text-[#6C5CA8] hover:text-[#524490] transition-colors">
          {siteInfo.phone}
        </a>
      </motion.div>
    </section>
  );
};

export default RegistrationInfo;
