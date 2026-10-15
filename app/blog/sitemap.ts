import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { SITE_URL } from "@/lib/site";

// Lives alongside the real /blog/ and /blog/[slug]/ pages in this same
// folder — produces /blog/sitemap.xml instead of /sitemap/blog.xml.
export default function sitemap(): MetadataRoute.Sitemap {
  return blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.updatedAt),
    priority: 0.5,
  }));
}
