---
phase: 08-nextjs-foundation
plan: 02
completed: 2026-06-02
---

# Phase 08 Plan 02: Migration 9 pages → Next.js App Router — Summary

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: 9 pages accessibles | Pass | 11 routes dans le build output |
| AC-2: Studio Sanity accessible | Pass | /studio ƒ dynamic |
| AC-3: Navigation next/link | Pass | AppNavbar + AppFooter migrés |
| AC-4: Vite supprimé | Pass | index.html, vite.config.ts, main.tsx, App.tsx supprimés |

## Files Created/Modified

| File | Change |
|------|--------|
| `app/*/page.tsx` (9 pages) | Migré depuis src/legacy-pages/ |
| `app/studio/[[...tool]]/page.tsx` | Studio Sanity via next-sanity NextStudio |
| `app/layout.tsx` | DynamicWrapper ssr:false pour framer-motion |
| `src/components/layout/AppNavbar.tsx` | react-router-dom → next/link + usePathname |
| `src/components/layout/AppFooter.tsx` | react-router-dom → next/link |
| `src/components/layout/ScrollToTop.tsx` | useLocation → usePathname |
| `src/components/layout/Navbar.tsx` | NavLink/useLocation → Link/usePathname |
| `src/components/layout/Footer.tsx` | react-router-dom → next/link |
| `src/components/home/Hero.tsx` | react-router-dom → next/link |
| `src/components/blocks/HeroBlock.tsx` | react-router-dom → next/link |
| `src/components/blocks/PricingBlock.tsx` | react-router-dom → next/link |
| `src/components/blocks/CtaBlock.tsx` | react-router-dom → next/link |
| `src/components/asme/FeaturedVideoSection.tsx` | react-router-dom → next/link |
| `src/components/asme/ServicesSection.tsx` | react-router-dom → next/link |
| `src/components/contact/ContactForm.tsx` | VITE_ → NEXT_PUBLIC_ |
| `src/lib/sanityClient.ts` | import.meta.env → process.env |
| `src/hooks/useSanity.ts` | import.meta.env.DEV → process.env.NODE_ENV |
| `src/components/layout/DynamicWrapper.tsx` | Nouveau : wrapper ssr:false |
| `src/components/layout/ClientBoundary.tsx` | Nouveau : client boundary |
| `next.config.ts` | transpilePackages, webpack react alias |
| `package.json` | framer-motion 11→12, next-sanity ajouté |

## Déviations de scope

1. **Composants src/components/ modifiés** : la boundary "ne pas toucher src/components/" a dû être levée car 9 composants utilisaient encore react-router-dom, bloquant la compilation.
2. **`export const dynamic = 'force-dynamic'`** sur toutes les pages : nécessaire mais pas suffisant.
3. **DynamicWrapper ssr:false** : framer-motion 12 + Next.js 15 causait `Cannot read properties of null (reading 'useContext')` même avec force-dynamic. Résolu via un wrapper client `ssr:false` dans le layout — les pages deviennent purement client-side (identique au comportement Vite).
4. **framer-motion 11→12** : mise à jour requise pour compatibilité React 19.
5. **webpack alias react** + **transpilePackages sanity** : nécessaires pour résoudre `useEffectEvent` non exporté dans le build ESM de sanity.

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| DynamicWrapper ssr:false dans layout | Seule solution stable pour framer-motion + Next.js 15 SSR sans refactor massif |
| `force-dynamic` sur toutes les pages | Conservé — sera remplacé par Server Components en 09-02 |
| framer-motion 12 | Compatibilité React 19 — breaking changes minimes pour notre usage |

## Next

Phase 09-01 : sanityFetch server-side + API routes revalidate/draft.
