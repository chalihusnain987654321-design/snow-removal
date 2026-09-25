import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPostsSorted } from "@/data/blog";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical guides on snow removal costs, contracts, ice dams, de-icing, roof snow load, and more.",
  alternates: { canonical: "/blog/" },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogHubPage() {
  const posts = getBlogPostsSorted();

  return (
    <Section tone="white" className="pb-16 pt-8 sm:pt-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <h1 className="mt-4 font-heading text-4xl font-extrabold text-navy-950">Blog</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        Practical guides on snow removal costs, contracts, ice management, and winter property care.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="flex flex-col gap-2 rounded-lg border border-line-200 bg-white p-6 transition-colors hover:border-navy-700"
          >
            <span className="text-xs uppercase tracking-wide text-slate-500">{formatDate(post.publishedAt)}</span>
            <span className="font-heading text-lg font-semibold text-navy-950">{post.title}</span>
            <span className="text-sm text-slate-600">{post.excerpt}</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
