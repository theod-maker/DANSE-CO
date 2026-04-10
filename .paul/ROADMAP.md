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

---
*Roadmap created: 2026-04-05*
