# Design : Migration Next.js + Sanity Live Preview

**Date :** 2026-06-02
**Statut :** Approuvé

---

## Objectif

Migrer le site Danse&CO de Vite/React SPA vers Next.js 15 pour offrir au client :
- Preview temps réel dans le Studio (Presentation Tool)
- Visual editing click-to-edit sur le site
- ISR avec revalidation automatique à la publication

Le site reste visuellement identique. Seule la mécanique de rendu change.

---

## Stack cible

| Couche | Avant | Après |
|--------|-------|-------|
| Framework | Vite + React 19 SPA | Next.js 15 App Router + React 19 |
| Rendu | Client-side | Server Components (ISR) |
| Data fetching | Hooks `useSanity` | `sanityFetch` server-side |
| Styles | Tailwind v4 | Tailwind v4 (inchangé) |
| Animations | Framer Motion | Framer Motion (client components) |
| CMS | Sanity v5 | Sanity v5 (inchangé) |
| Hébergement | Vercel (cible) | Vercel (inchangé) |

---

## Architecture

```
app/
├── page.tsx                        ← Home (ISR)
├── disciplines/page.tsx
├── instructors/page.tsx
├── pricing/page.tsx
├── planning/page.tsx
├── locations/page.tsx
├── contact/page.tsx
├── histoire/page.tsx
├── actualites/page.tsx
├── studio/[[...tool]]/page.tsx     ← Sanity Studio (inchangé)
└── api/
    ├── draft/enable/route.ts       ← Active draft mode
    ├── draft/disable/route.ts      ← Désactive draft mode
    └── revalidate/route.ts         ← Webhook Sanity → ISR revalidation

sanity/
├── lib/
│   ├── fetch.ts                    ← sanityFetch avec draft mode support
│   ├── live.ts                     ← Live content configuration
│   └── queries.ts                  ← GROQ queries (depuis sanityQueries.ts)
└── schemaTypes/                    ← Inchangé

components/                         ← Inchangé (UI pur React)
```

---

## Système de preview

### ISR + Webhook

1. Client publie dans Sanity Studio
2. Sanity envoie POST vers `/api/revalidate` (webhook secret sécurisé)
3. Next.js revalide les pages concernées (`revalidatePath` ou `revalidateTag`)
4. Pages regénérées en arrière-plan, visiteurs voient le contenu frais

### Draft mode + Presentation Tool

- Plugin `@sanity/presentation` ajouté dans `sanity.config.ts`
- Le Studio affiche le site en iframe à droite pendant l'édition
- Draft mode activé via `/api/draft/enable` (cookie sécurisé)
- `sanityFetch` détecte le cookie → retourne les drafts non publiés
- Mises à jour en temps réel via `@sanity/react-loader` live queries

### Visual Editing (click-to-edit)

- `@sanity/visual-editing` installé côté site
- Encodage stega sur tous les strings retournés par `sanityFetch`
- En mode draft, overlays cliquables apparaissent sur chaque champ
- Click → le Studio ouvre directement le bon document au bon champ

---

## Plan de migration (4 phases PAUL)

### Phase A — Next.js Foundation
- Remplacer Vite par Next.js 15 (`create-next-app` ou migration manuelle)
- Configurer App Router, `next.config.ts`
- Adapter Tailwind v4 (PostCSS config)
- Vérifier Framer Motion en `"use client"`
- Build sans erreur TypeScript

### Phase B — Data Layer
- Créer `sanity/lib/fetch.ts` avec `sanityFetch` + draft mode
- Créer `sanity/lib/live.ts` pour live queries
- Migrer GROQ queries depuis `src/lib/sanityQueries.ts`
- Convertir les 9 pages en Server Components (remplacer hooks)
- Routes API : `/api/revalidate`, `/api/draft/enable`, `/api/draft/disable`
- Supprimer `src/hooks/useSanity.ts` (remplacé)

### Phase C — Visual Editing
- Installer `@sanity/presentation` + `@sanity/visual-editing`
- Ajouter plugin Presentation dans `sanity.config.ts` avec URL preview
- Encoder les strings avec stega via `sanityFetch`
- Ajouter `VisualEditing` component dans le layout (client)
- Tester click-to-edit sur chaque type de contenu

### Phase D — Déploiement Vercel
- Variables d'env : `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`
- Configurer webhook Sanity → URL Vercel prod
- Tester ISR en production
- Guide client : comment utiliser le preview dans le Studio

---

## Contraintes

- Pas de changement visuel — le site doit être identique pixel-perfect
- Stack fixe : pas de nouvelles dépendances au-delà de l'écosystème Next.js + Sanity
- Client non-technique : le Studio doit rester simple, le visual editing est un bonus UX
- Vercel gratuit : ISR et draft mode sont supportés sur le plan hobby

---

## Critères d'acceptation

- [ ] Build Next.js sans erreur TypeScript
- [ ] Les 9 pages s'affichent identiquement à l'original
- [ ] Modification dans Sanity → site mis à jour en moins de 10 secondes
- [ ] Presentation Tool affiche le site en iframe dans le Studio
- [ ] Click sur un élément en mode preview → ouvre le bon champ dans Studio
- [ ] Draft mode : contenu non publié visible en preview, invisible en prod
