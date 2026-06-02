import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'
import { ContactForm } from '../contact/ContactForm'
import { useSiteInfo, useVenues } from '../../hooks/useSanity'

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const ContactBlock: React.FC = () => {
  const formRef = useRef(null)
  const formInView = useInView(formRef, { once: true, margin: '-60px' })
  const infoRef = useRef(null)
  const infoInView = useInView(infoRef, { once: true, margin: '-60px' })
  const siteInfo = useSiteInfo()
  const venues = useVenues()

  const contactItems = [
    { icon: <Phone size={18} />, label: 'Téléphone', value: siteInfo.phone, href: `tel:${siteInfo.phone.replace(/\./g, '')}` },
    { icon: <Mail size={18} />, label: 'Email', value: siteInfo.email, href: `mailto:${siteInfo.email}` },
    { icon: <MapPin size={18} />, label: 'Adresse Courrier', value: siteInfo.mailingAddress, href: null },
  ]

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-start">
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
                {siteInfo.instagramUrl && (
                  <motion.a
                    href={siteInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#EDEAF6] rounded-full p-3 text-[#6C5CA8] hover:bg-[#6C5CA8] hover:text-white transition-colors"
                  >
                    <InstagramIcon size={18} />
                  </motion.a>
                )}
                {siteInfo.facebookUrl && (
                  <motion.a
                    href={siteInfo.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#EDEAF6] rounded-full p-3 text-[#6C5CA8] hover:bg-[#6C5CA8] hover:text-white transition-colors"
                  >
                    <FacebookIcon size={18} />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {venues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={infoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: EASING }}
            className="mt-8"
          >
            <p className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui mb-5">NOS SALLES</p>
            <div className="grid md:grid-cols-2 gap-6">
              {venues.map((venue) => (
                <div key={venue._id} className="liquid-glass rounded-3xl overflow-hidden">
                  <iframe
                    src={venue.mapEmbedUrl}
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={venue.name}
                  />
                  <div className="px-5 py-4">
                    <p className="text-[#18102E] text-sm font-medium">{venue.name}</p>
                    <p className="text-[#18102E]/50 text-xs mt-1">{venue.address}</p>
                    {venue.googleMapsUrl && (
                      <a
                        href={venue.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6C5CA8] text-xs hover:underline mt-2 inline-block"
                      >
                        Ouvrir dans Google Maps →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ContactBlock
