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
  title: "Residential Snow Removal",
  description:
    "Residential driveway plowing, sidewalk clearing, and ice management. Set a trigger depth once and get serviced on every qualifying storm.",
  alternates: { canonical: "/residential/" },
};

const reasons = [
  "Trigger-depth dispatch: plowed while the storm is active",
  "Same crew learns your property's layout over the season",
  "Per-push or flat-rate seasonal contracts",
  "Damage-aware plowing around landscaping and hardscaping",
];

const residentialFaqs = [
  {
    question: "What trigger depth do you plow at?",
    answer: "Most residential customers set a 2-inch trigger, meaning we plow once 2 inches has accumulated and again as needed through the storm.",
  },
  {
    question: "What's the difference between per-push and seasonal service?",
    answer: "Per-push bills you for each visit, which suits light-snow winters. A seasonal contract is a flat rate for the whole season, which suits budgeting predictability in a heavy-snow winter.",
  },
  {
    question: "Do I need to move my car?",
    answer: "Yes, if your car is in the driveway we can't clear underneath or around it fully. Let dispatch know if a car will be present.",
  },
  {
    question: "Will plowing damage my driveway or landscaping?",
    answer: "Every property is scouted before the season to mark edges, drainage, and hardscaping, and blades are set to avoid gouging asphalt or concrete.",
  },
];

export default function ResidentialPage() {
  const residentialServices = services.filter((service) => service.audience !== "commercial");

  return (
    <>
      <Section tone="navy" className="pb-14 pt-10 sm:pb-20">
        <Breadcrumbs tone="dark" items={[{ label: "Home", href: "/" }, { label: "Residential" }]} />
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
              Driveway plowing that shows up during the storm, not after.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-300">
              Set a trigger depth once, and every qualifying storm gets serviced the same way:
              no re-explaining your property each time it snows.
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
        <h2 className="font-heading text-2xl font-bold text-navy-950">Services for homeowners</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {residentialServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section tone="white">
        <h2 className="font-heading text-2xl font-bold text-navy-950">FAQs</h2>
        <div className="mt-6">
          <FaqAccordion items={residentialFaqs} />
        </div>
      </Section>

      <Section tone="fog">
        <CtaBand heading="Get a residential snow removal quote" subheading={business.responseTimePromise} />
      </Section>
    </>
  );
}
