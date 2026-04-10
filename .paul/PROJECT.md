# Danse&CO

## What This Is

Site vitrine pour Danse&CO, école de danse sportive à Saint-Michel-Chef-Chef. Site React/Vite avec CMS Sanity intégré, permettant au professeur responsable de mettre à jour le contenu sans toucher au code.

## Core Value

Le professeur peut gérer le contenu du site (planning, tarifs, profs, textes) sans intervention technique, et les visiteurs accèdent à une vitrine moderne et professionnelle depuis n'importe quel appareil.

## Current State

| Attribute | Value |
|-----------|-------|
| Type | Application |
| Version | 0.1.0 |
| Status | MVP |
| Last Updated | 2026-04-05 |

## Requirements

### Core Features

- Site vitrine multi-pages (Home, Disciplines, Instructeurs, Planning, Tarifs, Salles, Contact)
- CMS Sanity pour édition du contenu (textes, images, planning, tarifs, profs)
- Formulaire de contact fonctionnel
- Design moderne, animations fluides, responsive mobile

### Validated (Shipped)

- [x] 7 pages avec animations framer-motion
- [x] CMS Sanity intégré avec fallback local
- [x] Refonte couleurs (aubergine sophistiqué #6C5CA8)
- [x] Images danse Unsplash comme placeholders
- [x] Landing page en fond blanc/crème

### Active (In Progress)

- [ ] Corrections responsive mobile — audit complet réalisé

### Planned (Next)

- [ ] Formulaire de contact avec vrai envoi email (Resend/Formspree)
- [ ] Déploiement Vercel
- [ ] Saisie contenu réel dans Sanity

### Out of Scope

- Système de réservation en ligne
- Espace membre
- Paiement en ligne

## Target Users

**Primary:** Le professeur responsable du club
- Non-technique, utilise le studio Sanity pour éditer le contenu
- Accès uniquement au studio CMS

**Secondary:** Visiteurs (élèves actuels et potentiels)
- Cherchent horaires, tarifs, disciplines
- Accès depuis mobile majoritairement

## Constraints

### Technical Constraints

- Stack fixe : Vite + React 19 + TypeScript + Tailwind v4 + Framer Motion
- Sanity project ID : z0uyxhwg
- Pas d'ajout de dépendances npm sans raison forte

### Business Constraints

- Client non-technique — interface CMS doit rester simple
- Hébergement cible : Vercel (gratuit)

## Key Decisions

| Decision | Rationale | Date | Status |
|----------|-----------|------|--------|
| Sanity comme CMS | Gratuit, interface simple, déjà intégré | 2026-04-05 | Active |
| React 19 | Requis par Sanity v5 | 2026-04-05 | Active |
| Palette aubergine #6C5CA8 | Moins "tech startup", plus élégant pour danse | 2026-04-05 | Active |

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Vite + React 19 + TypeScript | |
| Styles | Tailwind CSS v4 + CSS custom | |
| Animations | Framer Motion | |
| CMS | Sanity v5 | project z0uyxhwg |
| Fonts | Instrument Serif + Cormorant Garamond + Inter | |
| Hosting | Vercel (cible) | |

---
*PROJECT.md — Created: 2026-04-05*
