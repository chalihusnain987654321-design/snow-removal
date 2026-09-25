import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getServiceBySlug } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { ServiceIconGlyph, CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};

  return {
    title: `${service.name} | Residential & Commercial`,
    description: `${service.shortDescription} Serving homeowners and businesses with 24/7 storm dispatch.`.slice(0, 158),
    alternates: { canonical: `/services/${service.slug}/` },
  };
}

const audienceLabel = {
  residential: "Built for homeowners.",
  commercial: "Built for commercial, HOA, and institutional properties.",
  both: "Available for both residential and commercial properties.",
} as const;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug && s.audience === service.audience).slice(0, 3);
  const relatedFallback = related.length > 0 ? related : services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const paragraphs = service.longDescription.split("\n\n");

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <Section tone="white" className="pb-6 pt-8 sm:pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services/" },
            { label: service.name },
          ]}
        />
        <div className="mt-4 flex items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-navy-950 text-white">
            <ServiceIconGlyph icon={service.icon} className="size-7" />
          </span>
          <div>
            <h1 className="font-heading text-4xl font-extrabold text-navy-950">{service.name}</h1>
            <p className="mt-1 text-slate-600">{audienceLabel[service.audience]}</p>
          </div>
        </div>
        <div className="mt-6 max-w-3xl space-y-4 text-slate-700">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section tone="fog" className="py-8 sm:py-10">
        <CtaBand
          heading={`Get a quote for ${service.name.toLowerCase()}`}
          subheading="Tell us about your property and we'll follow up with a property-specific quote."
        />
      </Section>

      <Section tone="white">
        <h2 className="font-heading text-2xl font-bold text-navy-950">What&apos;s included</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {service.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-slate-700">
              <CheckIcon className="mt-1 size-4 shrink-0 text-accent-600" />
              {benefit}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="fog">
        <h2 className="font-heading text-2xl font-bold text-navy-950">How it works</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, index) => (
            <div key={step.step}>
              <div className="font-heading text-xl font-bold text-accent-600">{index + 1}</div>
              <div className="mt-1 font-semibold text-navy-950">{step.step}</div>
              <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <h2 className="font-heading text-2xl font-bold text-navy-950">FAQs</h2>
        <div className="mt-6">
          <FaqAccordion items={service.faqs} />
        </div>
      </Section>

      <Section tone="fog">
        <h2 className="font-heading text-2xl font-bold text-navy-950">Related services</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {relatedFallback.map((related) => (
            <ServiceCard key={related.slug} service={related} />
          ))}
        </div>
        <div className="mt-8">
          <Link href="/locations/" className="font-semibold text-accent-700 hover:underline">
            Find service in your area →
          </Link>
        </div>
      </Section>

      <Section tone="white">
        <CtaBand heading={`Ready to set up ${service.name.toLowerCase()}?`} />
      </Section>
    </>
  );
}
