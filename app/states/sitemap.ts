import type { MetadataRoute } from "next";
import { states } from "@/data/states";
import { SITE_URL } from "@/lib/site";

// Lives in its own folder so the URL reads /states/sitemap.xml instead
// of /sitemap/states.xml. This folder has no page.tsx — state pages
// actually live at /locations/[state]/ — it only exists as a URL
// namespace for this file.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return states.map((state) => ({
    url: `${SITE_URL}/locations/${state.slug}/`,
    lastModified: now,
    priority: 0.7,
  }));
}
