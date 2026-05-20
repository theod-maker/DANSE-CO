---
phase: 07-contenu-pdf
plan: 01
subsystem: ui
tags: [react, fallback, nav, sanity, typescript]

requires: []
provides:
  - 4 disciplines manquantes dans fallbackDisciplines (Lindy Hop, Multidanses, Danse en ligne, Cours enfants)
  - Navbar alignée sur le PDF client (labels + ordre + routes)
  - Réseaux sociaux conditionnels + sanitisés dans AppFooter/Footer
  - Instructeurs réels (Adrien Mullot, Sarah Babin) + tarifs réels PDF
affects: [déploiement, saisie-contenu-sanity]

tech-stack:
  added: []
  patterns:
    - sanitizeUrl() dans useSanity.ts pour toutes les URLs sociales issues de Sanity
    - Badges instructor conditionnels si champ vide

key-files:
  modified:
    - src/lib/fallbackContent.ts
    - src/components/layout/AppNavbar.tsx
    - src/components/layout/AppFooter.tsx
    - src/components/layout/Footer.tsx
    - src/components/blocks/DisciplinesGridBlock.tsx
    - src/pages/Disciplines.tsx
    - src/hooks/useSanity.ts
    - src/pages/Instructors.tsx
    - src/components/contact/ContactForm.tsx

key-decisions:
  - "Users ajouté à l'union iconName + ICON_MAP plutôt que substitution — meilleure expressivité"
  - "sanitizeUrl() dans useSiteInfo — centralise la validation pour tous les consumers"
  - "Nos Salles remis dans la nav à la demande (hors PDF mais utile)"
  - "Danses de Salon supprimée — absente du PDF client"

duration: ~40min
completed: 2026-05-20T09:00:00Z
---

# Phase 7 Plan 01 : Contenu PDF — Data + Navigation + Sécurité

**Disciplines PDF, instructeurs réels, tarifs réels, navbar alignée sur le PDF + sanitisation URLs sociales.**

## Acceptance Criteria Results

| Critère | Statut | Notes |
|---------|--------|-------|
| AC-1 : 4 disciplines manquantes | Pass | 8 disciplines au total dans fallbackDisciplines |
| AC-2 : Navbar alignée PDF | Pass | Ordre + labels exacts du PDF + Nos Salles conservé |
| AC-3 : Footer routes corrigées | Pass | AppFooter (footer réel) corrigé |
| AC-4 : Socials conditionnels | Pass | + sanitizeUrl() anti-injection protocole |

## Commits

| Commit | Description |
|--------|-------------|
| `63c4676` | feat(contenu) : disciplines PDF, nav alignée, tarifs et membres réels |
| `fab8279` | fix(sécu) : sanitisation URLs sociales + badges instructeur conditionnels |
| `2a7ccb9` | fix(nav) : ordre des onglets aligné sur le PDF client |
| `4907208` | fix(contenu) : descriptions danses PDF, suppression Danses de Salon, prénom formulaire |
| `d9b885e` | fix(nav) : remet Nos Salles dans la nav |
| `da3ec6f` | fix(contenu) : supprime Danses de Salon (absent du PDF) |
| `425a5d9` | feat(social) : URL Facebook renseignée dans fallback |

## Déviations

| Type | Détail |
|------|--------|
| Auto-fix | Footer.tsx est du code legacy (non utilisé) — AppFooter.tsx est le vrai footer, corrigé en plus |
| Auto-fix | iconName union + ICON_MAP étendu dans 2 fichiers (DisciplinesGridBlock + Disciplines) |
| Auto-fix | Badges specialty/experience conditionnels ajoutés (QA) |
| Auto-fix | sanitizeUrl() ajouté (sécu) |
| Scope | Descriptions Rock'n roll, WCS, Salsa cubaine corrigées selon PDF exact |
| Scope | Champ Prénom ajouté au formulaire contact (PDF : nom + prénom + mail + objet + message) |
| Scope | Facebook URL renseignée depuis recherche web |

## Next Phase Readiness

**Ready :** Données fallback cohérentes avec le PDF, nav correcte, sécurité URLs sociales en place.
**Concerns :** Instagram URL manquante (client à confirmer). Sarah Babin sans bio.
**Blockers :** Aucun.

---
*Phase: 07-contenu-pdf, Plan: 01 — Completed: 2026-05-20*
