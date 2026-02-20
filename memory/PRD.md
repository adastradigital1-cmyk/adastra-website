# Ad Astra Consultants — Premium Homepage

## Original Problem Statement
Build a world-class premium website homepage for "Ad Astra Consultants", a global talent solutions firm.

## Design System
- **Primary:** #F26522 (Orange), **White:** #FFFFFF, **Dark Grey:** #2B2B2B, **Light Grey:** #F4F4F4, **Black:** #111111
- **Typography:** Poppins (headings), Inter (body)
- **Animations:** Section fade-ins, number counters, hover effects, micro-interactions

## Architecture
- **Frontend:** React + TailwindCSS + Shadcn UI, served on port 3000
- **Backend:** FastAPI on port 8001, proxies form submissions to Supabase
- **Database:** User-managed Supabase (PostgreSQL)

## What's Been Implemented
- Full multi-section homepage (Hero, ForYou, Services, Industries, Differentiation, Trust, CTA, Footer)
- Hero section with user-provided infographic image on dark background, adaptive navbar
- Supabase integration for Contact, CV, Newsletter, Consultation forms via backend proxy
- Advanced animations: particle background, floating shapes, animated grid, hover effects
- Content from user-provided PDF integrated
- "Made with Emergent" badge removed
- Responsive design with mobile nav

## Key Files
- `/app/frontend/src/components/HeroSection.jsx` — Hero with infographic image
- `/app/frontend/src/components/Navbar.jsx` — Adaptive navbar (white text on dark, dark text on scroll)
- `/app/frontend/src/App.css` — Animations, hero-image-glow effect
- `/app/backend/server.py` — FastAPI with Supabase endpoints
- `/app/frontend/src/services/supabaseService.js` — API calls
- `/app/frontend/src/data/mock.js` — Content data

## API Endpoints
- `POST /api/newsletter`, `POST /api/contact`, `POST /api/cv`, `POST /api/consultation`

## DB Schema (Supabase)
- `newsletter_subscriptions`, `contact_submissions`, `cv_submissions`, `consultations`

## Backlog
- **P1:** Build additional pages (Find Talent, Find Jobs, Industries, Insights, About)
- **P2:** SEO optimization, mobile fine-tuning, performance optimization
- **P3:** Remove unused `/app/frontend/src/lib/supabase.js`
