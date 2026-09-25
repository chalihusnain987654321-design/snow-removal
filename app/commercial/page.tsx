import type { Metadata } from "next";
import { services } from "@/data/services";
import { business } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Commercial Snow Removal",
  description:
    "Commercial snow plowing, sidewalk clearing, and ice management for parking lots, HOAs, retail, office, and medical properties. 24/7 storm dispatch.",
  alternates: { canonical: "/commercial/" },
};

const reasons = [
  "Zone-based clearing: drive lanes, fire lanes, and entrances first",
  "Seasonal contracts with a guaranteed response window",
  "Dated service records for liability documentation",
  "Sized equipment for full lots, tight sites, and loading docks",
];

const commercialFaqs = [
  {
    question: "How are commercial contracts structured?",
    answer: "Most commercial properties are set up on a seasonal contract after a site visit, based on square footage, layout, and local snowfall history rather than a flat per-visit rate.",
  },
  {
    question: "Can you guarantee our lot is clear before we open?",
    answer: "Seasonal contracts can include a guaranteed response window tied to your operating hours. Ask about response-time terms when you request a quote.",
  },
  {
    question: "Do you work with property management companies?",
    answer: "Yes, multi-property owners and management companies get a single point of contact and consistent service records across every site.",
  },
  {
    question: "What's included besides plowing?",
    answer: "Sidewalk clearing, ice management, and anti-icing pre-treatment are all available on their own or bundled into a seasonal contract.",
  },
];

export default function CommercialPage() {
  const commercialServices = services.filter((service) => service.audience !== "residential");

  return (
    <>
      <Section tone="navy" className="pb-14 pt-10 sm:pb-20">
        <Breadcrumbs tone="dark" items={[{ label: "Home", href: "/" }, { label: "Commercial" }]} />
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
              Commercial snow removal that keeps a property open through the storm.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-300">
              Parking lots, drive lanes, sidewalks, and ice control, scheduled around your
              operating hours, not a fixed daily route.
            </p>
          </div>
          <QuoteForm compact />
        </div>
      </Section>

      <Section tone="white">
        <ul className="grid gap-4 sm:grid-cols-2">
          {reasons.map((reason) => (
            <li key={reason} className="flex items-start gap-2 text-slate-700">
              <CheckIcon className="mt-1 size-4 shrink-0 text-accent-600" />
              {reason}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="fog">
        <h2 className="font-heading text-2xl font-bold text-navy-950">Services for commercial properties</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {commercialServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section tone="white">
        <h2 className="font-heading text-2xl font-bold text-navy-950">FAQs</h2>
        <div className="mt-6">
          <FaqAccordion items={commercialFaqs} />
        </div>
      </Section>

      <Section tone="fog">
        <CtaBand heading="Get a commercial snow removal quote" subheading={business.responseTimePromise} />
      </Section>
    </>
  );
}
