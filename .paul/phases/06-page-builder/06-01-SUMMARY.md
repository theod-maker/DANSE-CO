---
phase: 06-page-builder
plan: 01
type: summary
status: complete
date: 2026-05-06
---

# 06-01 Summary — Schemas Sanity

## Done

- Created `sanity/schemaTypes/blocks/` with 14 block schemas
  - 7 simple blocks: heroBlock, pageHeaderBlock, richTextBlock, imageBlock, galleryBlock, ctaBlock, dividerBlock
  - 7 data marker blocks: disciplinesGridBlock, instructorsGridBlock, scheduleBlock, pricingBlock, venuesBlock, newsBlock, contactBlock
- Created `sanity/schemaTypes/page.ts` — document type with `blocks` array accepting all 14 block types
- Updated `sanity/schemaTypes/index.ts` — exports all 15 new types
- Updated `sanity.config.ts` — added "🗂️ Pages" section before closing items

## Verification

- `npx tsc --noEmit` → 0 errors
- 14 files in sanity/schemaTypes/blocks/
- sanity/schemaTypes/page.ts created
- Studio structure updated with Pages section

## AC Status

- AC-1 ✅ Blocs simples définis
- AC-2 ✅ Blocs de données définis
- AC-3 ✅ Schema page défini
