# Animations Locations & Contact Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Appliquer le pattern animations "site de danse" (titres word-by-word rotateX, orbes flottants, shimmer hover, entrées alternées gauche/droite, stagger badges) aux pages Locations et Contact, alignées sur le pattern déjà en place sur Disciplines/Instructors/Pricing/Planning.

**Architecture:** Chaque page reçoit un orbe positionné en `absolute` dans son `<main relative>`, les titres `<h1>` sont décomposés en `motion.span` par mot avec perspective 3D, les cards obtiennent un `<div className="card-shimmer-layer" />` et une entrée alternée selon l'index pair/impair. Le pattern CSS (`orb-drift`, `card-shimmer-layer`) est déjà défini dans `src/index.css` et réutilisé tel quel.

**Tech Stack:** React 18, TypeScript, framer-motion, Tailwind CSS v4, Vite

---

## Fichiers modifiés

| Fichier | Changements |
|---|---|
| `src/pages/Locations.tsx` | EASING, titre word-by-word, orbe, `relative` sur `<main>` |
| `src/components/locations/VenueCard.tsx` | Entrée alternée x, shimmer, badges stagés, whileHover |
| `src/pages/Contact.tsx` | EASING, titre word-by-word, orbe, contact items stagés |
| `src/components/contact/ContactForm.tsx` | Champs motion.div stagés, whileFocus, submit whileHover/whileTap |

---

### Task 1 : Locations.tsx — titre word-by-word + orbe

**Files:**
- Modify: `src/pages/Locations.tsx`

- [ ] **Step 1 : Implémenter**

Remplacer le contenu de `src/pages/Locations.tsx` par :

```tsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import VenueCard from '../components/locations/VenueCard';
import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';

const EASING = [0.25, 0.46, 0.45, 0.94] as const;

const Locations = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

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

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />

      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative">

        {/* Orbe décoratif */}
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
            className="text-[#18102E]/40 text-xs tracking-widest uppercase mb-6"
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
                className={i === 1 ? 'text-[#7C3AED] italic' : ''}
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
            <VenueCard key={index} {...venue} index={index} />
          ))}
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Locations;
```

- [ ] **Step 2 : Vérifier le build TypeScript**

```bash
cd /Users/theodelporte/Perso/Danse\&CO && npm run build
```

Expected : `✓ built in` sans erreur TypeScript.

- [ ] **Step 3 : Commit**

```bash
cd /Users/theodelporte/Perso/Danse\&CO && git add src/pages/Locations.tsx && git commit -m "feat: titre word-by-word et orbe flottant sur Locations"
```

---

### Task 2 : VenueCard.tsx — entrée alternée, shimmer, badges stagés

**Files:**
- Modify: `src/components/locations/VenueCard.tsx`

- [ ] **Step 1 : Implémenter**

Remplacer le contenu de `src/components/locations/VenueCard.tsx` par :

```tsx
import React, { useRef } from 'react';
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
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      transition={{ duration: 0.85, delay: index * 0.1, ease: EASING }}
      className="group liquid-glass rounded-3xl overflow-hidden grid md:grid-cols-2 mb-6 relative"
    >
      {/* Shimmer */}
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
          <p className="text-[#18102E]/40 text-xs tracking-widest uppercase mb-3">SALLE</p>
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
              className="bg-[#EDE9FE] rounded-full px-3 py-1.5 text-xs text-[#7C3AED] flex items-center gap-1.5 font-medium"
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
          className="bg-[#7C3AED] text-white rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 w-fit hover:bg-[#6B21A8] transition-colors"
        >
          Y Aller <Navigation size={15} />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default VenueCard;
```

- [ ] **Step 2 : Vérifier le build**

```bash
cd /Users/theodelporte/Perso/Danse\&CO && npm run build
```

Expected : `✓ built in` sans erreur.

- [ ] **Step 3 : Commit**

```bash
cd /Users/theodelporte/Perso/Danse\&CO && git add src/components/locations/VenueCard.tsx && git commit -m "feat: entrée alternée, shimmer et badges animés sur VenueCard"
```

---

### Task 3 : Contact.tsx — titre word-by-word + orbe + items stagés

**Files:**
- Modify: `src/pages/Contact.tsx`

- [ ] **Step 1 : Implémenter**

Remplacer le contenu de `src/pages/Contact.tsx` par :

```tsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import ContactForm from '../components/contact/ContactForm';
import AppNavbar from '../components/layout/AppNavbar';
import AppFooter from '../components/layout/AppFooter';

const EASING = [0.25, 0.46, 0.45, 0.94] as const;

const Contact = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
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

        {/* Orbe décoratif */}
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
            className="text-[#18102E]/40 text-xs tracking-widest uppercase mb-6"
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
                className={i === 1 ? 'text-[#7C3AED] italic' : ''}
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
            initial={{ opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASING }}
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
            {/* Shimmer */}
            <div className="card-shimmer-layer" />

            <div className="relative z-10">
              <p className="text-[#18102E]/40 text-xs tracking-widest uppercase mb-5">NOS COORDONNÉES</p>
              <div className="flex flex-col gap-5">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={infoInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.12, ease: EASING }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-[#EDE9FE] rounded-full p-2.5 text-[#7C3AED] shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[#18102E]/40 text-xs mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-[#18102E]/75 text-sm hover:text-[#7C3AED] transition-colors">
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
              <p className="text-[#18102E]/40 text-xs tracking-widest uppercase mb-4">RÉSEAUX</p>
              <div className="flex gap-3">
                {[Instagram, Facebook].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#EDE9FE] rounded-full p-3 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors"
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
```

- [ ] **Step 2 : Vérifier le build**

```bash
cd /Users/theodelporte/Perso/Danse\&CO && npm run build
```

Expected : `✓ built in` sans erreur.

- [ ] **Step 3 : Commit**

```bash
cd /Users/theodelporte/Perso/Danse\&CO && git add src/pages/Contact.tsx && git commit -m "feat: titre word-by-word, orbe et items stagés sur Contact"
```

---

### Task 4 : ContactForm.tsx — champs stagés + micro-animations

**Files:**
- Modify: `src/components/contact/ContactForm.tsx`

- [ ] **Step 1 : Implémenter**

Remplacer le contenu de `src/components/contact/ContactForm.tsx` par :

```tsx
import React, { useState, useRef } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const EASING = [0.25, 0.46, 0.45, 0.94] as const;

interface Field {
  id: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea';
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

const fields: Field[] = [
  { id: 'name', label: 'Nom', type: 'text', placeholder: 'Votre nom' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
  {
    id: 'subject',
    label: 'Objet',
    type: 'select',
    options: [
      { value: 'inscription', label: 'Inscription' },
      { value: 'planning', label: 'Planning / Cours' },
      { value: 'evenement', label: 'Événement' },
      { value: 'autre', label: 'Autre' },
    ],
  },
  { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Votre message...', rows: 5 },
];

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="liquid-glass rounded-3xl p-10 flex flex-col items-center gap-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <CheckCircle size={36} className="text-[#7C3AED]" />
          </motion.div>
          <h3
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-[#18102E] text-2xl"
          >
            Message envoyé
          </h3>
          <p className="text-[#18102E]/50 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
          <motion.button
            onClick={() => setStatus('idle')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 liquid-glass rounded-full px-6 py-2.5 text-sm text-[#18102E]/60 hover:text-[#7C3AED] transition-colors"
          >
            Envoyer un autre message
          </motion.button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {fields.map((field, i) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASING }}
              className="flex flex-col gap-2"
            >
              <label htmlFor={field.id} className="text-[#18102E]/40 text-xs tracking-widest uppercase">
                {field.label}
              </label>

              {field.type === 'textarea' ? (
                <motion.textarea
                  id={field.id}
                  required
                  rows={field.rows}
                  placeholder={field.placeholder}
                  whileFocus={{ scale: 1.01 }}
                  className="liquid-glass rounded-xl px-5 py-3.5 text-[#18102E] text-sm placeholder:text-[#18102E]/25 bg-transparent outline-none focus:ring-1 focus:ring-[#7C3AED]/30 transition-all resize-none"
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.id}
                  required
                  className="liquid-glass rounded-xl px-5 py-3.5 text-[#18102E] text-sm bg-transparent outline-none focus:ring-1 focus:ring-[#7C3AED]/30 transition-all appearance-none"
                >
                  <option value="">Sélectionnez un objet</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <motion.input
                  type={field.type}
                  id={field.id}
                  required
                  placeholder={field.placeholder}
                  whileFocus={{ scale: 1.01 }}
                  className="liquid-glass rounded-xl px-5 py-3.5 text-[#18102E] text-sm placeholder:text-[#18102E]/25 bg-transparent outline-none focus:ring-1 focus:ring-[#7C3AED]/30 transition-all"
                />
              )}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="bg-[#7C3AED] hover:bg-[#6B21A8] text-white rounded-full px-8 py-3.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-2"
          >
            {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
            <Send size={16} />
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
```

- [ ] **Step 2 : Vérifier le build**

```bash
cd /Users/theodelporte/Perso/Danse\&CO && npm run build
```

Expected : `✓ built in` sans erreur TypeScript.

- [ ] **Step 3 : Smoke test visuel**

Lancer `npm run dev`, ouvrir `http://localhost:5173/contact` et vérifier :
- Les 4 champs du formulaire apparaissent en cascade (stagger ~80ms entre chaque)
- `input` et `textarea` grossissent légèrement au focus (scale 1.01)
- Le bouton Envoyer monte légèrement au hover
- L'icône CheckCircle rebondit au succès (spring animation)

- [ ] **Step 4 : Commit**

```bash
cd /Users/theodelporte/Perso/Danse\&CO && git add src/components/contact/ContactForm.tsx && git commit -m "feat: champs stagés et micro-animations sur ContactForm"
```

---

## Self-Review

**1. Spec coverage :**
- ✅ Orbes flottants → Tasks 1 et 3
- ✅ Titres word-by-word rotateX → Tasks 1 et 3
- ✅ Entrées alternées gauche/droite → Task 2 (VenueCard)
- ✅ Shimmer hover → Tasks 2 et 3
- ✅ Stagger badges → Task 2
- ✅ Stagger champs formulaire → Task 4
- ✅ Micro-animations focus/hover → Task 4

**2. Placeholder scan :** aucun placeholder détecté. Tout le code est complet.

**3. Type consistency :**
- `EASING` déclaré identiquement dans chaque fichier : `[0.25, 0.46, 0.45, 0.94] as const`
- `Field` interface définie avant usage dans `ContactForm.tsx`
- `VenueProps` interface conservée identique à l'original
- `isInView`, `fromLeft`, `ref` utilisés de façon cohérente avec le pattern existant
