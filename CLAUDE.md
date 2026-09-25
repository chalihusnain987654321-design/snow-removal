# CLAUDE.md

Conventions for working in this repo. The full project spec is
`snow-removal-website-prompt.md` — read it before starting new work,
it governs scope decisions this file doesn't repeat.

## Hard rules (from the brief — never relax these)

- **Never fabricate.** No fake reviews, ratings, license numbers,
  awards, "as seen in" logos, or physical addresses. No `AggregateRating`
  or `Review` JSON-LD unless real data exists in config. If a real-world
  fact (population, snowfall, an ordinance) can't be verified against a
  credible source, the field is `null` — not a plausible-sounding guess.
  Log every `null` in `data/NEEDS-RESEARCH.md`.
- **No thin/doorway pages.** Every city page must have genuinely
  unique, locally-specific content. If a new city's page ends up
  looking near-identical to another (check with the similarity method
  below), that's a signal the data is too thin to ship, not something
  to paper over with filler prose.
- **Business data has one source.** Everything about the business
  (name, phone, email, hours, address) comes from `config/business.ts`.
  Never hardcode a phone number, email, or business name anywhere else
  — grep for `business\.` usage as the pattern to follow.

## Architecture conventions

- **No database.** All content is typed data in `/data`. If a task
  seems to need a database, it probably means the data belongs in a
  new `/data/*.ts` file instead.
- **City lookups are state-scoped.** Always use
  `getCityBySlug(stateSlug, citySlug)`, never a slug-only lookup — city
  names repeat across states (this dataset has two Rochesters,
  deliberately, as a standing test of this).
- **Trailing slashes everywhere.** `next.config.ts` sets
  `trailingSlash: true` to match the brief's URL map. Any new internal
  link, `redirect()`, or `canonical` must include the trailing slash.
  Watch for this specifically on `/api/*` routes and anything built
  from `request.url` — Next's metadata-route loaders (sitemap, OG
  images) pass dynamic segment values as **Promises**, not plain
  values, even when `generateStaticParams` types them as plain — await
  before using.
- **Redirects use the request's own origin, not `SITE_URL`.**
  `lib/site.ts`'s `SITE_URL` falls back to `https://example.com` until
  `config/business.ts`'s `siteUrl` placeholder is filled in — building
  a redirect from it (instead of `new URL(request.url).origin`) sends
  local/staging traffic to the real external example.com. This has
  already been a real bug once; don't reintroduce it.
- **JSON-LD is generated from the same data as what's rendered, not
  separately.** `FaqAccordion` and `Breadcrumbs` both emit their own
  matching JSON-LD from the same `items` prop they render visibly —
  keep it that way so structured data can't drift from the page. Don't
  add a second, separately-maintained FAQ or breadcrumb schema block.
- **The content-variation engine seeds on `${stateSlug}/${citySlug}`**
  (via `citySeed()` in `lib/variation.ts`), never on city slug alone,
  for the same cross-state-collision reason as city lookups.

## Design tokens

- Colors are CSS custom properties in `app/globals.css` (`--color-*`),
  mapped through Tailwind's `@theme inline`. Change a color here, not
  in individual `bg-accent-600`-style class usages — that's what makes
  the WCAG-contrast comment at the top of the file actually true
  instead of aspirational (it wasn't, once — `accent-600` was
  `#ea580c`, actually a 3.54:1 contrast ratio against white despite
  the comment claiming AA compliance, until Lighthouse caught it).
- Any component using an accent/dark-background color combination
  (e.g. a component built for a light background reused on a navy
  section) needs a `tone`/`variant` prop — don't assume a component's
  existing color classes work on every background it might be dropped
  onto. `TrustBar`'s `tone` prop and `Button`'s `outline` variant exist
  because of exactly this failure mode, found twice.
- Inline text links (a link inside a sentence of body copy, not a
  standalone list/grid/nav link) need permanent `underline`, not just
  `hover:underline` — WCAG's "distinguishable by more than color alone"
  rule. Standalone list/grid links are fine with hover-only.

## Verification habits worth keeping

These caught real bugs during this project — repeat them for new work,
don't just trust a green build:

- After changing sitemap/robots/redirect logic, `curl` the actual
  endpoint rather than trusting the build succeeded — a sitemap that
  builds fine can still silently render zero URLs (this happened: the
  `id` param sitemap.ts receives is a `Promise`, and a synchronous
  comparison against it always fell through to an empty array).
- After adding/changing a form flow, actually submit it (via `curl -L`
  or a browser) and check server logs, not just that the route
  compiles.
- Run Lighthouse (`npx lighthouse <url> --chrome-flags="--headless"`)
  after any design-token or component-reuse change — several
  accessibility issues (contrast, heading order, link distinguishability)
  were only caught this way, not by lint or type-check.
- For a new city/state, run a text-similarity check across city pages
  (word-shingle Jaccard is what this project used) rather than
  eyeballing two pages side by side — it catches near-duplicate content
  from thin data more reliably than manual review.

## Commands

```bash
npm run dev            # dev server
npm run build            # production build — also the real type-check
npm run lint               # ESLint
npx tsc --noEmit             # type-check only
npx lighthouse <url> --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo
```
