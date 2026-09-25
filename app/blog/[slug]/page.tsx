import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { getServiceBySlug } from "@/data/services";
import { getCityBySlug } from "@/data/cities";
import { business } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { blogPostingSchema } from "@/lib/schema";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedServices = post.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const relatedCities = post.relatedCities
    .map((ref) => getCityBySlug(ref.stateSlug, ref.citySlug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />
      <Section tone="white" className="pb-6 pt-8 sm:pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog/" },
            { label: post.title },
          ]}
        />
        <h1 className="mt-4 font-heading text-4xl font-extrabold text-navy-950">{post.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
          <span>By {business.name}</span>
          <span aria-hidden="true">·</span>
          <span>Published {formatDate(post.publishedAt)}</span>
          {post.updatedAt !== post.publishedAt && (
            <>
              <span aria-hidden="true">·</span>
              <span>Updated {formatDate(post.updatedAt)}</span>
            </>
          )}
        </div>

        {post.isNotLegalAdvice && (
          <div className="mt-6 max-w-3xl rounded-lg border border-dashed border-accent-600 bg-white p-4 text-sm text-slate-700">
            <strong>Not legal advice.</strong> This article covers general concepts only. Laws
            vary by state. Talk to a licensed attorney about your specific situation.
          </div>
        )}

        <div className="mt-6 max-w-3xl space-y-4 text-slate-700">
          {post.intro.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {post.sections.map((section, index) => (
        <Section key={section.heading} tone={index % 2 === 0 ? "fog" : "white"}>
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-navy-950">{section.heading}</h2>
            <div className="mt-4 space-y-4 text-slate-700">
              {section.body.split("\n\n").map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
            {section.list && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </Section>
      ))}

      {(relatedServices.length > 0 || relatedCities.length > 0) && (
        <Section tone="white">
          <div className="grid gap-8 sm:grid-cols-2">
            {relatedServices.length > 0 && (
              <div>
                <h2 className="font-heading text-lg font-semibold text-navy-950">Related services</h2>
                <ul className="mt-3 space-y-1">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link href={`/services/${service.slug}/`} className="text-accent-700 hover:underline">
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedCities.length > 0 && (
              <div>
                <h2 className="font-heading text-lg font-semibold text-navy-950">Service areas</h2>
                <ul className="mt-3 space-y-1">
                  {relatedCities.map((city) => (
                    <li key={`${city.stateSlug}-${city.slug}`}>
                      <Link
                        href={`/locations/${city.stateSlug}/${city.slug}/`}
                        className="text-accent-700 hover:underline"
                      >
                        Snow removal in {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section tone="fog">
        <CtaBand heading="Get a free estimate" subheading={business.responseTimePromise} />
      </Section>
    </>
  );
}
