# Track 002 Implementation Plan: Common Components (Navigation & Footer)

## Objective
Implement global, professional, and responsive navigation and footer components to structure the site's layout.

## Implementation Steps

### Step 1: Create Component Structure
-   `mkdir -p src/components/layout`

### Step 2: Build the Navbar
-   Create `src/components/layout/Navbar.tsx`.
-   Implement sticky logic and the mobile hamburger menu using `useState`.
-   Add Lucide icons for the menu/close buttons.
-   Create `src/components/layout/Navbar.module.css`.

### Step 3: Build the Footer
-   Create `src/components/layout/Footer.tsx`.
-   Add contact and location info extracted from the Wix site.
-   Include placeholder social media icons.
-   Create `src/components/layout/Footer.module.css`.

### Step 4: Integrate into App
-   Update `src/App.tsx` to include `<Navbar />` and `<Footer />` as part of the main layout.

## Verification & Testing
1.  **Mobile View:** Test the hamburger menu toggle on different screen sizes.
2.  **Navigation Links:** Ensure all links update the URL and (eventually) navigate correctly.
3.  **Visual Polish:** Check the sticky blur effect and active state styles.
