---
phase: 12-livraison-client
plan: 01
subsystem: ui
tags: [seo, sanity, vercel, formspree, actualites]

provides:
  - Site prêt pour livraison client
  - SEO technique complet
  - Mur d'actualités fonctionnel
  - Contenu modifiable via fallbackContent.ts

key-files:
  created: [app/sitemap.ts, app/robots.ts, src/components/pages/ActualitesContent.tsx]
  modified: [app/layout.tsx, app/actualites/page.tsx, src/lib/fallbackContent.ts, .env.example]

key-decisions:
  - "Contenu via fallbackContent.ts plutôt que Sanity pour la livraison — CMS formé au client plus tard"
  - "Photos via /public/images/ pour éviter dépendance Sanity"
  - "Formspree actuellement sur delporte.to@gmail.com — client doit créer son propre compte Formspree et fournir l'ID"

duration: ~2h
completed: 2026-06-09
---

# Phase 12 Plan 01 — Livraison Client : Summary

**Site livré techniquement — contenu, domaine et Google Business restent à configurer avec le client.**

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Domaine custom | En attente | Client doit acheter le domaine |
| AC-2: Client autonome Studio | Reporté | CMS sera formé après livraison |
| AC-3: Contenu réel en ligne | Partiel | Sera rempli pendant le RDV mercredi |
| AC-4: Indexé Google | En attente | Search Console après domaine connecté |

## Accompli dans cette session

- Suppression résidus Vite (legacy-pages, index.html, vite.config.ts) — 1580 lignes mortes
- SEO : sitemap.xml, robots.txt, JSON-LD Schema.org SportsActivityLocation
- Mur d'actualités branché sur Sanity + 6 actualités demo avec images
- Fix indicateur scroll décoratif supprimé
- Variables d'env Sanity configurées sur Vercel (site débloqué)
- .env.example mis à jour pour Next.js

## Commits

| Commit | Description |
|--------|-------------|
| `b7a1792` | Supprime résidus Vite post-migration |
| `3897b9b` | SEO : sitemap, robots.txt, JSON-LD |
| `c88a062` | Mur d'actualités branché Sanity |
| `80a7c24` | Fix indicateur scroll décoratif |
| `98ab645` | .env.example mis à jour |
| `31250a9` | 6 actualités demo avec images |

## Ce qui reste avant mercredi

| Action | Responsable |
|--------|-------------|
| Acheter le domaine | Client |
| Connecter domaine sur Vercel + DNS OVH | Theo |
| Ajouter NEXT_PUBLIC_SITE_URL sur Vercel | Theo |
| Mettre à jour sanity.config.ts avec vrai domaine | Theo |
| Remplir fallbackContent.ts + photos /public/images/ | Theo (pendant RDV) |
| Créer compte Formspree avec email pro + fournir ID formulaire | Client |
| Mettre à jour NEXT_PUBLIC_FORMSPREE_ENDPOINT (.env.local + Vercel) | Theo |
| Google Search Console | Après domaine |

## Next Phase Readiness

**Prêt :**
- Code propre, build sans erreur
- SEO technique complet
- Actualités fonctionnelles
- Variables d'env Vercel configurées

**Bloquants :**
- Domaine non acheté
- Formspree : client doit créer son compte et fournir l'ID formulaire

---
*Phase: 12-livraison-client, Plan: 01*
*Complété: 2026-06-09*
