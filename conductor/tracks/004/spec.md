# Track 004 Specification: Planning (Interactive Class Schedule)

## Overview
This track focuses on the Class Schedule page, which is the most visited part of a dance school website. It needs to be clear, filterable, and highly readable on all devices.

## Requirements
1.  **Schedule Grid:**
    -   Weekly view (Monday to Saturday).
    -   Each entry: Class name (e.g., Danse Sportive), Level, Time range, and Venue (e.g., Le Canopus).
    -   Color-coded categories for different styles (optional but recommended).
2.  **Filtering (Stitch Inspired):**
    -   Quick filter buttons for days or levels.
    -   Clean, modern tab-like interface for switching views.
3.  **Mobile View:**
    -   Transform the grid into a scrollable list or a day-by-day vertical view for better readability on small screens.
4.  **Registration Note:**
    -   Clear reminder about registration hours (Permanences) and requirements (Medical certificate, ID photo).

## Design Decisions
-   **Typography:** Small, high-contrast labels for "Level" and "Venue".
-   **Interactions:** Hover effects on schedule cards to highlight the selected class.
-   **Clarity:** Use plenty of whitespace between time slots.

## Deliverables
-   `src/pages/Planning.tsx` (fully implemented).
-   `src/components/planning/ScheduleGrid.tsx` and `src/components/planning/ScheduleGrid.module.css`.
-   `src/components/planning/RegistrationInfo.tsx`.
-   Integration into `App.tsx` routing.
