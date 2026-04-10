# Danse & CO - Project Overview

## Purpose
Danse & CO is a professional, modern web application for a dance association based in Saint-Michel-Chef-Chef. It replaces a legacy 

Wix site with a high-performance, elegant, and "clean" web presence focused on "Danse Sportive" and social dance styles.

## Core Technologies
- **Framework:** React 18 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (CSS Variables, Flexbox, Grid) with a mobile-first approach.
- **Animations:** Framer Motion for smooth transitions and scroll-reveal effects.
- **Icons:** Lucide React
- **Routing:** React Router 6

## Architecture
- **Single Page Application (SPA):** Managed via `react-router-dom`.
- **Component-Based:** Organized into `src/components` (UI/Layout) and `src/pages` (Feature-level pages).
- **Modular Styles:** Components use CSS Modules (`*.module.css`) for encapsulated styling.
- **Data-Driven:** Key content like class schedules are centralized in `src/data/` for easy updates.
- **Conductor Managed:** The project follows a phased implementation plan documented in the `conductor/` directory.

## Building and Running
- `npm run dev`: Starts the development server with Hot Module Replacement.
- `npm run build`: Compiles the project using TypeScript and Vite for production.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run preview`: Previews the production build locally.

## Development Conventions
- **Styling:** Favor Vanilla CSS over frameworks. Use global variables defined in `src/index.css` for colors, spacing, and typography to ensure consistency.
- **Animations:** Use `framer-motion` for a premium feel (page transitions, entrance animations).
- **Icons:** Always use `lucide-react` for a consistent iconography style.
- **Responsive Design:** Use a mobile-first strategy and `clamp()` for fluid typography.
- **Project Tracking:** Refer to `conductor/tracks.md` for current progress and technical specifications of individual modules.
