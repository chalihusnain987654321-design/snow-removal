import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export type Crumb = { label: string; href?: string };

// Renders the visible breadcrumb trail and its BreadcrumbList JSON-LD
// from the same `items` array, so the structured data can never drift
// out of sync with what's on the page.
//
// `tone` follows the same pattern as TrustBar/Button — this is hardcoded
// light-mode text otherwise, which goes unreadable on a navy hero.
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  const baseText = tone === "dark" ? "text-slate-400" : "text-slate-600";
  const linkHover = tone === "dark" ? "hover:text-white" : "hover:text-navy-900";
  const currentText = tone === "dark" ? "text-white" : "text-navy-900";

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${baseText}`}>
      <JsonLd data={schema} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className={`${linkHover} hover:underline`}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={currentText}>
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
