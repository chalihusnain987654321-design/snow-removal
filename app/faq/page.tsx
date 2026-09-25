import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { services } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about snow removal service, contracts, and coverage.",
  alternates: { canonical: "/faq/" },
};

const generalFaqs = [
  {
    question: "How does trigger-depth dispatch work?",
    answer: "You set a snowfall depth (typically 2 inches for residential) and we dispatch once that depth is reached, then again as needed through the storm. It's planned from the forecast, not scheduled after the fact.",
  },
  {
    question: "What's the difference between per-push and seasonal service?",
    answer: "Per-push bills you for each visit, which suits light-snow winters. A seasonal contract is a flat rate for the whole season regardless of storm count, which suits budgeting predictability in a heavy-snow winter.",
  },
  {
    question: "Do you require a contract?",
    answer: "No, per-push service is available without a season-long commitment, though a seasonal contract is available if you'd rather lock in a flat rate.",
  },
  {
    question: "What areas do you serve?",
    answer: "Check the locations list for current coverage. We're expanding service area as capacity grows. Contact us if your city isn't listed yet.",
  },
  {
    question: "Are you licensed and insured?",
    answer: "Ask us for current proof of licensing and insurance when you request a quote. We're glad to provide it before you sign anything.",
  },
  {
    question: "How quickly do you respond once a storm starts?",
    answer: `${business.responseTimePromise}. Routes are planned from the forecast so crews are already moving once your trigger depth is reached.`,
  },
  {
    question: "Do you offer both residential and commercial service?",
    answer: "Yes. We plow driveways for homeowners and manage parking lots, sidewalks, and ice control for commercial, HOA, and municipal properties.",
  },
  {
    question: "Will plowing damage my property?",
    answer: "Every property is scouted before the season to mark edges, drainage, and hardscaping, and blades are set to avoid gouging asphalt or concrete.",
  },
];

export default function FaqPage() {
  return (
    <>
      <Section tone="white" className="pb-6 pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
        <h1 className="mt-4 font-heading text-4xl font-extrabold text-navy-950">Frequently asked questions</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          General questions about how service works. For questions specific to a service, visit
          that service&apos;s page.
        </p>
      </Section>

      <Section tone="fog">
        <FaqAccordion items={generalFaqs} />
      </Section>

      <Section tone="white">
        <h2 className="font-heading text-2xl font-bold text-navy-950">More questions by service</h2>
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}/`} className="text-navy-800 hover:text-accent-700 hover:underline">
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="fog">
        <CtaBand heading="Still have questions?" subheading="Call dispatch or send a quote request. We're glad to walk through your property." />
      </Section>
    </>
  );
}
