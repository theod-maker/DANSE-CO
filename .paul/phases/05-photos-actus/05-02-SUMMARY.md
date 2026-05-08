# Summary: 05-02 — Section Actualités

**Status:** COMPLETE
**Date:** 2026-05-07

## What was built

### Schema Sanity
- `sanity/schemaTypes/news.ts` — nouveau schema : title, date, image, excerpt, link, published
- `sanity/schemaTypes/index.ts` — newsType ajouté
- `sanity.config.ts` — "📢 Actualités" ajouté dans le menu studio

### Data layer
- `fallbackContent.ts` — interface `NewsContent` + `fallbackNews` (2 exemples)
- `sanityQueries.ts` — `newsQuery` (filtre published=true, ordre date desc)
- `hooks/useSanity.ts` — `useNews()` hook

### Composants
- `src/components/asme/NewsSection.tsx` — nouveau composant, retourne null si tableau vide
- `src/pages/AsmeIndex.tsx` — `<NewsSection news={news} />` entre ServicesSection et AppFooter

## Verification
- `npx tsc --noEmit` → 0 erreur
- checkpoint:human-verify → approved
