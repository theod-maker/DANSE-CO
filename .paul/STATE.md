# Project State

## Project Reference

See: .paul/PROJECT.md (updated 2026-04-05)

**Core value:** Le professeur peut gérer le contenu sans intervention technique, visiteurs sur mobile impeccable
**Current focus:** Phase 3 — Déploiement Vercel

## Current Position

Milestone: v1.0 Livraison Client
Phase: 12 (Livraison Client) — En attente actions humaines
Plan: 12-01 en cours (checkpoints humains bloquants)
Status: Site propre et déployé — en attente domaine + contenu + email Formspree client
Last activity: 2026-06-09 — SEO complet, actualités, nettoyage Vite, vars Vercel configurées

Progress:
- Milestone: [█████████░] 95%
- Phase 1: [██████████] 100%
- Phase 2: [██████████] 100%
- Phase 4: [██████████] 100%
- Phase 5: [██████████] 100%
- Phase 6: [██████████] 100%
- Phase 7: [██████████] 100%
- Phase 8: [░░░░░░░░░░] 0%

## Loop Position

```
PLAN ──▶ APPLY ──▶ UNIFY
  ✓        ○        ○     [Plan créé, awaiting approval]
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

### Deferred Issues

| Issue | Origin | Effort | Revisit |
|-------|--------|--------|---------|
| Liens réseaux sociaux non configurés | Pre-PAUL | S | Phase 7 plan 07-01 |
| Timeout fetch formulaire | Phase 2 | S | Post-livraison |
| SEO meta par page | Post-PAUL | M | Post-livraison |
| Bundle Sanity gros (5MB) | Post-PAUL | M | Post-livraison |
| Migration venue: re-sélectionner salle sur cours existants | Phase 4-04 | S | Avant saisie planning |

### Blockers/Concerns

- Email client dansandco@outlook.fr refusé par Formspree — à résoudre avant livraison
- Domaine non acheté — bloque DNS, NEXT_PUBLIC_SITE_URL, Search Console

## Session Continuity

Last session: 2026-06-09
Stopped at: Phase 12 en attente — dev terminé, checkpoints humains bloquants
Next action: Acheter domaine → connecter Vercel → remplir fallbackContent.ts pendant RDV mercredi
Resume file: `.paul/phases/12-livraison-client/12-01-SUMMARY.md`

---
*STATE.md — Updated: 2026-05-09*
