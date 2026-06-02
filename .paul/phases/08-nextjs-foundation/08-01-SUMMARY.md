---
phase: 08-nextjs-foundation
plan: 01
completed: 2026-06-02
---

# Phase 08 Plan 01: Next.js Foundation — Summary

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Build sans erreur | Pass | `next build` ✓ Route (app) / statique |
| AC-2: Dev server port 5247 | Pass | Ready in 1218ms sur localhost:5247 |
| AC-3: CSS + fonts chargés | Pass | globals.css copié, ordre @import corrigé |

## Files Created/Modified

| File | Change |
|------|--------|
| `package.json` | next@15.3.0, scripts next, suppression vite + react-router-dom |
| `next.config.ts` | transpilePackages sanity, remotePatterns, outputFileTracingRoot |
| `tsconfig.json` | Config Next.js App Router, moduleResolution bundler |
| `postcss.config.mjs` | @tailwindcss/postcss pour Tailwind v4 |
| `app/globals.css` | Copie de src/index.css, @import Google Fonts déplacé en premier |
| `app/layout.tsx` | Layout racine avec metadata |
| `app/page.tsx` | Placeholder temporaire (remplacé en 08-02) |
| `next-env.d.ts` | Généré par Next.js |

## Déviation de scope

`src/pages/` renommé en `src/legacy-pages/` — Next.js détectait le répertoire comme Pages Router et tentait de compiler les fichiers, provoquant des erreurs `react-router-dom` introuvable. Correction nécessaire et sans risque.

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| `exclude: ["src", "vite.config.ts"]` dans tsconfig | Empêche type-check des fichiers Vite pendant la coexistence |
| `outputFileTracingRoot` dans next.config.ts | Supprime warning lockfile multiple |
| Google Fonts via CSS @import (pas next/font) | Cohérence avec l'existant, fonts déjà définies dans globals.css |

## Next

Plan 08-02 : Migration des 9 pages `src/legacy-pages/` → `app/*/page.tsx` + route Studio.
