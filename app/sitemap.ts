import type { MetadataRoute } from "next";
import { states } from "@/data/states";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";
import { SITE_URL } from "@/lib/site";

// Split sitemaps per the brief (Section 8): pages, states, cities,
// services, blog — each well under the 5,000 URL cap, with Next.js
// generating the sitemap index automatically from these ids.
const SITEMAP_IDS = {
  pages: 0,
  states: 1,
  cities: 2,
  services: 3,
  blog: 4,
} as const;

export function generateSitemaps() {
  return Object.values(SITEMAP_IDS).map((id) => ({ id }));
}

const staticPages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/services/", priority: 0.9 },
  { path: "/locations/", priority: 0.9 },
  { path: "/commercial/", priority: 0.8 },
  { path: "/residential/", priority: 0.8 },
  { path: "/about/", priority: 0.5 },
  { path: "/contact/", priority: 0.6 },
  { path: "/free-estimate/", priority: 0.8 },
  { path: "/faq/", priority: 0.5 },
  { path: "/blog/", priority: 0.6 },
];

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  // Next's metadata-route loader passes `id` as a Promise (resolving to
  // the route segment string, e.g. "0") even though generateStaticParams
  // declares it as a number — must be awaited before comparing.
  const numericId = Number(await id);

  if (numericId === SITEMAP_IDS.pages) {
    return staticPages.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      priority: page.priority,
    }));
  }

  if (numericId === SITEMAP_IDS.states) {
    return states.map((state) => ({
      url: `${SITE_URL}/locations/${state.slug}/`,
      lastModified: now,
      priority: 0.7,
    }));
  }

  if (numericId === SITEMAP_IDS.cities) {
    return cities.map((city) => ({
      url: `${SITE_URL}/locations/${city.stateSlug}/${city.slug}/`,
      lastModified: now,
      priority: 0.8,
    }));
  }

  if (numericId === SITEMAP_IDS.services) {
    return services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}/`,
      lastModified: now,
      priority: 0.7,
    }));
  }

  if (numericId === SITEMAP_IDS.blog) {
    return blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: new Date(post.updatedAt),
      priority: 0.5,
    }));
  }

  return [];
}
