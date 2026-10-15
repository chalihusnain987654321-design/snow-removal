import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Each category has its own sitemap.ts in its own folder (app/pages,
// app/states, app/cities, app/services, app/blog) rather than one
// shared generateSitemaps() file, so the URLs read /pages/sitemap.xml,
// /states/sitemap.xml, etc. There's no single index file — Next.js
// reserves /sitemap.xml as a conflicting path with the sitemap
// metadata convention (confirmed: a manual route there fails the
// build) — so each is listed individually. Multiple `Sitemap:` lines
// in robots.txt is valid per the sitemap protocol and is how
// Google/Bing expect a split sitemap set to be discovered.
const SITEMAP_CATEGORIES = ["pages", "states", "cities", "services", "blog"] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/search/",
    },
    sitemap: SITEMAP_CATEGORIES.map((category) => `${SITE_URL}/${category}/sitemap.xml`),
  };
}
