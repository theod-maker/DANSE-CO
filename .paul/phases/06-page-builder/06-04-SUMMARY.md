---
phase: 06-page-builder
plan: 04
type: summary
status: complete
date: 2026-05-06
---

# 06-04 Summary — Migration pages + seed

## Done

- Migrated 7 pages with graceful fallback pattern:
  - AsmeIndex.tsx → usePage('/')
  - Disciplines.tsx → usePage('/disciplines')
  - Instructors.tsx → usePage('/instructors')
  - Planning.tsx → usePage('/planning')
  - Pricing.tsx → usePage('/pricing')
  - Locations.tsx → usePage('/locations')
  - Contact.tsx → usePage('/contact')
- Each page: if pageData → BlockRenderer, else → existing static layout (unchanged)
- Created `scripts/seed-pages.mjs` — idempotent createOrReplace for 7 pages

## Verification

- `npx tsc --noEmit` → 0 errors
- All pages work in fallback mode (no Sanity page document needed)
- Seed script creates all 7 page documents with correct blocks

## AC Status

- AC-1 ✅ Pages migrées avec fallback
- AC-2 ✅ Pages pilotées par Sanity (via BlockRenderer)
- AC-3 ✅ Seed des données — 7 pages dans studio "🗂️ Pages"
