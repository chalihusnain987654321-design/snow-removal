import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { services } from "@/data/services";
import { states } from "@/data/states";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TrustBar } from "@/components/ui/TrustBar";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { StateGrid } from "@/components/ui/StateGrid";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Snow Removal & Ice Management",
  description:
    "Residential and commercial snow plowing, sidewalk clearing, and ice management with 24/7 storm dispatch. Get a free estimate.",
  alternates: { canonical: "/" },
};

const howItWorks = [
  { step: "1", title: "Request a quote", detail: "Tell us about your property online or by phone." },
  { step: "2", title: "Set your trigger", detail: "Choose your plow trigger depth and service schedule." },
  { step: "3", title: "We dispatch on the storm", detail: "Crews go out once your trigger depth hits, day or night." },
  { step: "4", title: "Clear and confirmed", detail: "Property cleared, and you can always reach dispatch for a status check." },
];

const homeFaqs = [
  {
    question: "What's the difference between per-push and seasonal contracts?",
    answer:
      "Per-push billing charges you each time we plow, which suits light-snow winters. A seasonal contract is a flat rate for the whole season regardless of storm count, which suits budgeting predictability in a heavy-snow winter.",
  },
  {
    question: `How fast do you respond once it starts snowing?`,
    answer: `${business.responseTimePromise}. Routes are planned from the forecast so crews are already moving once your trigger depth is reached.`,
  },
  {
    question: "Do you handle both residential and commercial properties?",
    answer:
      "Yes. We plow driveways for homeowners and manage parking lots, sidewalks, and ice control for commercial, HOA, and municipal properties.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Check the locations list below for current service areas. We're expanding coverage as capacity grows. Contact us if your city isn't listed yet.",
  },
  {
    question: "Can I request one-time service instead of a contract?",
    answer:
      "Yes, per-push service doesn't require a season-long commitment. Seasonal contracts are available if you'd rather lock in a flat rate.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Ask us for current proof of licensing and insurance when you request a quote. We're glad to provide it before you sign anything.",
  },
];

export default function HomePage() {
  return (
    <>
      <Section tone="navy" className="pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
              Snow removal that shows up before the storm ends.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-300">
              Residential driveway plowing and commercial lot management with 24/7 storm
              dispatch. One call sets your service for the entire season.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href={`tel:${business.phoneHref}`} variant="primary">
                <PhoneIcon className="size-4" />
                Call {business.phone}
              </Button>
              <Button href="/free-estimate/" variant="outline">
                Get a free estimate
              </Button>
            </div>
          </div>
          <div>
            <QuoteForm compact />
          </div>
        </div>
      </Section>

      <Section tone="fog" className="py-8 sm:py-10">
        <TrustBar />
      </Section>

      <Section tone="white">
        <h2 className="font-heading text-3xl font-bold text-navy-950">Services</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          From driveways to full commercial ice management, pick a service to see what&apos;s
          included.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-8">
          <Link href="/services/" className="font-semibold text-accent-700 hover:underline">
            View all services →
          </Link>
        </div>
      </Section>

      <Section tone="fog">
        <h2 className="font-heading text-3xl font-bold text-navy-950">Where we work</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          We serve cities across the snowbelt. Select a state to see local coverage.
        </p>
        <div className="mt-8">
          <StateGrid states={states} />
        </div>
      </Section>

      <Section tone="white">
        <h2 className="font-heading text-3xl font-bold text-navy-950">How it works</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item) => (
            <div key={item.step}>
              <div className="font-heading text-2xl font-bold text-accent-600">{item.step}</div>
              <div className="mt-2 font-semibold text-navy-950">{item.title}</div>
              <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="fog">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-line-200 bg-white p-8">
            <h3 className="font-heading text-2xl font-bold text-navy-950">Residential</h3>
            <p className="mt-2 text-slate-600">
              Driveway plowing, sidewalk shoveling, and ice control for homeowners.
            </p>
            <Button href="/residential/" variant="secondary" className="mt-5">
              Residential services
            </Button>
          </div>
          <div className="rounded-lg border border-line-200 bg-white p-8">
            <h3 className="font-heading text-2xl font-bold text-navy-950">Commercial</h3>
            <p className="mt-2 text-slate-600">
              Parking lots, sidewalks, and ice management for properties that can&apos;t afford
              downtime.
            </p>
            <Button href="/commercial/" variant="secondary" className="mt-5">
              Commercial services
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <h2 className="font-heading text-3xl font-bold text-navy-950">Frequently asked questions</h2>
        <div className="mt-8">
          <FaqAccordion items={homeFaqs} />
        </div>
      </Section>

      <Section tone="fog">
        <CtaBand
          heading="Ready for the next storm?"
          subheading="Set up service once and we handle dispatch for the rest of the season."
        />
      </Section>
    </>
  );
}
