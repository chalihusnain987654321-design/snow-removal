import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { SITE_URL } from "@/lib/site";

// Lives alongside the real /services/ and /services/[service]/ pages
// in this same folder — produces /services/sitemap.xml instead of
// /sitemap/services.xml.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}/`,
    lastModified: now,
    priority: 0.7,
  }));
}
