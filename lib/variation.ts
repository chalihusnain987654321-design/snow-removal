// Deterministic content-variation engine (brief Section 9).
//
// The same city slug always produces the same output — builds stay
// stable — but different cities land on different phrasings and a
// different module order, so pages don't read as template-swapped
// clones of each other. Nothing here invents facts: every variant is a
// different way of saying the same verified data, and any variant that
// needs a stat the city doesn't have degrades to a generic phrasing
// instead of guessing.

import type { City, State } from "@/data/types";
import { formatInches } from "./format";

function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

function pickIndex(seed: string, blockKey: string, optionsLength: number): number {
  return hashString(`${seed}:${blockKey}`) % optionsLength;
}

export function pickVariant<T>(seed: string, blockKey: string, options: readonly T[]): T {
  return options[pickIndex(seed, blockKey, options.length)];
}

// Seeded Fisher-Yates (xorshift32) — same seed always yields the same
// permutation, used to rotate the order of the city page's middle
// modules (brief Section 9.2) without needing client JS or a database.
export function seededShuffle<T>(seed: string, blockKey: string, items: readonly T[]): T[] {
  const arr = [...items];
  let state = hashString(`${seed}:${blockKey}`) || 1;
  const next = () => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0xffffffff;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickFaqSubset<T>(seed: string, blockKey: string, pool: readonly T[], count: number): T[] {
  return seededShuffle(seed, blockKey, pool).slice(0, count);
}

type Ctx = { city: City; state: State };

// City slugs aren't globally unique (e.g. Rochester, NY and Rochester,
// MN) — every seed used below must include the state, or two
// same-named cities in different states would land on identical
// phrasing and module order despite having different content.
function citySeed(city: Pick<City, "slug" | "stateSlug">): string {
  return `${city.stateSlug}/${city.slug}`;
}

type Variant = {
  withStats: (ctx: Ctx) => string;
  withoutStats: (ctx: Ctx) => string;
};

function render(ctx: Ctx, variant: Variant): string {
  const hasSnowfall = ctx.city.avgAnnualSnowfallInches !== null;
  return hasSnowfall ? variant.withStats(ctx) : variant.withoutStats(ctx);
}

const seasonFallback = "through the colder months";

// --- Module 2: intro paragraph -------------------------------------

const introVariants: Variant[] = [
  {
    withStats: ({ city, state }) =>
      `${city.name} sees an estimated ${formatInches(city.avgAnnualSnowfallInches)} of snow in a typical winter, with the season running ${state.snowSeasonMonths ?? seasonFallback}. Crews are dispatched on the forecast, not after a storm has already piled up.`,
    withoutStats: ({ city }) =>
      `We provide snow plowing and ice management throughout ${city.name}${city.county ? ` and ${city.county}` : ""}, with crews dispatched on the forecast rather than after a storm has already ended.`,
  },
  {
    withStats: ({ city, state }) =>
      `Winters in ${city.name} bring an estimated ${formatInches(city.avgAnnualSnowfallInches)} of snow most years, typically ${state.snowSeasonMonths ?? seasonFallback}. Routes are planned before the first flake falls, so driveways and lots stay usable through the whole storm, not just after it clears.`,
    withoutStats: ({ city }) =>
      `${city.name} gets its share of winter weather, and we plan routes before the first flake falls so driveways and lots stay usable through the whole storm, not just after it clears.`,
  },
  {
    withStats: ({ city }) =>
      `A typical ${city.name} winter brings around ${formatInches(city.avgAnnualSnowfallInches)} of snow. Rather than wait for a storm to finish, crews go out once your trigger depth is reached and keep working through multi-day events.`,
    withoutStats: ({ city }) =>
      `Rather than wait for a storm to finish, crews serving ${city.name} go out once your trigger depth is reached and keep working through multi-day events.`,
  },
  {
    withStats: ({ city, state }) =>
      `If you're in ${city.name}, you already know winter means roughly ${formatInches(city.avgAnnualSnowfallInches)} of snow a year, spread across a season that usually runs ${state.snowSeasonMonths ?? seasonFallback}. We dispatch on that forecast, not on a fixed daily schedule.`,
    withoutStats: ({ city }) =>
      `If you're in ${city.name}, you already know what winter driving and walking conditions look like. We dispatch on the forecast, not on a fixed daily schedule.`,
  },
  {
    withStats: ({ city }) =>
      `${city.name} averages about ${formatInches(city.avgAnnualSnowfallInches)} of snowfall a year. Storms get tracked before they arrive, and trucks move once accumulation hits your trigger depth, during the storm, not the morning after.`,
    withoutStats: ({ city }) =>
      `Storms serving ${city.name} get tracked before they arrive, and trucks move once accumulation hits your trigger depth, during the storm, not the morning after.`,
  },
  {
    withStats: ({ city, state }) =>
      `Snow is a regular part of the season in ${city.name}, averaging an estimated ${formatInches(city.avgAnnualSnowfallInches)} a year between ${state.snowSeasonMonths ?? seasonFallback}. Our dispatch model is built around that reality: forecast-driven routes, not next-day cleanup.`,
    withoutStats: ({ city }) =>
      `Snow is a regular part of the season in ${city.name}. Our dispatch model is built around that reality: forecast-driven routes, not next-day cleanup.`,
  },
];

export function introParagraph(ctx: Ctx): string {
  const variant = pickVariant(citySeed(ctx.city), "intro", introVariants);
  return render(ctx, variant);
}

// --- Module 6: local conditions opener -------------------------------

const localConditionsVariants: readonly ((ctx: Ctx) => string)[] = [
  ({ city }) => `Local conditions in ${city.name} shape how we route crews and time dispatch.`,
  ({ city }) => `Here's what actually affects plowing and ice control in ${city.name}.`,
  ({ city }) => `A few things about ${city.name} specifically inform how service is scheduled.`,
  ({ city }) => `${city.name}'s geography and weather patterns factor directly into route planning.`,
  ({ city }) => `We route around a handful of local factors specific to ${city.name}.`,
  ({ city }) => `Conditions vary block by block in ${city.name}, which is why routes are planned locally, not generically.`,
];

export function localConditionsOpener(ctx: Ctx): string {
  return pickVariant(citySeed(ctx.city), "localConditions", localConditionsVariants)(ctx);
}

// --- Module 8: residential vs commercial -----------------------------

const residentialBlurbVariants: readonly ((ctx: Ctx) => string)[] = [
  ({ city }) => `Driveway plowing and sidewalk clearing for ${city.name} homeowners, with a trigger depth you set once. The same crew learns your property's layout over the season, so plowing follows the same pattern every storm: no re-explaining where the edges are or where to pile snow.`,
  ({ city }) => `Homeowners across ${city.name} get driveway and walkway service dispatched on their own trigger depth, not a fixed daily schedule. Set it once during sign-up, and every qualifying storm through the season is handled the same way.`,
  ({ city }) => `For ${city.name} driveways, plowing is scheduled around your trigger depth rather than a route that visits every property at the same time regardless of conditions. Sidewalk clearing can be bundled in, so the whole property is handled on one visit.`,
  ({ city }) => `Residential service in ${city.name} covers the driveway and connecting walkways, with a trigger depth you set once and equipment matched to your property: a straight-blade truck for a standard driveway, or smaller equipment for tight access.`,
  ({ city }) => `${city.name} homeowners set a trigger depth once at sign-up, and every storm that reaches it gets serviced the same way for the rest of the season. Per-push or seasonal billing is available depending on how you'd rather budget.`,
  ({ city }) => `Driveway plowing in ${city.name} is dispatched from the forecast, not a fixed schedule, so a storm that starts overnight doesn't mean waiting until a route reaches your street the next morning.`,
];

const commercialBlurbVariants: readonly ((ctx: Ctx) => string)[] = [
  ({ city }) => `Parking lot plowing, sidewalk clearing, and ice control for ${city.name} properties that can't afford downtime. Lots are zoned so drive lanes and entrances clear first, then the rest of the lot, on a trigger depth tied to your operating hours.`,
  ({ city }) => `Commercial properties in ${city.name} get zone-based clearing (drive lanes, fire lanes, and entrances first, full lot second) plus sidewalk and ice management bundled in where needed.`,
  ({ city }) => `${city.name} commercial lots are serviced on a trigger depth tied to your operating hours, not a fixed daily route, so the property is clear before you open rather than sometime during the day.`,
  ({ city }) => `Lot plowing, sidewalks, and ice control for ${city.name} businesses, scheduled around your actual hours. Multi-property owners get one point of contact and consistent service records across every site.`,
  ({ city }) => `Commercial snow removal in ${city.name} covers the full property (lot, sidewalks, and entrances), cleared on a schedule built around when the property actually needs to be open.`,
  ({ city }) => `For ${city.name} commercial properties, zoned dispatch means the areas that matter most (entrances, fire lanes, ADA routes) clear first, with the rest of the lot following on the same visit.`,
];

export function residentialBlurb(ctx: Ctx): string {
  return pickVariant(citySeed(ctx.city), "residentialBlurb", residentialBlurbVariants)(ctx);
}

export function commercialBlurb(ctx: Ctx): string {
  return pickVariant(citySeed(ctx.city), "commercialBlurb", commercialBlurbVariants)(ctx);
}

// --- Module 10: response time blurb -----------------------------------

const responseTimeVariants: readonly ((ctx: Ctx) => string)[] = [
  ({ city }) => `In ${city.name}, that promise holds through multi-day storms, not just the first pass; crews rotate through extended events instead of falling behind.`,
  () => `Routes are planned from the forecast so crews are already moving once your trigger depth is reached, rather than waiting for a call.`,
  ({ city }) => `Crews serving ${city.name} are staged ahead of a forecasted storm, not dispatched after the fact, so response starts with the first snowfall.`,
  () => `That response time applies day or night; storms don't wait for business hours, and neither do we.`,
  ({ city }) => `${city.name} routes are re-checked throughout a storm, so accumulation that continues past the first pass gets a follow-up visit, not a wait until the next scheduled day.`,
  ({ city }) => `Response times in ${city.name} are the same for a 2 a.m. storm as a 2 p.m. one; dispatch doesn't wait for daylight.`,
];

export function responseTimeBlurb(ctx: Ctx): string {
  return pickVariant(citySeed(ctx.city), "responseTime", responseTimeVariants)(ctx);
}

// --- Module order (Section 9.2): rotate modules 5-10 -------------------

export const MIDDLE_MODULES = [
  "neighborhoods",
  "localConditions",
  "ordinance",
  "residentialCommercial",
  "responseTime",
] as const;

export type MiddleModule = (typeof MIDDLE_MODULES)[number];

export function middleModuleOrder(city: Pick<City, "slug" | "stateSlug">): MiddleModule[] {
  return seededShuffle(citySeed(city), "moduleOrder", MIDDLE_MODULES);
}

// --- FAQ pool (Section 9.4): 15 questions, 4-6 selected per city -------

export type FaqTemplate = { question: (ctx: Ctx) => string; answer: (ctx: Ctx) => string };

export const cityFaqPool: FaqTemplate[] = [
  {
    question: ({ city }) => `Do you plow driveways in ${city.name}?`,
    answer: ({ city }) =>
      `Yes, residential driveway plowing is available throughout ${city.name}${city.county ? ` and the rest of ${city.county}` : ""}. Set a trigger depth once and we dispatch on every qualifying storm.`,
  },
  {
    question: ({ city }) => `Do you offer commercial and HOA snow removal in ${city.name}?`,
    answer: ({ city }) =>
      `Yes: parking lots, sidewalks, and ice control for commercial, HOA, and municipal properties in ${city.name}, alongside residential service.`,
  },
  {
    question: () => "How quickly will a crew arrive after it starts snowing?",
    answer: ({ state }) =>
      `${state.stateSpecificNotes ?? "Response times depend on your trigger depth and the storm's timing."} Routes are planned from the forecast so crews are already moving once your trigger depth is reached.`,
  },
  {
    question: () => "Can I request one-time service instead of a season-long contract?",
    answer: () =>
      "Yes, per-push service doesn't require a season commitment. A seasonal contract is also available if you'd rather lock in a flat rate for the winter.",
  },
  {
    question: ({ city }) => `What areas of ${city.name} do you cover?`,
    answer: ({ city }) =>
      city.neighborhoods.length > 0
        ? `Coverage includes ${city.neighborhoods.slice(0, 4).join(", ")}, and the surrounding area. Check the neighborhoods list on this page or contact us to confirm your specific address.`
        : `Contact us to confirm coverage for your specific address in ${city.name}; we're expanding service area as capacity grows.`,
  },
  {
    question: () => "What trigger depth do you plow at?",
    answer: () =>
      "Most customers set a 2-inch trigger, meaning we plow once 2 inches has accumulated and again as needed through the storm. You can set a different trigger when you sign up.",
  },
  {
    question: ({ city }) => `Do local snow-removal rules apply in ${city.name}?`,
    answer: ({ city }) =>
      city.ordinanceNote
        ? `${city.ordinanceNote} Rules can change: verify current requirements with your municipality.`
        : `Many cities set sidewalk-clearing deadlines and on-street parking bans during snow events. Verify current rules for ${city.name} with your municipality.`,
  },
  {
    question: () => "Do you offer ice management, not just plowing?",
    answer: () =>
      "Yes: salting, sanding, and de-icing are available on their own or bundled with plowing, matched to surface type and temperature.",
  },
  {
    question: ({ city }) => `Is ${city.name} prone to ice dams or roof snow load issues?`,
    answer: ({ city }) =>
      city.localSnowNotes
        ? `${city.localSnowNotes} Ask about roof snow removal or ice dam service if that's a recurring issue at your property.`
        : `Ice dams and roof snow load depend more on a building's insulation and roof type than on the city alone. Ask about roof snow removal or ice dam service if that's a concern at your property.`,
  },
  {
    question: () => "Will plowing damage my driveway or landscaping?",
    answer: () =>
      "Every property is scouted before the season to mark edges, drainage, and hardscaping, and blades are set to avoid gouging asphalt or concrete.",
  },
  {
    question: () => "Do I need to sign a contract?",
    answer: () =>
      "No: per-push service is available without a season-long commitment, though a seasonal contract is available if you'd rather lock in a flat rate.",
  },
  {
    question: ({ city }) => `Can you handle a multi-day storm in ${city.name}?`,
    answer: () =>
      "Yes, routes are re-checked and re-dispatched as accumulation continues through multi-day events, with crews rotating on extended storms.",
  },
  {
    question: () => "Do you serve properties near major highways or main roads?",
    answer: ({ city }) =>
      city.majorRoads.length > 0
        ? `Yes, we regularly service properties near ${city.majorRoads.slice(0, 3).join(", ")} and throughout the surrounding area.`
        : "Yes, contact us to confirm coverage for your specific property.",
  },
  {
    question: () => "Are you licensed and insured?",
    answer: () =>
      "Ask us for current proof of licensing and insurance when you request a quote; we're glad to provide it before you sign anything.",
  },
  {
    question: ({ city }) => `Who do I contact if I have a service issue in ${city.name}?`,
    answer: () =>
      "Dispatch can be reached directly for a status check or service issue during an active storm: see the phone number at the top of this page.",
  },
];

export function selectCityFaqs(ctx: Ctx, count = 5): { question: string; answer: string }[] {
  const clamped = Math.min(Math.max(count, 4), 6);
  const selected = pickFaqSubset(citySeed(ctx.city), "faqs", cityFaqPool, clamped);
  return selected.map((item) => ({ question: item.question(ctx), answer: item.answer(ctx) }));
}
