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
- `/contact` — Contact Us
- `/solutions` — Solutions/Services
- `/careers` — Careers at Ad Astra
- `/blog` — Blog/Insights (placeholder)
- `/impact` — Our Impact (placeholder)
- `/find-talent` — Find Talent
- `/find-jobs` — Find Jobs
- `/industries` — Industries We Serve

## What's Been Implemented

### Phase 0: Design System (Feb 2026)
- New fonts (Fraunces, Outfit, IBM Plex Mono) via Google Fonts
- Complete CSS variable system for colors, borders, glass effects
- Glass-morphism card classes, pill buttons, noise textures
- Premium navbar (dark glass blur on scroll, pill CTA)
- Premium footer (newsletter band, 5-column grid, darkest bg)

### Phase 1: Homepage Rebuild (Feb 2026)
- Video Section above hero with play/pause/mute controls
- Dark hero with animated gradient mesh, left-aligned headline, geometric accent
- ForYou section, Stats ribbon, Services section, Industries strip
- Trust/Recognition, CTA band

### Phase 2: About Page Redesign (Feb 2026)
- Dark hero, Who We Are, Mission/Vision, Values, Leadership, Global Footprint

### Phase 3: Content Pages (Feb 2026)
- **Find Talent Page** (`/find-talent`) — 8 sections with comprehensive content
- **Find Jobs Page** (`/find-jobs`) — 8 sections with comprehensive content
- **Solutions Page** (`/solutions`) — 8 sections revamped with new content
- **Industries Page** (`/industries`) — 7 sections: Hero, Why Specialisation, Industries We Serve (8 expandable cards), Cross-Sector Capabilities, Global & Local Insight, Why Expertise Matters, Final CTA

### Previous Work (Retained)
- Supabase integration for forms (Contact, CV, Newsletter, Consultation)
- Contact Page, Careers Page

## Testing
- iteration_1.json: About page tests (17/17 PASS)
- iteration_2.json: Full redesign tests (14/14 frontend, 13/13 backend PASS)
- iteration_3.json: Glass-morphism UI tests (12/12 PASS)
- iteration_4.json: Industries page tests (13/13 PASS)

## API Endpoints
- `POST /api/newsletter`, `POST /api/contact`, `POST /api/cv`, `POST /api/consultation`

## Backlog (Sequential)
- **P1: Build Insight Detail Page** — Template for individual blog/insight articles
- **P1: Fix Vercel Deployment** — Build failing with module resolution errors
- **P2: Individual service detail pages** (e.g., `/services/executive-search`)
- **P2: Individual industry detail pages**
- **P2: Connect forms end-to-end** — Test Contact, CV, Consultation submissions
- **P3: Code Cleanup** — Remove obsolete modals, legacy supabase.js, consolidate deployment configs
- **P3: SEO optimization, performance tuning**
