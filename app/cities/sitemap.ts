import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { SITE_URL } from "@/lib/site";

// Lives in its own folder so the URL reads /cities/sitemap.xml instead
// of /sitemap/cities.xml. This folder has no page.tsx — city pages
// actually live at /locations/[state]/[city]/ — it only exists as a
// URL namespace for this file. 704 URLs, well under the 50,000 cap.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return cities.map((city) => ({
    url: `${SITE_URL}/locations/${city.stateSlug}/${city.slug}/`,
    lastModified: now,
    priority: 0.8,
  }));
}
