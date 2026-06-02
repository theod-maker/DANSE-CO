---
phase: 09-data-layer
plan: 01
completed: 2026-06-02
---

# Phase 09 Plan 01: Data Layer Next.js — Summary

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: sanityFetch retourne les données | Pass | Build ✓, exports validés |
| AC-2: Route revalidate sécurisée (401/200) | Pass | parseBody + isValidSignature |
| AC-3: Draft mode activable | Pass | defineEnableDraftMode |
| AC-4: Draft mode désactivable | Pass | draftMode().disable() + redirect |

## Files Created

| File | Change |
|------|--------|
| `sanity/lib/client.ts` | createClient next-sanity, stega disabled (activé en phase 10) |
| `sanity/lib/fetch.ts` | defineLive → sanityFetch + SanityLive |
| `sanity/lib/queries.ts` | 11 queries GROQ portées depuis src/lib/ |
| `sanity/lib/live.ts` | Re-export SanityLive |
| `app/api/revalidate/route.ts` | Webhook Sanity → revalidateTag('sanity') |
| `app/api/draft/enable/route.ts` | defineEnableDraftMode |
| `app/api/draft/disable/route.ts` | draftMode().disable() + redirect |

## Déviations

1. **Import `next-sanity/live`** (pas `next-sanity`) — `defineLive` est dans le sous-module `/live`
2. **`fetchOptions` retiré** — non supporté dans `defineLive` v13

## Next

Plan 09-02 : Conversion des 9 pages en Server Components (remplacer hooks `useSanity` par `sanityFetch`).
