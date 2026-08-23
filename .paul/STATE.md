# Project State

## Project Reference

See: .paul/PROJECT.md (updated 2026-04-05)

**Core value:** Le professeur peut gérer le contenu sans intervention technique, visiteurs sur mobile impeccable
**Current focus:** Phase 14 — Fondations CMS

## Current Position

Milestone: v2.0 CMS Maison
Phase: 14 (Fondations CMS) — 1 of 6
Plan: Not started
Status: Ready to plan
Last activity: 2026-08-23 — Milestone v2.0 créé

Progress:
- v2.0 CMS Maison: [░░░░░░░░░░] 0%
- Phase 14 (Fondations CMS): [░░░░░░░░░░] 0%
- Phase 15 (CRUD Contenu): [░░░░░░░░░░] 0%
- Phase 16 (Médias): [░░░░░░░░░░] 0%
- Phase 17 (Éditeur Visuel): [░░░░░░░░░░] 0%
- Phase 18 (Rendu Public): [░░░░░░░░░░] 0%
- Phase 19 (Migration & Bascule): [░░░░░░░░░░] 0%

**Milestone précédent — v1.0 Livraison Client :** 95%, en pause. Bloqué sur actions humaines hors développement (achat domaine, `NEXT_PUBLIC_FORMSPREE_ENDPOINT` dans Vercel). Le site est en ligne.

## Loop Position

```
PLAN ──▶ APPLY ──▶ UNIFY
  ○        ○        ○     [Ready for first PLAN]
```

## Accumulated Context

### Decisions

| Decision | Phase | Impact |
|----------|-------|--------|
| Palette aubergine #6C5CA8 | Pre-PAUL | Ne pas toucher aux couleurs |
| React 19 + Sanity v5 | Pre-PAUL | Stack fixe |
| Studio monté sur /studio via React Router | Phase 4 | Route `/studio/*` dans App.tsx |
| Fallbacks Unsplash pour images Sanity vides | Phase 4 | Composants fonctionnels avant saisie contenu |
| Formspree zero-dep pour formulaire | Phase 2 | VITE_FORMSPREE_ENDPOINT à ajouter sur Vercel |
| scheduleEntry.venue = reference vers venue doc | Phase 4 plan 04 | Prof doit re-sélectionner salles dans Studio |
| Onglets planning dynamiques via Sanity data | Phase 4 plan 04 | Tout nouveau jour visible sans code change |
| CMS maison de zéro plutôt que Sanity | Milestone v2.0 | Sanity reste en place et fonctionnel jusqu'à la phase 19 |
| Éditeur visuel drag & drop libre (pas blocs empilés) | Milestone v2.0 | Phase 17 lourde, à re-découper en sous-plans |
| Isolation totale du site en production | Milestone v2.0 | Branche dédiée + worktree ; aucun fichier public modifié avant phase 18 |
| Stack proposée Vercel Postgres (Neon) + Prisma | Milestone v2.0 | À confirmer pendant le plan de la phase 14 |

### Deferred Issues

| Issue | Origin | Effort | Revisit |
|-------|--------|--------|---------|
| Liens réseaux sociaux non configurés | Pre-PAUL | S | Phase 7 plan 07-01 |
| Timeout fetch formulaire | Phase 2 | S | Post-livraison |
| SEO meta par page | Post-PAUL | M | Post-livraison |
| Bundle Sanity gros (5MB) | Post-PAUL | M | Post-livraison |
| Migration venue: re-sélectionner salle sur cours existants | Phase 4-04 | S | Avant saisie planning |

### Blockers/Concerns

- Formspree : ID client configuré (`mzdqlrje`), mis à jour dans `.env.local`. **Reste à faire : mettre à jour `NEXT_PUBLIC_FORMSPREE_ENDPOINT` dans Vercel Dashboard → Settings → Environment Variables → valeur : `https://formspree.io/f/mzdqlrje`**
- Domaine non acheté — bloque DNS, NEXT_PUBLIC_SITE_URL, Search Console
- **Dérive PAUL à resynchroniser :** l'état ci-dessus datait du 2026-06-09. La phase 13 (corrections client round 2, plan du 2026-06-22) n'a pas de SUMMARY, et les commits d'août ne sont pas tracés. Les phases 5, 6, 12 et 13 existent sur disque sans figurer dans le tableau v1.0 de ROADMAP.md. Un `/paul:unify` est à passer avant de démarrer le développement de la phase 14.
- **Contenu réel hors CMS :** le contenu du site vit dans `src/lib/fallbackContent.ts`, pas dans Sanity. Le client n'a jamais eu accès au CMS et signale ses corrections par message. C'est la raison d'être du milestone v2.0.

## Session Continuity

Last session: 2026-08-23
Stopped at: Milestone v2.0 CMS Maison créé, structure des phases 14 à 19 en place
Next action: `/paul:plan` pour la phase 14 (Fondations CMS)
Resume file: `.paul/ROADMAP.md`

---
*STATE.md — Updated: 2026-08-23*
