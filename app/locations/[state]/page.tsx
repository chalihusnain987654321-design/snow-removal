import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { states, getStateBySlug } from "@/data/states";
import { getCitiesForState } from "@/data/cities";
import { services } from "@/data/services";
import { business } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StatCard } from "@/components/ui/StatCard";
import { CityGrid } from "@/components/ui/CityGrid";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { CtaBand } from "@/components/ui/CtaBand";
import { formatInches } from "@/lib/format";

export function generateStaticParams() {
  return states.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) return {};

  return {
    title: `Snow Removal Services in ${state.name}`,
    description: `Residential and commercial snow removal in ${state.name}. Plowing, sidewalk clearing, and ice management with 24/7 storm dispatch. ${business.phone}.`.slice(
      0,
      158,
    ),
    alternates: { canonical: `/locations/${state.slug}/` },
  };
}

function stateFaqs(stateName: string) {
  return [
    {
      question: `Do you serve every city in ${stateName}?`,
      answer: `We're expanding coverage across ${stateName} as capacity grows. Check the city list below, and contact us if your city isn't listed yet.`,
    },
    {
      question: "What's the difference between per-push and seasonal contracts?",
      answer:
        "Per-push billing charges you each time we plow. A seasonal contract is a flat rate for the whole season regardless of storm count.",
    },
    {
      question: "Do you handle commercial and HOA properties?",
      answer:
        "Yes, parking lots, sidewalks, and ice control for commercial, HOA, and municipal properties, alongside residential driveways.",
    },
    {
      question: "How quickly do you respond once a storm starts?",
      answer: `${business.responseTimePromise}. Routes are planned from the forecast so crews move once your trigger depth is reached.`,
    },
    {
      question: "Do local ordinances affect snow removal timing?",
      answer:
        "Many cities set sidewalk-clearing deadlines and on-street parking bans during snow events. Check your city's page for local specifics, and verify current rules with your municipality.",
    },
  ];
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const cities = getCitiesForState(state.slug);

  return (
    <>
      <Section tone="navy" className="pb-14 pt-10 sm:pb-20">
        <Breadcrumbs
          tone="dark"
          items={[
            { label: "Home", href: "/" },
            { label: "Locations", href: "/locations/" },
            { label: state.name },
          ]}
        />
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
              Snow Removal Services in {state.name}
            </h1>
            {state.climateNotes ? (
              <p className="mt-4 max-w-3xl text-lg text-slate-300">{state.climateNotes}</p>
            ) : (
              <p className="mt-4 max-w-3xl text-lg text-slate-300">
                We provide residential and commercial snow removal across {state.name}, with crews
                dispatched on the forecast rather than after a storm has already ended.
              </p>
            )}
            {(state.avgAnnualSnowfallInches !== null || state.snowSeasonMonths) && (
              <div className="mt-8 grid grid-cols-2 items-start gap-3 sm:max-w-lg sm:grid-cols-3">
                <StatCard label="Avg. annual snowfall" value={formatInches(state.avgAnnualSnowfallInches)} />
                <StatCard label="Snow season" value={state.snowSeasonMonths} />
                <StatCard label="Cities served" value={String(cities.length)} />
              </div>
            )}
          </div>
          <div>
            <QuoteForm compact />
          </div>
        </div>
      </Section>

      {state.stateSpecificNotes && (
        <Section tone="fog">
          <h2 className="font-heading text-2xl font-bold text-navy-950">Local conditions & rules</h2>
          <p className="mt-3 max-w-3xl text-slate-600">{state.stateSpecificNotes}</p>
        </Section>
      )}

      <Section tone="white">
        <h2 className="font-heading text-2xl font-bold text-navy-950">Cities we serve in {state.name}</h2>
        <div className="mt-6">
          <CityGrid stateSlug={state.slug} cities={cities} />
        </div>
      </Section>

      <Section tone="fog">
        <h2 className="font-heading text-2xl font-bold text-navy-950">Services offered in {state.name}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section tone="white">
        <h2 className="font-heading text-2xl font-bold text-navy-950">FAQs</h2>
        <div className="mt-6">
          <FaqAccordion items={stateFaqs(state.name)} />
        </div>
      </Section>

      <Section tone="fog">
        <CtaBand heading={`Get a snow removal quote in ${state.name}`} />
      </Section>
    </>
  );
}
