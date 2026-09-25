import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The brief's URL map (Section 6) specifies trailing slashes on every
  // route. Every internal link, canonical tag, and sitemap entry in
  // this app is built that way — without this, Next's default
  // no-trailing-slash behavior 308-redirects every single page.
  // Known minor side effect: Next's own generated og:image URLs for
  // opengraph-image.tsx routes omit the trailing slash, so social
  // crawlers hit one redirect hop before the image — robots.txt and
  // the sitemap files are unaffected (extension-based routes are
  // exempt from trailingSlash), and image-preview crawlers reliably
  // follow redirects, so this is left as-is rather than worked around.
  trailingSlash: true,
  // Add a 301 entry here whenever a state, city, or service slug
  // changes, so old indexed URLs don't 404 (brief, Section 6). Example:
  // { source: "/locations/michigan/grand-rapids-mi/", destination: "/locations/michigan/grand-rapids/", permanent: true }
  async redirects() {
    return [];
  },
};

export default nextConfig;
