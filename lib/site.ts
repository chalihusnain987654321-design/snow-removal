import { business } from "@/config/business";

const isPlaceholder = (value: string) => /^\{\{.*\}\}$/.test(value);

// config/business.ts ships with siteUrl as a `{{SITE_URL}}` placeholder.
// Sitemaps, robots.txt, JSON-LD, and metadataBase all need a real
// absolute URL to build valid output, so this falls back to a clearly
// reserved placeholder domain until the real one is filled in — never
// emit the literal `{{SITE_URL}}` string into generated XML/JSON.
export const SITE_URL = isPlaceholder(business.siteUrl)
  ? "https://example.com"
  : business.siteUrl.replace(/\/$/, "");
