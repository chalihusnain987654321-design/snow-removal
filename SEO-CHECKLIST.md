# SEO Checklist — Off-Site Work

The website is only half of local SEO. For "snow removal near me"
style queries, Google's map pack is driven by your Google Business
Profile, real reviews, proximity, and citations — not by page count.
None of this is something code can do for you; it's ongoing operational
work. Do not do anything on this list in a way that violates Google's
guidelines (fake addresses, doorway pages, review gating) — a
guideline violation risks the entire domain, not just one listing.

## Before launch

- [ ] Fill in every `{{PLACEHOLDER}}` in `config/business.ts` with real values
- [ ] Set `RESEND_API_KEY` so quote requests actually send (test one end-to-end before announcing the site)
- [ ] Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` if you want analytics
- [ ] Verify the domain in Google Search Console, set `GOOGLE_SITE_VERIFICATION`
- [ ] Submit the sitemap files to Search Console and Bing Webmaster Tools (`/sitemap/0.xml` through `/sitemap/4.xml` — see `robots.txt` for the full list; there's no single `/sitemap.xml` index, submit each one)
- [ ] Have an attorney review `/terms/` and `/privacy-policy/` before publishing — both currently contain a visible "template, not legal advice" notice and are marked `noindex` until replaced with real reviewed terms

## Google Business Profile

- [ ] Create a GBP for each real service location, or a **service-area business** profile if you don't have a public storefront (this is the honest, guideline-compliant option for most snow removal companies — do not enter a fake or unstaffed address to "unlock" a location-based listing)
- [ ] Category: primary category should reflect your actual core service (e.g. "Snow Removal Service" if available in your region, else the closest accurate match)
- [ ] Fill in real hours, including your actual storm-response availability
- [ ] Add real photos of your own equipment and completed jobs — never stock or scraped images (the site's `/about/` page deliberately ships with a placeholder for this, not a stock photo, for the same reason)
- [ ] Keep the GBP's service-area list in sync with `data/cities.ts` as you expand coverage — don't claim an area on GBP before the site (and your actual crew capacity) covers it

## NAP consistency

"NAP" = Name, Address, Phone. Inconsistent NAP across the web is one of
the more common reasons a local business underperforms in map-pack
rankings, independent of site quality.

- [ ] Your business name, phone number, and address (or service-area
      designation) must match, character-for-character, across: the
      website (`config/business.ts`), Google Business Profile, and
      every directory/citation listed below
- [ ] Pick one canonical phone number format and use it everywhere —
      don't let GBP show `(555) 123-4567` while a directory shows
      `555.123.4567`
- [ ] Re-check NAP consistency whenever the phone number, name, or
      address changes — an old citation with stale info actively hurts

## Local citations

Submit to, at minimum:

- [ ] Bing Places for Business
- [ ] Apple Maps (Apple Business Connect)
- [ ] Yelp
- [ ] Angi / HomeAdvisor (relevant for a home-services business specifically)
- [ ] Nextdoor Business
- [ ] Your state or local Chamber of Commerce, if you're a member
- [ ] Any local/regional home-services or contractor directories relevant to your specific service areas

## Review generation

- [ ] Set up a simple, consistent process for asking real customers for
      reviews after service (e.g. a follow-up text or email with a
      direct link to your GBP review form)
- [ ] Never gate who gets asked based on how happy they seemed — asking
      only satisfied customers ("review gating") violates Google's
      guidelines
- [ ] Never offer a discount or incentive in exchange for a review
- [ ] Respond to every review, positive and negative — this is itself
      a ranking signal and shows prospective customers you're actually
      active
- [ ] Once you have real reviews, add `AggregateRating`/`Review` JSON-LD
      backed by that real data — the codebase deliberately does not
      include this schema yet, since there's no real review data to
      back it (see the hard rule in `CLAUDE.md`)

## Ongoing

- [ ] Expand `data/cities.ts` coverage gradually, in step with real
      service capacity — see `README.md` for how to add a city, and
      research every field rather than estimating from a nearby city
- [ ] Re-run the city-page similarity check (see `CLAUDE.md`) after any
      batch of new cities, to catch thin-data pages before they ship
- [ ] Monitor Search Console for indexing issues or manual actions
      after each significant content addition
- [ ] Keep blog content current — `data/blog.ts`'s `updatedAt` field
      should reflect real edits, not be bumped without a real content change
