// Core content types for the site. Fields that depend on unverified
// real-world facts are nullable — see data/NEEDS-RESEARCH.md for the
// rule: unverified data is `null`, never fabricated.

export type Service = {
  slug: string; // "residential-snow-plowing"
  name: string; // "Residential Snow Plowing"
  shortDescription: string;
  longDescription: string; // 250-400 words, unique
  benefits: string[];
  process: { step: string; detail: string }[];
  faqs: { question: string; answer: string }[];
  icon: ServiceIcon;
  audience: "residential" | "commercial" | "both";
};

export type ServiceIcon =
  | "plow"
  | "shovel"
  | "blower"
  | "salt"
  | "brine"
  | "roof"
  | "icicle"
  | "truck"
  | "contract"
  | "phone"
  | "building"
  | "office"
  | "school"
  | "hoa";

export type State = {
  slug: string; // "michigan"
  name: string;
  abbr: string; // "MI"
  avgAnnualSnowfallInches: number | null;
  snowSeasonMonths: string | null; // "November – April"
  climateNotes: string | null; // lake-effect, nor'easters, etc. — unique per state
  stateSpecificNotes: string | null; // salt use, plowing ordinances, liability/slip-and-fall context
  cities: string[]; // city slugs
};

export type City = {
  slug: string; // "grand-rapids"
  name: string;
  stateSlug: string;
  county: string | null;
  population: number | null;
  latitude: number | null;
  longitude: number | null;
  zipCodes: string[];
  avgAnnualSnowfallInches: number | null;
  avgSnowDaysPerYear: number | null;
  coldestMonthAvgLowF: number | null;
  neighborhoods: string[]; // 5-10 real neighborhoods/districts
  majorRoads: string[]; // 3-5 real roads/highways
  nearbyCitySlugs: string[]; // 4-6, for internal linking
  localSnowNotes: string | null; // 2-4 sentences genuinely specific to this city
  ordinanceNote: string | null; // e.g. sidewalk clearing time limits, on-street parking bans
};

export type BlogSection = {
  heading: string;
  body: string; // paragraphs separated by \n\n
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string; // 1-2 sentences — used on the blog hub card and as the meta description
  publishedAt: string; // ISO date, e.g. "2026-09-08"
  updatedAt: string;
  intro: string; // opening paragraph(s), \n\n separated
  sections: BlogSection[];
  relatedServiceSlugs: string[];
  relatedCities: { stateSlug: string; citySlug: string }[];
  isNotLegalAdvice?: boolean;
};
