import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Next.js's generateSitemaps() (see app/sitemap.ts) produces
// /sitemap/0.xml..4.xml directly — there's no automatic /sitemap.xml
// index file, so each split sitemap is listed here instead. Multiple
// `Sitemap:` lines in robots.txt is valid per the spec and is how
// Google and Bing expect a split sitemap set to be discovered.
const SITEMAP_COUNT = 5;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/search/", "/api/"],
    },
    sitemap: Array.from({ length: SITEMAP_COUNT }, (_, id) => `${SITE_URL}/sitemap/${id}.xml`),
  };
}
