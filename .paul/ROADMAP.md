# Roadmap: Danse&CO

## Overview

Site vitrine MVP → livraison client. Le chemin restant couvre les corrections responsive (audit réalisé), le formulaire email fonctionnel, et le déploiement Vercel avec contenu réel dans Sanity.

## Current Milestone

**v1.0 Livraison Client** (v1.0.0)
Status: In progress
Phases: 0 of 3 complete

## Phases

| Phase | Name | Plans | Status | Completed |
|-------|------|-------|--------|-----------|
| 1 | Responsive Fixes | 3 | In progress | - |
| 2 | Formulaire Email | 1 | Not started | - |
| 3 | Déploiement & Contenu | 1 | Not started | - |
| 4 | Full CMS Coverage | 3 | Not started | - |

## Phase Details

### Phase 1: Responsive Fixes

**Goal:** Corriger tous les problèmes identifiés dans l'audit responsive — le site doit être impeccable sur mobile (375px+) et tablette.
**Depends on:** Nothing
**Research:** Unlikely (corrections CSS/Tailwind mécaniques)

**Scope:**
- Titres h1/h2 : ajouter breakpoint `sm:` sur les 10 fichiers concernés
- Paddings/gaps : réduire les valeurs de base mobile sur 8 composants
- Navigation mobile + débordements hero : 3 correctifs structurels

**Plans:**
- [ ] 01-01: Titres — breakpoints sm sur pages et composants
- [ ] 01-02: Paddings, gaps et espacements mobile
- [ ] 01-03: Navbar mobile, hero, ScheduleGrid

### Phase 2: Formulaire Email

**Goal:** Le formulaire de contact envoie réellement les emails au professeur.
**Depends on:** Phase 1
**Research:** Unlikely (Resend ou Formspree, pattern connu)

**Scope:**
- Intégration Resend ou Formspree
- Confirmation visuelle d'envoi

**Plans:**
- [ ] 02-01: Branchement envoi email réel

### Phase 3: Déploiement & Contenu

**Goal:** Site en ligne sur Vercel, contenu réel saisi dans Sanity.
**Depends on:** Phase 2
**Research:** Unlikely

**Scope:**
- Configuration Vercel + variables d'env
- Guide saisie contenu pour le professeur

**Plans:**
- [ ] 03-01: Déploiement Vercel + config Sanity prod

### Phase 4: Full CMS Coverage

**Goal:** Tout le contenu du site gérable depuis Sanity — disciplines, salles, coordonnées, images, saison — zéro texte hardcodé.
**Depends on:** Nothing (indépendant des phases 1-3)
**Research:** No

**Scope:**
- 3 nouveaux schemas Sanity : `discipline`, `venue`, `siteInfo`
- Mise à jour schema `homepage` : 5 champs image + tagline hero
- Couche data : 3 nouvelles queries GROQ, 3 nouveaux hooks, types TS, fallbacks
- Branchement 7 composants/pages : Disciplines, Locations, Contact, AppFooter, PhilosophySection, FeaturedVideoSection, ServicesSection

**Plans:**
- [ ] 04-01: Schemas Sanity (3 nouveaux + update homepage)
- [ ] 04-02: Data layer (queries, types, hooks, fallbacks)
- [ ] 04-03: Branchement composants et pages

### Phase 8: Next.js Foundation

**Goal:** Remplacer Vite par Next.js 15 App Router — base technique pour le live preview Sanity.
**Depends on:** Nothing (migration structurelle indépendante)
**Research:** No

**Scope:**
- Installation Next.js 15, suppression Vite
- Configuration next.config.ts, tsconfig, postcss
- Layout racine (app/layout.tsx) avec fonts + CSS global
- Migration des 9 pages src/pages → app/*/page.tsx (structure, hooks conservés temporairement)
- Route Studio Sanity app/studio/[[...tool]]/page.tsx

**Plans:**
- [ ] 08-01: Install Next.js + config (package.json, next.config.ts, tsconfig, layout, globals.css)
- [ ] 08-02: Migration 9 pages + route Studio

### Phase 9: Data Layer Next.js

**Goal:** Remplacer les hooks useSanity par sanityFetch server-side + API routes pour ISR et draft mode.
**Depends on:** Phase 8
**Research:** No

**Scope:**
- sanity/lib/fetch.ts avec support draft mode
- sanity/lib/live.ts pour live queries
- Routes API : /api/revalidate, /api/draft/enable, /api/draft/disable
- Conversion des 9 pages en Server Components (suppression hooks useSanity)

**Plans:**
- [ ] 09-01: sanityFetch + queries + API routes
- [ ] 09-02: Conversion 9 pages en Server Components

### Phase 10: Visual Editing

**Goal:** Presentation Tool dans le Studio + overlays click-to-edit sur le site.
**Depends on:** Phase 9
**Research:** No

**Scope:**
- @sanity/presentation plugin dans sanity.config.ts
- @sanity/visual-editing dans le layout Next.js
- Encodage stega sur sanityFetch
- Test click-to-edit sur chaque type de contenu

**Plans:**
- [ ] 10-01: Presentation Tool + visual editing overlays

### Phase 11: Déploiement Vercel

**Goal:** Site en ligne sur Vercel avec ISR, webhook Sanity, et guide client.
**Depends on:** Phase 10
**Research:** No

**Scope:**
- Variables d'env Vercel (SANITY_API_READ_TOKEN, SANITY_REVALIDATE_SECRET)
- Webhook Sanity → URL Vercel prod
- Test ISR en production
- Guide client pour utiliser le preview dans le Studio

**Plans:**
- [ ] 11-01: Déploiement Vercel + webhook + guide client

### Phase 7: Contenu manquant PDF

**Goal:** Intégrer tout le contenu du PDF client absent du site.
**Depends on:** Nothing (indépendant)
**Research:** No

**Scope:**
- 4 disciplines manquantes dans fallbackDisciplines (Lindy Hop, Multidanses, Danse en ligne, Cours enfants)
- Réseaux sociaux conditionnels dans Footer (affichage si URL renseignée)
- Section compétition sur page Instructeurs
- Page /histoire placeholder

**Plans:**
- [x] 07-01: Disciplines manquantes + réseaux sociaux conditionnels
- [x] 07-02: Section compétition (Instructors) + page Histoire

---
*Roadmap created: 2026-04-05 — Updated: 2026-05-20*
