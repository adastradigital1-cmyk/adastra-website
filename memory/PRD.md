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
- `/about` — About Us (full rewrite with 10 sections + real team photos)
- `/contact` — Contact Us
- `/solutions` — Solutions/Services
- `/careers` — Careers at Ad Astra
- `/blog` — Blog/Insights (placeholder)
- `/impact` — Our Impact (full rewrite with 11 sections)
- `/find-talent` — Find Talent
- `/find-jobs` — Find Jobs
- `/industries` — Industries We Serve

## What's Been Implemented

### Phase 0: Design System (Feb 2026)
- Custom fonts, CSS variables, glass-morphism, pill buttons, noise textures
- Premium navbar + footer

### Phase 1: Homepage Rebuild (Feb 2026)
- Video Section, hero, ForYou, Stats, Services, Industries strip, Trust, CTA

### Phase 2: Content Pages (Feb 2026)
- **Find Talent Page** — 8 sections
- **Find Jobs Page** — 8 sections
- **Solutions Page** — 8 sections revamped
- **Industries Page** — 7 sections: Hero, Specialisation, 8 expandable industry cards, Cross-Sector, Global Insight, Expertise, CTA
- **Impact Page** — 11 sections: Hero, Scale (5 stats), Leadership, Enterprise Scaling, Workforce, Industry-Specific (8 cards), Candidate, Thought Leadership, Partnership + Data-Driven, Visual Summary, CTA
- **About Page** — 11 sections: Hero, Who We Are, Journey, Philosophy, Founders (with real team photos), Team, Values, Global Footprint, Differentiation, Impact, CTA

### Navbar Updates
- About moved to 2nd position (beside Home)
- Industries link fixed from #industries to /industries

### Team Photos Added
- Jayanthi Yeshwant Kumar (Chairperson & Founder)
- Nirupama VG (Managing Director & Co-Founder)
- Sourav Bose (Co-Founder & Vice President)
- Bikram (Vice President)

## Testing
- iteration_1-3: Previous tests
- iteration_4: Industries page (13/13 PASS)
- iteration_5: Impact page (15/15 PASS)
- iteration_6: About page + navbar (15/15 PASS)

## API Endpoints
- `POST /api/newsletter`, `POST /api/contact`, `POST /api/cv`, `POST /api/consultation`

## Backlog
- **P1: Build Insight Detail Page** — Blog article template
- **P1: Fix Vercel Deployment** — Build failing with module resolution errors
- **P2: Individual service detail pages**
- **P2: Individual industry detail pages**
- **P2: Connect forms end-to-end**
- **P3: Code cleanup** — Remove obsolete modals, legacy files
- **P3: SEO optimization, performance tuning**
