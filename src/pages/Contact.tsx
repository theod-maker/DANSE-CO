import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
import ContactForm from '../components/contact/ContactForm';
import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';

const EASING = [0.25, 0.46, 0.45, 0.94] as const;

const Contact = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: '-60px' });
  const infoRef = useRef(null);
  const infoInView = useInView(infoRef, { once: true, margin: '-60px' });

  const contactItems = [
    { icon: <Phone size={18} />, label: 'Téléphone', value: '06.17.09.93.49', href: 'tel:0617099349' },
    { icon: <Mail size={18} />, label: 'Email', value: 'DANSANDCO@OUTLOOK.FR', href: 'mailto:DANSANDCO@OUTLOOK.FR' },
    { icon: <MapPin size={18} />, label: 'Adresse Courrier', value: '17 Rue du Chevecier, 44730 Saint-Michel-Chef-Chef', href: null },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />

      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative">

        <div
          className="absolute pointer-events-none [animation:orb-drift-alt_14s_ease-in-out_infinite]"
          style={{
            width: 450,
            height: 450,
            top: '-60px',
            left: '-120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(107,33,168,0.05) 0%, transparent 70%)',
            filter: 'blur(55px)',
          }}
        />

        <div ref={headerRef} className="mb-20 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-6"
          >
            NOUS ÉCRIRE
          </motion.p>

          <h1
            style={{ fontFamily: "'Instrument Serif', serif", perspective: '1200px' }}
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl text-[#18102E] mb-8"
          >
            {['Contactez-', 'nous'].map((word, i) => (
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
            Une question sur nos cours, les inscriptions ou un événement ? Nous sommes là pour vous répondre.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start relative z-10">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -30 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASING }}
          >
            <ContactForm />
          </motion.div>

          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 30 }}
            animate={infoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASING }}
            className="liquid-glass rounded-3xl p-8 flex flex-col gap-8 relative overflow-hidden"
          >
            <div className="card-shimmer-layer" />

            <div className="relative z-10">
              <p className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-5">NOS COORDONNÉES</p>
              <div className="flex flex-col gap-5">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={infoInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.12, ease: EASING }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-[#EDEAF6] rounded-full p-2.5 text-[#6C5CA8] shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[#18102E]/40 text-xs mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-[#18102E]/75 text-sm hover:text-[#6C5CA8] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#18102E]/75 text-sm">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={infoInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.6, ease: EASING }}
              className="w-full h-px bg-[#18102E]/8 origin-left relative z-10"
            />

            <div className="relative z-10">
              <p className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-4">RÉSEAUX</p>
              <div className="flex gap-3">
                {[InstagramIcon, FacebookIcon].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#EDEAF6] rounded-full p-3 text-[#6C5CA8] hover:bg-[#6C5CA8] hover:text-white transition-colors"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Contact;
