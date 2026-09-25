# PROJECT BRIEF — US Snow Removal Local Services Website

> **How to use this file:** Save it in your empty project folder as `PROJECT-BRIEF.md`.
> Open the folder in VS Code, start Claude Code, and send:
>
> `Read PROJECT-BRIEF.md completely. Then confirm your understanding in a short summary, list any assumptions you need me to confirm, and start with Phase 1 only. Do not skip ahead to later phases.`

---

## 0. Your Role

You are a senior full-stack engineer + technical SEO specialist. You are building a production-ready, programmatic local-SEO website for a US snow removal company. Work in phases (Section 12). After each phase, stop, summarize what you built, and wait for my approval before continuing. Ask me questions when something is genuinely ambiguous instead of guessing.

**Hard rules:**
- Never invent fake reviews, fake ratings, fake license numbers, fake awards, fake photos of real jobs, or a fake physical address. Use clearly-marked placeholders like `{{BUSINESS_PHONE}}` and a `config/business.ts` file I can fill in later.
- Never mark up fake data with Schema.org (`AggregateRating`, `Review`). Only include those schema types if real data exists in the config.
- Do not create thin, template-swapped "doorway" pages. Every location page must contain genuinely unique, useful local information (Section 9). This is the single most important rule for ranking.
- Write clean, typed, commented, maintainable code. No dead files, no unused dependencies.

---

## 1. Business Context

- **Business:** Snow removal and ice management services in the United States.
- **Model:** Services offered across multiple US states and cities within those states — only where meaningful snowfall occurs.
- **Customers:** Homeowners, HOAs, property managers, commercial/retail property owners, offices, schools, churches, medical facilities, municipalities.
- **Goal of the site:** Rank in Google local + organic search for queries like `snow removal {city} {state}`, `snow plowing near me`, `commercial snow removal {city}`, `ice dam removal {city}`, and convert visitors into phone calls and quote requests.
- **Primary conversions:** (1) Phone call, (2) Free-estimate form submission, (3) Seasonal contract inquiry.

Create `config/business.ts` with a single typed object holding: business name, legal name, phone, email, mailing address, hours (24/7 during snow events), founding year, license/insurance text, social profiles, Google Business Profile URL, and booking/quote email. Every component reads from this file — no hardcoded business data anywhere else.

---

## 2. Tech Stack (use exactly this)

- **Next.js (latest stable, App Router)** with **TypeScript** — static generation (SSG) for all location pages via `generateStaticParams`.
- **Tailwind CSS** for styling + a small set of reusable UI components (no heavy component library).
- **No database.** All content comes from typed data files in `/data` (TypeScript or JSON). This keeps the build fast, free to host, and fully crawlable.
- **next/image** for all images, **next/font** for fonts (self-hosted, `display: swap`).
- **Form handling:** a Next.js route handler (`/api/quote`) that validates with Zod and sends email via Resend (make the provider swappable behind one adapter file). Include honeypot + basic rate limiting for spam.
- **Deployment target:** Vercel (also must work on Netlify/static export where possible).
- **Analytics:** GA4 + Google Search Console verification, loaded via `next/script` with `strategy="afterInteractive"`, and a consent-friendly wrapper.
- No jQuery, no Bootstrap, no unnecessary client-side JavaScript. Location pages should ship almost zero JS.

---

## 3. Data Model

Create these typed files under `/data`:

```ts
// data/types.ts
type Service = {
  slug: string;              // "residential-snow-plowing"
  name: string;              // "Residential Snow Plowing"
  shortDescription: string;
  longDescription: string;   // 250-400 words, unique
  benefits: string[];
  process: { step: string; detail: string }[];
  faqs: { question: string; answer: string }[];
  icon: string;
  audience: "residential" | "commercial" | "both";
  priceRangeNote: string;    // honest ranges, clearly labeled as estimates
};

type State = {
  slug: string;              // "michigan"
  name: string;
  abbr: string;              // "MI"
  avgAnnualSnowfallInches: number;
  snowSeasonMonths: string;  // "November – April"
  climateNotes: string;      // lake-effect, nor'easters, etc. — unique per state
  stateSpecificNotes: string;// salt use, plowing ordinances, liability/slip-and-fall context
  cities: string[];          // city slugs
};

type City = {
  slug: string;              // "grand-rapids"
  name: string;
  stateSlug: string;
  county: string;
  population: number;
  latitude: number;
  longitude: number;
  zipCodes: string[];
  avgAnnualSnowfallInches: number;
  avgSnowDaysPerYear: number;
  coldestMonthAvgLowF: number;
  neighborhoods: string[];   // 5-10 real neighborhoods/districts
  majorRoads: string[];      // 3-5 real roads/highways
  nearbyCitySlugs: string[]; // 4-6, for internal linking
  localSnowNotes: string;    // 2-4 sentences genuinely specific to this city
  ordinanceNote: string;     // e.g. sidewalk clearing time limits, on-street parking bans
};
```

**Important:** If you are not confident about a real-world value (snowfall averages, ordinances, neighborhoods), do **not** fabricate it. Set the field to `null`, add the city to `data/NEEDS-RESEARCH.md`, and make the UI gracefully hide any section whose data is missing. I will fill these in. Accuracy beats volume.

---

## 4. Geographic Scope — Snow States Only

Only include states with meaningful annual snowfall. **Tier 1 (build first):**

Alaska, Maine, New Hampshire, Vermont, Massachusetts, Rhode Island, Connecticut, New York, New Jersey, Pennsylvania, Ohio, Michigan, Indiana, Illinois, Wisconsin, Minnesota, Iowa, Missouri, Nebraska, Kansas, North Dakota, South Dakota, Montana, Wyoming, Colorado, Utah, Idaho, Washington, Oregon, West Virginia, Maryland, Delaware, Virginia.

**Tier 2 (only partial coverage — mountain/northern regions):** Nevada, New Mexico, North Carolina (western mountains), Kentucky, Tennessee (east).

**Explicitly exclude:** Florida, Hawaii, Louisiana, Mississippi, Alabama, Georgia, South Carolina, Texas (except optionally the Panhandle), Arizona (except Flagstaff area), California (except Sierra Nevada/Tahoe area).

**Rollout strategy — do NOT generate thousands of pages on day one.**
- Phase A: **12 states × 20–25 cities** = roughly 250–300 city pages. Pick the highest-snowfall, highest-population markets first.
- Expansion only after those pages have real, unique content and are indexed.
- Build the data structure so adding a state or city later is just a data file edit — zero code changes.

---

## 5. Services to Cover

1. Residential snow plowing (driveways)
2. Commercial snow plowing (parking lots)
3. Sidewalk & walkway clearing / shoveling
4. Snow blowing services
5. Ice management: salting, sanding, de-icing
6. Anti-icing / brine pre-treatment
7. Roof snow removal
8. Ice dam removal & prevention
9. Snow hauling & relocation (off-site removal)
10. Seasonal snow removal contracts (per-season vs per-push pricing explained)
11. 24/7 emergency snow removal
12. HOA, apartment & property management snow services
13. Retail, office & medical facility snow services
14. Municipal & institutional (schools, churches) snow services

---

## 6. Site Architecture & URL Map

```
/                                        Home
/services/                               All services hub
/services/[service]/                     Service detail (14 pages)
/locations/                              All states hub (map + list)
/locations/[state]/                      State page (city list + state info)
/locations/[state]/[city]/               City page  ← MAIN MONEY PAGES
/services/[service]/[state]/[city]/      Service+city page (ONLY for the top 3
                                          services × top 5 cities per state —
                                          strictly limited to avoid thin pages)
/commercial/                             Commercial landing page
/residential/                            Residential landing page
/pricing/                                Pricing & contract types
/about/                                  About
/contact/                                Contact + quote form
/free-estimate/                          Dedicated conversion landing page
/blog/                                   Resource hub
/blog/[slug]/                            Articles
/faq/                                    FAQ hub
/privacy-policy/  /terms/  /accessibility/
```

Rules: lowercase, hyphenated slugs, trailing-slash consistency enforced, one canonical URL per page, no URL parameters for content, 301 redirects handled in `next.config.js` for any slug changes.

---

## 7. Page Requirements

### Home
Hero with a clear value proposition + phone CTA + short quote form. Trust bar (licensed & insured, 24/7 dispatch, commercial-grade equipment, response-time guarantee). Services grid. "Where we work" state grid linking to state pages. How it works (4 steps). Residential vs commercial split CTA. Why choose us. FAQ accordion (6). Final CTA band. Sticky mobile call button.

### Service page (`/services/[service]/`)
H1 with service name. 900–1,400 words unique. What it includes, who it's for, equipment used, process, pricing model explanation, what affects cost, seasonal vs per-push, 6–8 service-specific FAQs, links to related services, link to locations hub, CTA blocks after the intro and at the end.

### State page (`/locations/[state]/`)
H1: `Snow Removal Services in {State}`. 700–1,000 words genuinely about that state: climate pattern, average snowfall, season length, typical storm types, why local conditions matter, state-level notes (salt restrictions, liability context). Snowfall stats module. Full city list grouped alphabetically or by region, each linking to its city page. Services offered in the state. State-level FAQs (5). CTA.

### City page (`/locations/[state]/[city]/`) — the most important template
Required modules, **in this order**:
1. H1: `Snow Removal in {City}, {State Abbr}` + subhead with phone CTA
2. Intro paragraph that references the city's real snowfall average and season (2 sentences, varied phrasing)
3. Local snow data card: avg annual snowfall, avg snow days, coldest month avg low, season window, county
4. Services we provide in {City} — grid linking to service pages
5. "Neighborhoods & areas we serve" — real neighborhood names + ZIP codes
6. "Local conditions" — 150–250 words using `localSnowNotes` and `majorRoads`
7. "Local rules & timing" — the `ordinanceNote` (sidewalk clearing deadlines, parking bans), with a clear "verify with your municipality" disclaimer
8. Residential vs commercial in {City}
9. Pricing expectations for {City} (honest ranges, labeled as estimates)
10. Response time / service radius
11. 4–6 city-specific FAQs (questions vary by city data, not identical strings)
12. "Nearby cities we serve" — internal links to `nearbyCitySlugs`
13. Quote form + phone CTA
14. Breadcrumbs: Home › Locations › {State} › {City}

Target 1,000–1,600 words per city page, of which **at least 40% must be data-driven unique content**, not boilerplate.

### Service + City page
Only generate where `topServices × topCities` overlap is defined in data. Must be meaningfully different from both the parent service page and the city page — no combining two templates with find-and-replace. If you cannot make it unique, do not generate it.

---

## 8. Technical SEO Requirements

- **Metadata** via Next.js `generateMetadata` for every route. Title templates:
  - City: `Snow Removal in {City}, {ST} | Plowing & Ice Control | {Brand}` (keep under 60 chars — truncate city names gracefully)
  - State: `Snow Removal Services in {State} | {Brand}`
  - Service: `{Service} | Residential & Commercial | {Brand}`
  - Meta descriptions 140–158 chars, unique, with a call to action and the phone number where it fits.
- **Canonical tags** on every page. Self-referencing.
- **Open Graph + Twitter cards**, with dynamically generated OG images (`opengraph-image.tsx`) per location.
- **JSON-LD structured data**, validated against schema.org:
  - `Organization` + `WebSite` (with `SearchAction`) site-wide
  - `LocalBusiness` (subtype `HomeAndConstructionBusiness`) with `areaServed` listing the cities, `geo`, `openingHoursSpecification`
  - `Service` on service pages with `serviceType`, `provider`, `areaServed`
  - `FAQPage` on every page that has a visible FAQ section (content must match visible text exactly)
  - `BreadcrumbList` on all deep pages
- **Sitemaps:** `app/sitemap.ts` generating an index plus split sitemaps (`pages`, `states`, `cities`, `services`, `blog`) — max 5,000 URLs each. Include `lastModified`. Exclude noindex pages.
- **robots.txt** via `app/robots.ts`, allowing crawl, pointing to the sitemap index.
- **Internal linking:** every city links up to its state and sideways to 4–6 nearby cities; every state links down to all its cities; services link to the locations hub; the footer carries a "Top service areas" block (max ~30 links, not thousands).
- **Heading hierarchy:** exactly one H1 per page, logical H2/H3 nesting.
- **Image SEO:** descriptive filenames, unique alt text that includes the location naturally (never keyword-stuffed), width/height set, WebP/AVIF, lazy loading below the fold, hero image `priority`.
- **404 and 500 pages** that are useful (search + top links).
- **No duplicate content:** if two cities would end up with >80% identical text, the data is too thin — flag it in `NEEDS-RESEARCH.md` rather than shipping it.

---

## 9. Content Rules (read this twice)

The fastest way to fail at local SEO is 500 near-identical city pages. Prevent that:

1. **Build a content variation system**, not a single string template. For every repeated paragraph, write **5–8 alternative phrasings** and select deterministically based on a hash of the city slug, so each page reads differently but builds are stable.
2. **Vary structure, not just words:** rotate the order of the middle modules (5–10) per city using the same deterministic seed.
3. **Inject real data into prose:** snowfall inches, snow days, county name, neighborhoods, roads, coldest-month lows. A sentence containing a real local number is worth more than three generic sentences.
4. **FAQ questions must vary** by city — pull from a pool of 15 and select 4–6 per city, with answers that include city-specific values.
5. **Tone:** plain, direct, helpful, written for a homeowner or property manager in a hurry. Short sentences. No fluff, no "in today's fast-paced world", no exclamation marks, no keyword stuffing. Use the city name naturally 4–8 times in a 1,200-word page — not more.
6. **E-E-A-T signals:** an author/company box, "last updated" date, clear service guarantees, insurance and equipment specifics, real process detail. These are what separate a real business site from a spam network.
7. **Blog cluster** — write 10 starter articles, each 1,200+ words, genuinely useful:
   - How much does snow removal cost? (per push vs seasonal vs hourly)
   - Seasonal contract vs per-visit: which saves more?
   - What is an ice dam, and how to prevent it
   - Rock salt vs calcium chloride vs magnesium chloride
   - Pre-treating with brine: how anti-icing works
   - Commercial snow removal: slip-and-fall liability basics (with a "not legal advice" note)
   - How to prepare your driveway before the first snow
   - When roof snow load becomes dangerous
   - What to look for in a snow removal contractor (10 questions to ask)
   - Snow removal for HOAs and property managers
   Each article links to relevant service and location pages.

---

## 10. Design Requirements

- **Feel:** professional, credible, "real local contractor who answers the phone at 3 AM" — not a generic SaaS template.
- **Palette:** deep winter navy / slate as the base, crisp white space, one high-contrast accent (safety orange or amber) reserved for CTAs only. Ensure WCAG AA contrast everywhere.
- **Typography:** one strong geometric or grotesque sans for headings, a highly readable sans for body. Large, confident headings. Body text minimum 17px on mobile.
- **Layout:** mobile-first. Generous spacing, clear section rhythm, max content width ~1200px, comfortable line length (~70ch) for prose.
- **Components to build:** Header with sticky phone CTA, hero, trust bar, service card, stat card, city grid, state accordion/grid, FAQ accordion (details/summary — no JS), quote form, testimonial slot (empty until real ones exist), CTA band, breadcrumbs, footer with service-area links.
- **Conversion elements:** phone number visible in the header on every page, click-to-call on mobile, sticky bottom call bar on mobile, a quote form above the fold on city pages (or a compact inline version), "response within X hours during a storm" promise pulled from config.
- **Imagery:** use tasteful placeholders with a clear `TODO: replace with real job photos` note. Do not scrape or hotlink images.
- **Accessibility:** semantic HTML, keyboard navigable, visible focus rings, proper form labels and error messaging, `prefers-reduced-motion` respected, skip-to-content link.
- **Animation:** minimal — subtle fade/slide on scroll at most. Nothing that blocks LCP.

---

## 11. Performance Targets

- Lighthouse mobile: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100.
- LCP < 2.0s, CLS < 0.05, INP < 200ms.
- City pages must be statically generated at build time and ship < 50KB of JS.
- Build time must stay reasonable — if generating hundreds of pages slows the build badly, use ISR with a long revalidate for the long tail and full SSG for the priority set.

---

## 12. Build Phases (stop after each one)

**Phase 1 — Foundation**
Scaffold Next.js + TypeScript + Tailwind. Set up folder structure, `config/business.ts`, `data/types.ts`, design tokens, base layout, header, footer, and three sample pages (home skeleton, one state, one city) with placeholder data. Show me the design direction before going further.

**Phase 2 — Data layer**
Build `data/services.ts`, `data/states.ts`, `data/cities.ts` for the first 3 states (~25 cities each) with real, verified values where you're confident and `null` + a `NEEDS-RESEARCH.md` entry where you're not. Build the content-variation engine and prove it by showing 3 generated city pages side by side to demonstrate they read differently.

**Phase 3 — Templates**
Finish all page templates: home, services hub + 14 service pages, state template, city template, commercial, residential, pricing, about, contact, free-estimate, FAQ, legal pages.

**Phase 4 — SEO layer**
Metadata, canonicals, all JSON-LD, sitemaps, robots, OG images, breadcrumbs, internal linking system, redirects.

**Phase 5 — Conversion & forms**
Quote form + API route + validation + spam protection + thank-you page + event tracking.

**Phase 6 — Content**
The 10 blog articles, FAQ pools, and final copy pass on all evergreen pages.

**Phase 7 — Scale & QA**
Expand to the remaining Tier 1 states in data only. Then run the acceptance checklist below and produce a report.

---

## 13. Acceptance Checklist (produce this as `QA-REPORT.md` at the end)

- [ ] `npm run build` completes with zero errors and zero TypeScript errors
- [ ] Every generated URL returns 200; no orphan pages; no broken internal links
- [ ] Every page has a unique title, unique meta description, one H1, a canonical
- [ ] All JSON-LD validates (report any warnings)
- [ ] Sitemap includes every indexable page and nothing else
- [ ] No two city pages exceed 80% text similarity (run a similarity check and report the worst 10 pairs)
- [ ] Lighthouse scores on home, a state page, a city page, and a service page
- [ ] Mobile layout verified at 360px, 390px, 768px, 1280px, 1920px
- [ ] Forms validate, submit, and handle errors
- [ ] No hardcoded business data outside `config/business.ts`
- [ ] `NEEDS-RESEARCH.md` lists every field you left as `null`
- [ ] `README.md` explains how to add a new state, a new city, and a new service

---

## 14. Also Deliver

- `README.md` — setup, dev, build, deploy, and how to extend the data
- `CLAUDE.md` — project conventions so future Claude Code sessions stay consistent
- `NEEDS-RESEARCH.md` — every unverified data point I must fill in
- `SEO-CHECKLIST.md` — the off-site work the code can't do: Google Business Profile setup per city (only where a real address or service-area exists), NAP consistency, local citations, review generation, GSC/Bing submission

---

## 15. One Honest Note to Include in the README

The website is only half of local SEO. For `snow removal near me` style queries, the map pack is driven by Google Business Profile, real reviews, proximity, and citations — not by page count. Recommend that I: create a GBP for each real location (or a service-area business where legitimate), keep NAP identical everywhere, actively collect reviews, and expand city coverage gradually as real service capacity grows. Do not recommend anything that violates Google's guidelines (fake addresses, doorway pages, review gating).
