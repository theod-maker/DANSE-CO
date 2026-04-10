# Track 002 Specification: Common Components (Navigation & Footer)

## Overview
This track focuses on the global navigation and footer components that will provide a consistent structure and professional look across all pages.

## Requirements
1.  **Navigation Bar:**
    -   Logo ("Danse & CO" with a stylized touch).
    -   Links: Accueil, Planning, Professeurs, Disciplines, Tarifs, Contact.
    -   Sticky position on scroll.
    -   Responsive mobile menu (hamburger).
    -   Active link state highlighting.
2.  **Footer:**
    -   Quick Links.
    -   Contact Info (Phone, Email, Mailing Address).
    -   Locations (names and small icons).
    -   Social icons (Instagram, Facebook).
    -   Copyright notice.

## Design Decisions
-   **Typography:** Navigation links in a clean, uppercase sans-serif.
-   **Visuals:** Subtle blur effect on sticky navigation (`backdrop-filter: blur()`) to add a modern feel.
-   **Icons:** Use `lucide-react` for the menu, contact details, and locations.

## Deliverables
-   `src/components/layout/Navbar.tsx` and `src/components/layout/Navbar.module.css`.
-   `src/components/layout/Footer.tsx` and `src/components/layout/Footer.module.css`.
-   Integration into `App.tsx`.
