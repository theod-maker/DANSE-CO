# Roadmap: Danse&CO

## Overview

Site vitrine livré et en ligne (v1.0). Le milestone en cours construit un CMS maison de zéro pour remplacer Sanity, avec un éditeur visuel drag & drop, sans jamais perturber le site en production.

## Current Milestone

**v2.0 CMS Maison** (v2.0.0)
Status: In progress
Phases: 0 of 6 complete
Focus: Donner au client un CMS sur mesure où il peut tout modifier lui-même, sans jamais perturber le site en production.

### Contrainte d'isolation — s'applique à toutes les phases

- Le site en ligne suit uniquement `main`. Développement sur branche dédiée avec worktree git séparé, pour permettre les correctifs urgents sur `main` en parallèle.
- Jusqu'à la phase 18, les pages publiques continuent de lire `fallbackContent.ts` sans modification. Sanity reste en place jusqu'à la phase 19.
- Le CMS maison se construit sur des routes et des fichiers neufs. Aucun fichier public existant n'est modifié avant la phase 18.
- Validation sur URL de preview Vercel avant tout merge vers `main`.
- Bases de données séparées dev et production dès la phase 14, via les variables d'environnement Vercel (`Preview` vs `Production`).

## Phases — v2.0 CMS Maison

| Phase | Name | Plans | Status | Completed |
|-------|------|-------|--------|-----------|
| 14 | Fondations CMS | TBD | Not started | - |
| 15 | CRUD Contenu | TBD | Not started | - |
| 16 | Médias | TBD | Not started | - |
| 17 | Éditeur Visuel | TBD | Not started | - |
| 18 | Rendu Public | TBD | Not started | - |
| 19 | Migration & Bascule | TBD | Not started | - |

## Previous Milestone — v1.0 Livraison Client

Site en ligne. Reste bloqué sur des actions humaines hors développement : achat du domaine et mise à jour de `NEXT_PUBLIC_FORMSPREE_ENDPOINT` dans Vercel.

> **Note de dérive :** le tableau ci-dessous date du 2026-05-20 et ne reflète plus l'état réel. Les phases 5, 6, 12 et 13 existent sur disque sans y figurer, et plusieurs statuts sont périmés. Un `/paul:unify` est nécessaire pour resynchroniser. Cette section est conservée telle quelle en attendant.

| Phase | Name | Plans | Status | Completed |
|-------|------|-------|--------|-----------|
| 1 | Responsive Fixes | 3 | In progress | - |
| 2 | Formulaire Email | 1 | Not started | - |
| 3 | Déploiement & Contenu | 1 | Not started | - |
| 4 | Full CMS Coverage | 3 | Not started | - |

## Phase Details — v2.0 CMS Maison

### Phase 14: Fondations CMS

**Goal:** Une base de données opérationnelle et une zone d'administration protégée, sans qu'aucune page publique ne change.
**Depends on:** Nothing
**Research:** Likely (choix et configuration du provider de base de données)

**Scope:**
- Choix et provisionnement de la base : Vercel Postgres (Neon) proposé, cohérent avec l'hébergement existant
- Schéma de données couvrant les 7 familles de contenu, transposé depuis les schemas Sanity existants
- Prisma comme ORM, migrations versionnées
- Authentification admin (nombre de comptes réduit, client non technique)
- Route `/admin` protégée, coquille vide à ce stade
- Bases dev et production séparées dès le départ

**Plans:** TBD (définis pendant `/paul:plan`)

### Phase 15: CRUD Contenu

**Goal:** Le client peut créer, modifier et supprimer tout son contenu structuré depuis `/admin`.
**Depends on:** Phase 14
**Research:** No

**Scope:**
- Formulaires d'édition pour les 7 familles : planning, actualités, tarifs, disciplines, instructeurs, lieux, infos du site
- Listes, création, édition, suppression, validation des saisies
- Interface en français, pensée pour un utilisateur non technique
- Le site public lit toujours `fallbackContent.ts` — aucun branchement à ce stade

**Plans:** TBD (définis pendant `/paul:plan`)

### Phase 16: Médias

**Goal:** Le client gère ses images sans passer par le code ni par un dossier `/public`.
**Depends on:** Phase 15
**Research:** Likely (choix du stockage : Vercel Blob envisagé)

**Scope:**
- Upload d'images avec limites de taille et de format
- Bibliothèque média : parcourir, renommer, supprimer
- Sélecteur d'image intégré aux formulaires de la phase 15

**Plans:** TBD (définis pendant `/paul:plan`)

### Phase 17: Éditeur Visuel

**Goal:** Le client compose ses pages librement, sans contrainte de gabarit.
**Depends on:** Phase 16
**Research:** Yes (la pièce la plus lourde et la plus incertaine du milestone)

**Scope:**
- Canvas d'édition avec positionnement libre par glisser-déposer
- Redimensionnement des éléments
- Gestion du responsive par breakpoint
- Undo / redo
- Cohérence stricte entre le rendu de l'éditeur et le rendu public

> Cette phase sera re-découpée en sous-plans au moment de sa planification. Son ampleur justifie de la traiter comme un projet à part entière.

**Plans:** TBD (définis pendant `/paul:plan`)

### Phase 18: Rendu Public

**Goal:** Les pages publiques savent lire la base de données, derrière un interrupteur réversible.
**Depends on:** Phase 17
**Research:** No

**Scope:**
- Couche de lecture serveur depuis la base
- Feature flag permettant de basculer page par page, et de revenir en arrière instantanément
- Stratégie de cache et de revalidation
- `fallbackContent.ts` conservé comme filet de sécurité pendant toute la phase

**Plans:** TBD (définis pendant `/paul:plan`)

### Phase 19: Migration & Bascule

**Goal:** Le client édite son site en autonomie, Sanity est retiré.
**Depends on:** Phase 18
**Research:** No

**Scope:**
- Import du contenu actuel de `fallbackContent.ts` vers la base
- Bascule de toutes les pages, validation sur preview avant merge
- Retrait des dépendances Sanity et de la route `/studio`
- Formation du client et guide d'utilisation

> Le retrait de Sanity intervient uniquement après validation complète du nouveau CMS en production.

**Plans:** TBD (définis pendant `/paul:plan`)

## Phase Details — v1.0 Livraison Client

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
*Roadmap created: 2026-04-05 — Updated: 2026-08-23*
