# Ad Astra Consultants — Premium Global Brand Website

## Original Problem Statement
Build a world-class premium website for "Ad Astra Consultants" — a global talent solutions firm.

## Architecture
- **Frontend:** React + TailwindCSS + react-router-dom, port 3000
- **Backend:** FastAPI, port 8001, proxies to Supabase

## Routes
`/` Home | `/about` About Us | `/contact` Contact | `/solutions` Solutions | `/careers` Careers | `/blog` Blog (placeholder) | `/impact` Impact | `/find-talent` Find Talent | `/find-jobs` Find Jobs | `/industries` Industries

## What's Been Implemented

### Homepage Features (Feb 2026)
- Video Section + Hero (parallax removed for text visibility)
- **Particle Woman Section** — interactive canvas animation of empowered woman silhouette, reacts to mouse
- ForYou Section (linked to /find-talent, /find-jobs, /solutions)
- Services Section (Learn More links to /solutions)
- Industries scrolling strip (links to /industries)
- Differentiation, Trust sections
- **Leader's Message Section** — Jayanthi & Nirupama photos with founder messages
- CTA Section

### Global Features
- **WhatsApp Button** — bottom-right floating, prefilled message to +91 98441 10041
- **Chat Widget** — bottom-left AI-powered knowledge base chatbot (no external API dependency)
- **ScrollToTop** — pages scroll to top on navigation
- Navbar: Home, About, Find Talent, Find Jobs, Solutions, Industries, Impact, Careers, Blog

### Content Pages
- **About Page** — 11 sections with real team photos (Jayanthi, Nirupama, Sourav, Bikram)
- **Industries Page** — 7 sections, 8 expandable industry cards
- **Impact Page** — 11 sections with stats and metrics
- **Solutions Page** — 8 sections
- **Find Talent / Find Jobs** — 8 sections each
- Careers, Contact pages

## Testing
- iteration_4: Industries (13/13 PASS)
- iteration_5: Homepage 8 features + bug fix (16/16 PASS)
- iteration_6: About page (15/15 PASS)

## API Endpoints
`POST /api/newsletter` | `POST /api/contact` | `POST /api/cv` | `POST /api/consultation`

## Backlog
- **P1:** Blog detail page template
- **P1:** Fix Vercel deployment
- **P2:** Individual service/industry detail pages
- **P2:** Connect forms end-to-end
- **P3:** Code cleanup, SEO optimization
