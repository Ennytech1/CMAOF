# Original User Request

## 2026-10-30T23:32:15Z

Complete overhaul of the Chief Michael Ade.Ojo Foundation (CMAOF) web platform to strictly adhere to the official Corporate Brand Manual, aligning typography, color systems, logo guidelines, co-branding conventions, and the 4-pillar branded house architecture across the application.

Working directory: c:\Users\Ennyintech\Desktop\CMAOF
Integrity mode: development

## Requirements

### R1. Corporate Brand Identity & Design Token System
- Replace legacy colors and typography across `client/src/index.css`, Tailwind setup, and all page components with the official CMAOF Brand Manual tokens:
  - Primary Colours: CMAO Earth Brown (`#582E19`, rgb(91, 46, 25)) and CMAO Sun Yellow (`#FCCD37`, rgb(252, 205, 55)).
  - Secondary Colours: CMAO Light Grey (`#848688`), CMAO Green (`#338C26`), CMAO Blue (`#0047BA`).
  - Typography System: Montserrat as the primary corporate typeface (accounting for >= 90% of total UI and typography), Open Sans as secondary supporting typeface, and Arial as system fallback. Discontinue legacy fonts (Caveat, Inter, Playfair Display) except where display font is used sparingly for celebrations.
  - Define and apply CSS custom properties: `--cmao-earth-brown`, `--cmao-sun-yellow`, `--cmao-light-grey`, `--cmao-green`, `--cmao-blue`, `--font-primary`, `--font-secondary`, `--font-fallback`, `--logo-clear-space: 0.5`, `--watermark-opacity: 0.08`.

### R2. Logo Integrity, Lockups & Co-Branding Implementation
- Implement the official logo rules in `CmaofLogo.jsx`, headers, banners, and footers:
  - Primary lockup: Full-colour (Sun Yellow emblem with Earth Brown text/accents).
  - Secondary lockup: Earth Brown single-colour on cream/light background; Monochrome for grayscale applications.
  - Enforce the minimum clear space buffer of 0.5x (half the height of the Tree of Good emblem) around all logo placements.
  - Implement the vertical split bar co-branding rule in `OurPartners.jsx` and partner displays: Partner logo on the left, vertical separator bar in the center, CMAO Foundation logo on the right.

### R3. Branded House Architecture & Four Strategic Pillars
- Update the Foundation's strategic pillars from the obsolete 3-pillar structure to the official 4 sub-brand extensions:
  1. EDUCATION & OPPORTUNITY
  2. HEALTH & WELLBEING
  3. HUMANITARIAN SUPPORT
  4. ECONOMIC EMPOWERMENT
- Position sub-brand extension titles subtly beneath the master visual identity in vertical lockup style, update card paths (`/our-work/...`), badges, icons, and summaries.

### R4. Extended Visual Assets & High-Contrast Design Elevation
- Integrate extended brand assets into the interface:
  - Subtle watermark / ghosted emblem elements at 5%–10% opacity (`--watermark-opacity: 0.08`).
  - Brand pattern and supergraphic visual motifs across hero sections, cards, and banners.
  - Eliminate low-contrast, washed-out text and busy backgrounds, ensuring AA/AAA contrast compliance across light and dark surfaces.

## Acceptance Criteria

### Brand System & Typography
- [ ] `client/src/index.css` defines the exact brand CSS variables (`--cmao-earth-brown`, `--cmao-sun-yellow`, `--cmao-light-grey`, `--cmao-green`, `--cmao-blue`, `--font-primary`, `--font-secondary`, `--font-fallback`, `--logo-clear-space`, `--watermark-opacity`).
- [ ] Montserrat is loaded with weights 200–800 and applied as the base font across all UI elements (`html`, `body`, headers, buttons, inputs).
- [ ] No remaining references to the obsolete `--cmaof-green: #06402B` or legacy orange `#EA580C` as primary branding colors.

### Logo & Co-Branding Compliance
- [ ] `CmaofLogo.jsx` and all logo instances adhere to the 0.5x clear space rule and provide both vertical stack and horizontal configurations.
- [ ] Partnership / co-branding components format partner logos on the left, separated by a vertical split bar from the CMAO Foundation logo on the right.

### Four Sub-Brand Pillars
- [ ] `StrategicPillars.jsx` and `/our-work` display the 4 official extensions: Education & Opportunity, Health & Wellbeing, Humanitarian Support, Economic Empowerment.
- [ ] All 4 pillar cards have working links, dedicated pathways, and compliant brand color badges.

### Programmatic Build & Verification
- [ ] Client builds with zero errors (`npm run build --prefix client`).
- [ ] All routes and interactive components (Navbar, Donate modal, Search modal, Mobile drawer, Footers) render without console errors.
