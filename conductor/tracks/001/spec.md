# Track 001 Specification: Project Initialization & Global Styles

## Overview
This track focuses on setting up the React/Vite/TypeScript environment and establishing the foundational visual styles that will be used throughout the project.

## Requirements
1.  **Project Setup:** Initialize a new Vite project with the `react-ts` template.
2.  **Dependencies:** Install `react-router-dom`, `lucide-react`, and `framer-motion`.
3.  **Global Styles:**
    -   Define a `:root` CSS variables palette for colors, spacing, and typography.
    -   Set up a clean CSS reset.
    -   Establish core typography (fonts, sizes, line heights).
    -   Create utility classes for common layouts (Flex, Grid, Containers).
4.  **Folder Structure:** Organize the `src/` directory for components, assets, hooks, and pages.

## Design Decisions
-   **Color Palette:**
    -   `--background`: #ffffff (White)
    -   `--text-primary`: #1a1a1a (Deep Charcoal)
    -   `--text-secondary`: #4a4a4a (Medium Gray)
    -   `--accent`: #c5a059 (A muted gold for elegance)
    -   `--surface`: #f9f9f9 (Light gray background for sections)
-   **Typography:** A high-quality sans-serif for body text (e.g., 'Inter') and a sophisticated serif or a geometric sans for headings to give a "pro" feel.

## Deliverables
-   Initialized Vite project.
-   `src/index.css` with global variables and reset.
-   Basic `App.tsx` layout with a centered placeholder.