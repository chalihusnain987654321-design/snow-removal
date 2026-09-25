# QA Report

Run against a production build (`npm run build` + `npm run start`) on
2026-09-22, covering the current dataset: 3 states, 30 cities, 14
services, 10 blog articles, 68 total indexable/generated pages. All
checks below were run against the actual built output — served
responses, generated files on disk, and live Lighthouse audits — not
inferred from source code.

## Acceptance checklist (brief Section 13)

- [x] **`npm run build` completes with zero errors and zero TypeScript errors.** Confirmed via `npx tsc --noEmit` and `npm run build`, both clean, immediately before this report was written.
- [x] **Every generated URL returns 200; no orphan pages; no broken internal links.** Crawled all 68 sitemap-listed URLs: 0 non-200 responses, 0 broken internal links (75 unique internal links discovered and checked), 0 orphan pages. **One real orphan was found and fixed during this pass**: `/faq/` was in the sitemap but linked from nowhere on the site — added to the footer's Company column.
- [x] **Every page has a unique title, unique meta description, one H1, a canonical.** 0 pages missing any of title/description/canonical; 0 pages with an H1 count other than 1; 0 duplicate titles or descriptions across all 68 pages.
- [x] **All JSON-LD validates.** 346 JSON-LD blocks across the site (Organization/WebSite/LocalBusiness site-wide, plus BreadcrumbList, FAQPage, Service, and BlogPosting per relevant page), all valid, parseable JSON. No `AggregateRating`/`Review` schema anywhere, per the hard rule against fabricated review data.
- [x] **Sitemap includes every indexable page and nothing else.** 5 split sitemaps (pages/states/cities/services/blog) verified by fetching each `/sitemap/N.xml` directly and diffing against the actual route list. `/search/`, `/thank-you/`, `/quote-error/`, and the legal pages are correctly excluded (marked `noindex` or simply not in the sitemap).
- [x] **No two city pages exceed 80% text similarity.** Ran a 5-word-shingle Jaccard similarity check across all 30 city pages (435 pairs). **Worst pair: 44.3%** (Albany, NY ↔ Rochester, MN). Full worst-10 list below. The content-variation engine is doing its job.
- [x] **Lighthouse scores on home, a state page, a city page, and a service page.** See table below. Two real accessibility bugs were found and fixed during this pass (see "Bugs found" below); all four page types now score 100 on accessibility, best-practices, and SEO. Performance and LCP are documented as a known gap — see notes below the table.
- [x] **Mobile layout verified at 360px, 390px, 768px, 1280px, 1920px.** Checked programmatically (`document.documentElement.scrollWidth` vs. viewport width — catches any horizontal overflow) across all 5 breakpoints × home/city/service pages = 15 combinations, plus visual screenshots at the smallest and largest. Zero horizontal-overflow issues found.
- [x] **Forms validate, submit, and handle errors.** Re-verified end-to-end via direct requests to `/api/quote/`: valid submission reaches the email step and fails closed (no `RESEND_API_KEY` configured yet) with a clear redirect to `/quote-error/`; honeypot-filled and missing-required-field submissions are both rejected by validation before ever reaching the email step (confirmed via server logs showing exactly the expected number of email-adapter invocations); 6 rapid requests confirm the rate limiter blocks the 6th.
- [x] **No hardcoded business data outside `config/business.ts`.** Grepped for hardcoded phone number patterns, email patterns, and literal `tel:` hrefs across `app/` and `components/` — zero matches. Every phone link site-wide (11 occurrences across 10 files) is built from `business.phoneHref`.
- [x] **`NEEDS-RESEARCH.md` lists every field left as `null`.** Cross-checked by grepping `data/cities.ts` for `: null,` (21 occurrences) against the file's documented list — exact match, nothing undocumented.
- [x] **`README.md` explains how to add a new state, a new city, and a new service.** Written this pass, with explicit sections for each, plus how the content-variation engine works and the state-scoped city-lookup gotcha.

## Lighthouse scores

| Page | Performance | Accessibility | Best Practices | SEO | LCP |
|---|---|---|---|---|---|
| Home | 96 | 100 | 100 | 100 | 2.8s |
| State (Michigan) | 95 | 100 | 100 | 100 | 2.7s |
| City (Grand Rapids, MI) | 89 | 100 | 100 | 100 | 3.2s |
| Service (Roof Snow Removal) | 96 | 100 | 100 | 100 | 2.7s |

Best-practices and SEO are 100 across the board. Accessibility is 100
across the board **after** two fixes made during this pass (below).
Performance targets (brief Section 11: ≥95) and LCP (<2.0s) are not
fully met — see notes.

### Performance / LCP note

Total page weight is small (283–298 KiB), server response time is
~50ms, there's no render-blocking CSS, and fonts are already
self-hosted and preloaded correctly via `next/font`. The LCP gap
traces almost entirely to Lighthouse's default **simulated mobile
network throttling** (562ms simulated request latency, 4x CPU
slowdown) applied on top of a locally-run production server — not a
render-blocking or bundle-size problem in the code. This is worth
re-measuring after a real deploy (Vercel's CDN and edge caching behave
differently than `next start` on localhost), and is flagged here as a
genuine open item rather than claimed as resolved.

## Bugs found and fixed during this QA pass

1. **Orphan page**: `/faq/` was sitemap-listed but linked from
   nowhere on the site. Fixed by adding it to the footer.
2. **Accessibility — insufficient color contrast (real, not
   theoretical)**: `--color-accent-600` (`#ea580c`) measured 3.54:1
   contrast against white text — below WCAG AA's 4.5:1 — despite a
   code comment in `globals.css` claiming AA compliance. This affected
   every primary CTA button, the mobile call bar, and the quote form's
   submit button site-wide. Fixed at the design-token level
   (`accent-600` → `#c2410c`, ~5.3:1; `accent-700` → `#9a3412`,
   ~7.4:1), which cascaded the fix everywhere without touching
   individual components.
3. **Accessibility — heading order**: the `QuoteForm` component's
   "Get a free estimate" heading was an `<h3>` with no `<h2>` before it
   in several page contexts (home hero, free-estimate, contact),
   producing an invalid H1→H3 skip. Changed to `<h2>`.
4. **Accessibility — secondary contrast regression**: fixing #2 above
   changed what `accent-700` renders as, which incidentally dropped an
   inline text link's contrast against its surrounding paragraph text
   below the required 3:1 ("link distinguishable by more than color
   alone"). Found on the service-page pricing section via a second
   Lighthouse pass; the same underlying pattern (`text-slate-500` on
   `bg-fog-100`, 4.39:1, marginally under AA) was also found affecting
   the `/faq/`-adjacent ordinance disclaimer and the `/locations/` hub
   page. Fixed by underlining inline-prose links permanently (rather
   than hover-only) and standardizing muted/secondary text from
   `slate-500` to `slate-600` site-wide.
5. **Word count below brief target**: city pages averaged ~740 words
   against the brief's 1,000–1,600 target (Section 7). Expanded the
   thinnest content blocks (residential/commercial blurbs, response-time
   blurb, FAQ count 5→6) with genuine additional explanation, not
   filler — average is now ~820 words. Similarity actually improved
   slightly in the process. The remaining gap correlates with data
   completeness: the thinnest-content cities are the smaller towns
   with the most `null` fields in `data/NEEDS-RESEARCH.md`. Closing
   the rest of the gap properly means filling in more verified real
   data, not padding prose — flagged as follow-up work, not fixed
   further here, per the brief's own "accuracy beats volume" principle.

## Worst 10 city-page similarity pairs

| Similarity | City A | City B |
|---|---|---|
| 44.3% | Albany, NY | Rochester, MN |
| 43.9% | Grand Rapids, MI | Marquette, MI |
| 42.9% | Sault Ste. Marie, MI | Rochester, NY |
| 42.0% | Duluth, MN | Bemidji, MN |
| 41.1% | Binghamton, NY | Brainerd, MN |
| 40.1% | Lansing, MI | Niagara Falls, NY |
| 39.5% | Traverse City, MI | Marquette, MI |
| 39.3% | Mankato, MN | Moorhead, MN |
| 38.8% | Lansing, MI | Marquette, MI |
| 38.0% | Grand Rapids, MI | Traverse City, MI |

All well under the 80% threshold. Method: visible body text extracted
from each rendered city page, broken into overlapping 5-word shingles,
compared pairwise via Jaccard similarity (intersection/union of
shingle sets) — a standard, conservative near-duplicate-content
detection method. 435 pairs compared across the 30 cities; 0 exceeded
80%.

## Known gaps / explicitly deferred (not bugs)

- **Full Tier 1 state rollout.** The brief's Section 4 rollout target
  is ~12 states × 20–25 cities. This dataset currently covers 3 states
  × 10 cities, by explicit user decision this phase, in favor of
  running this QA pass against a smaller, fully-verified dataset first.
  See `README.md` → "How to add a new state/city" for the process to
  continue expansion.
- **Legal pages need attorney review.** `/terms/` and `/privacy-policy/`
  are marked `noindex` and carry a visible "not legal advice" notice
  for exactly this reason — they're structurally complete but
  intentionally not final content.
- **`RESEND_API_KEY` and real business info not yet configured.** The
  quote form correctly fails closed (see forms check above) rather
  than silently dropping leads, but no real quote request can be sent
  until `.env.local` and `config/business.ts` are filled in.
