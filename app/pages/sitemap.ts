import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Lives in its own folder (rather than a single shared app/sitemap.ts
// with generateSitemaps ids) so the URL reads /pages/sitemap.xml
// instead of /sitemap/pages.xml. This folder has no page.tsx — it
// only exists as a URL namespace for this file.
const staticPages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/services/", priority: 0.9 },
  { path: "/locations/", priority: 0.9 },
  { path: "/commercial/", priority: 0.8 },
  { path: "/residential/", priority: 0.8 },
  { path: "/about/", priority: 0.5 },
  { path: "/accessibility/", priority: 0.3 },
  { path: "/contact/", priority: 0.6 },
  { path: "/free-estimate/", priority: 0.8 },
  { path: "/faq/", priority: 0.5 },
  { path: "/blog/", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return staticPages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    priority: page.priority,
  }));
}
