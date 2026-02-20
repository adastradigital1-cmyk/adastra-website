# Ad Astra Consultants — Premium Global Brand Website

## Original Problem Statement
Build a world-class premium website for "Ad Astra Consultants" — a global talent solutions firm. The design should match top-tier consulting firms (McKinsey, Bain, Stripe, Linear.app) with bold visual confidence.

## Design System (Applied Feb 2026)
- **Fonts:** Fraunces (serif headlines), Outfit (body), IBM Plex Mono (labels/tags)
- **Colors:** CSS variables — `--orange-core: #E8601C`, `--black-rich: #0C0C0C`, `--white-warm: #FAF8F5`, `--white-cream: #F2EDE8`
- **Cards:** Glass-morphism (`.glass-card-dark`, `.glass-card-light`) with backdrop blur
- **Buttons:** Pill-shaped (border-radius: 100px), `.btn-primary`, `.btn-secondary`
- **Layout:** Asymmetric, left-aligned headlines, dark/light alternating sections
- **Motion:** Scroll reveals, staggered cards, stat counters, gradient mesh
- **Extras:** Noise texture overlay, numbered sections (01, 02, 03...), accent lines, pull quotes

## Architecture
- **Frontend:** React + TailwindCSS + react-router-dom, port 3000
- **Backend:** FastAPI, port 8001, proxies to Supabase
- **Database:** User-managed Supabase (PostgreSQL)

## Routes
- `/` — Homepage
- `/about` — About Us

## What's Been Implemented
### Phase 0: Design System (Feb 2026)
- New fonts (Fraunces, Outfit, IBM Plex Mono) via Google Fonts
- Complete CSS variable system for colors, borders, glass effects
- Glass-morphism card classes, pill buttons, noise textures
- Premium navbar (dark glass blur on scroll, pill CTA)
- Premium footer (newsletter band, 5-column grid, darkest bg)

### Phase 1: Homepage Rebuild (Feb 2026)
- Dark hero with animated gradient mesh, left-aligned headline, geometric accent
- ForYou section (warm white, glass cards, asymmetric header)
- Stats ribbon (dark, animated counters: 18+, 250+, 50+, 10,000+)
- Services section (numbered glass cards with icons)
- Industries (dark, infinite scroll strip)
- Trust/Recognition (cream bg, media logos, awards, pull quote testimonial)
- CTA band (dark, centered headline + two pill buttons)

### Phase 2: About Page Redesign (Feb 2026)
- Dark hero, Who We Are (asymmetric), Mission/Vision (glass-card-dark)
- Values (numbered cards), Leadership (image treatment with grayscale)
- Global Footprint (stat counters), Why Ad Astra, Authority quote, CTA

### Previous Work (Retained)
- Supabase integration for all forms (Contact, CV, Newsletter, Consultation)
- "Made with Emergent" badge hidden

## Testing
- iteration_1.json: About page tests (17/17 PASS) — old design
- iteration_2.json: Full redesign tests (14/14 frontend, 13/13 backend PASS)

## API Endpoints
- `POST /api/newsletter`, `POST /api/contact`, `POST /api/cv`, `POST /api/consultation`

## Backlog (Sequential)
- **P0: Contact Page** — Segmented inquiry form, office details, response commitment
- **P1: Find Talent** — Landing + 5 subpages (Executive Search, Contingency, RPO, Temp Staffing, Workforce Advisory)
- **P1: Find Jobs** — Landing + 4 subpages (Process, CV Tips, Interview Prep, Submit CV)
- **P2: Industries** — Landing + 8 subpages
- **P2: Insights** — Landing + 3 subpages (Research, Blog, Media)
- **P3:** Leadership photos — replace stock with real team photos
- **P3:** SEO optimization, performance tuning
