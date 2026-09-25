# Snow Removal Website

A programmatic local-SEO website for a US snow removal company, built
with Next.js (App Router), TypeScript, and Tailwind CSS. All content
lives in typed data files under `/data` — there is no database. See
`snow-removal-website-prompt.md` for the full project brief this site
was built against.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in real values — see below
```

Nothing in `.env.local` is required for the site to build or run.
Each integration no-ops until its variable is set:

- `RESEND_API_KEY` — without it, the quote form correctly fails closed and sends visitors to `/quote-error/` instead of silently losing leads.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — without it, no analytics script loads and no consent banner shows.
- `GOOGLE_SITE_VERIFICATION` — without it, no verification meta tag is emitted.

Also fill in `config/business.ts` — every `{{PLACEHOLDER}}` value there
(name, phone, email, address) needs a real value before launch. Every
component on the site reads business info from that one file.

## Development

```bash
npm run dev        # dev server at http://localhost:3000
npm run build       # production build (also the source of truth for type errors)
npm run start        # run the production build locally
npm run lint          # ESLint
npx tsc --noEmit       # type-check without building
```

## Deployment

Built for Vercel (zero-config: `next build` + `next start`, or the
Vercel adapter). It also produces a working static-ish output for
Netlify, though the `/api/quote` route handler, `/search/` page, and
the dynamic OG image routes need a Node runtime — not a pure static
host. If you need a fully static export, those three pieces would need
to be reworked or dropped first.

## Project structure

```
app/                  Routes (App Router) — one folder per URL segment
components/           Reusable UI (components/ui), layout chrome (components/layout), analytics
config/                business.ts (all business info), analytics.ts (env-var driven)
data/                    Typed content: services.ts, states.ts, cities.ts, blog.ts, types.ts
lib/                      Data-access helpers, the content-variation engine, schema builders, email adapter
```

## How to add a new state

1. Add an entry to the `states` array in `data/states.ts` — `slug`,
   `name`, `abbr`, and the rest. Leave `avgAnnualSnowfallInches` `null`
   unless you have a real statewide figure that isn't misleading (most
   states are too geographically varied for one — see
   `data/NEEDS-RESEARCH.md` for why Michigan/New York/Minnesota all
   have this `null`).
2. Add its cities to `data/cities.ts` (see below) and list their slugs
   in the state's `cities` array.
3. That's it — `/locations/[state]/` and its OG image are generated
   automatically from `generateStaticParams`. No code changes needed.

## How to add a new city

1. Add an entry to the `cities` array in `data/cities.ts`. **Research
   every numeric and factual field against a real source** (NOAA/NWS
   climate normals, US Census, the city's own municipal code) — don't
   estimate or reuse a nearby city's numbers. Phase 2 of this project
   used background research agents to verify each field against a
   named source; see the git history or `data/NEEDS-RESEARCH.md` for
   the pattern.
2. **Any field you can't verify: set it to `null`, not a guess.** The
   city page template hides sections gracefully when their data is
   missing — a page with several `null` fields is honest and still
   ships fine. Log the `null` fields and why in
   `data/NEEDS-RESEARCH.md` under that state's section.
3. City slugs are only unique **within a state**, not globally —
   `getCityBySlug(stateSlug, citySlug)` in `data/cities.ts` is scoped
   for exactly this reason (New York and Minnesota both have a
   "Rochester" in this dataset, on purpose, as a standing regression
   test for that scoping).
4. Pick 3–6 `nearbyCitySlugs` from cities already in the same state,
   based on real geographic proximity.
5. The content-variation engine (`lib/variation.ts`) automatically
   handles making the new city's page read differently from every
   other city page — you don't need to write unique prose by hand,
   just supply accurate data. If two cities end up with very thin,
   near-identical data, their pages will read similarly; that's a
   signal to prioritize researching more of their fields, not a bug in
   the template.

## How to add a new service

1. Add an entry to the `services` array in `data/services.ts` — every
   field is hand-written content (`longDescription`, `benefits`,
   `process`, 6+ `faqs`, `priceRangeNote`), since services aren't
   city-specific and don't need the same verification rules as
   `data/cities.ts`.
2. Pick an `icon` from the `ServiceIcon` type in `data/types.ts`. Reuse
   an existing icon or add a new one in `components/icons.tsx`.
3. `/services/[slug]/` and its OG image are generated automatically.
   The service also appears on `/services/`, `/commercial/` and/or
   `/residential/` (filtered by its `audience` field), and every city
   page's service grid — no other code changes needed.

## Content-variation engine

`lib/variation.ts` is why city pages don't read like the same template
with find-and-replace. For a given city, it deterministically:

- Picks from 4–6 phrasing variants for several prose blocks (intro,
  local-conditions opener, residential/commercial blurbs, pricing
  intro, response-time blurb)
- Rotates the order of the page's middle modules (neighborhoods, local
  conditions, ordinance, residential/commercial, pricing, response
  time)
- Selects a subset from a 15-question FAQ pool

The same city always builds the same way (stable builds); different
cities land on different phrasings and orders. The seed is
`${stateSlug}/${citySlug}`, not the city slug alone — city names repeat
across states, and an earlier version of this code that seeded on slug
alone had two different Rochesters (NY and MN) rendering identical
module order and phrasing. Keep using the full `citySeed()` helper for
any new variation blocks you add.

## One honest note on local SEO

This website is only half of local SEO. For "snow removal near me"
style queries, Google's map pack is driven by your Google Business
Profile, real reviews, proximity, and citations — not by how many
pages your site has. See `SEO-CHECKLIST.md` for the off-site work this
codebase can't do for you. In short: create a GBP for each real
location (or a service-area business where that's legitimate), keep
your name/address/phone identical everywhere it appears online,
actively collect real reviews, and expand city coverage gradually as
your actual service capacity grows. Don't do anything this README or
the checklist doesn't explicitly recommend if it involves a fake
address, a doorway page, or gating which customers get asked for a
review — those violate Google's guidelines and put the whole domain at
risk.
