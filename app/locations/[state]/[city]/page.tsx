import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { cities, getCityBySlug } from "@/data/cities";
import { getStateBySlug } from "@/data/states";
import { services } from "@/data/services";
import { business } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StatCard } from "@/components/ui/StatCard";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { Button } from "@/components/ui/Button";
import { PinIcon, PhoneIcon } from "@/components/icons";
import { formatInches } from "@/lib/format";
import {
  introParagraph,
  localConditionsOpener,
  residentialBlurb,
  commercialBlurb,
  responseTimeBlurb,
  middleModuleOrder,
  selectCityFaqs,
  type MiddleModule,
} from "@/lib/variation";

export function generateStaticParams() {
  return cities.map((city) => ({ state: city.stateSlug, city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCityBySlug(stateSlug, citySlug);
  const state = city ? getStateBySlug(city.stateSlug) : undefined;
  if (!city || !state) return {};

  return {
    title: `Snow Removal in ${city.name}, ${state.abbr} | Plowing & Ice Control`,
    description: `Snow plowing, sidewalk clearing, and ice management in ${city.name}, ${state.abbr}. 24/7 storm dispatch. Call ${business.phone} for a free estimate.`.slice(
      0,
      158,
    ),
    alternates: { canonical: `/locations/${state.slug}/${city.slug}/` },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCityBySlug(stateSlug, citySlug);
  const state = city ? getStateBySlug(city.stateSlug) : undefined;
  if (!city || !state) notFound();

  const ctx = { city, state };

  const hasSnowStats =
    city.avgAnnualSnowfallInches !== null ||
    city.avgSnowDaysPerYear !== null ||
    city.coldestMonthAvgLowF !== null;

  const nearbyCities = city.nearbyCitySlugs
    .map((slug) => cities.find((candidate) => candidate.slug === slug && candidate.stateSlug === city.stateSlug))
    .filter((candidate): candidate is (typeof cities)[number] => Boolean(candidate));

  // Modules 5–10 of the brief's required city-page order rotate per city
  // (Section 9.2) — same city always gets the same order, different
  // cities get a different one. Tone alternates by render position, not
  // by module identity, so the white/fog rhythm still reads cleanly
  // after reordering.
  let toneIndex = 0;
  const nextTone = () => (toneIndex++ % 2 === 0 ? "white" : "fog");

  const moduleRenderers: Record<MiddleModule, () => ReactNode> = {
    neighborhoods: () =>
      (city.neighborhoods.length > 0 || city.zipCodes.length > 0) && (
        <Section key="neighborhoods" tone={nextTone()}>
          <h2 className="font-heading text-2xl font-bold text-navy-950">Neighborhoods & areas we serve</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {city.neighborhoods.map((neighborhood) => (
              <span
                key={neighborhood}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-200 bg-white px-3 py-1 text-sm text-navy-800"
              >
                <PinIcon className="size-3.5 text-accent-600" />
                {neighborhood}
              </span>
            ))}
          </div>
          {city.zipCodes.length > 0 && (
            <p className="mt-3 text-sm text-slate-600">ZIP codes: {city.zipCodes.join(", ")}</p>
          )}
        </Section>
      ),
    localConditions: () =>
      (city.localSnowNotes || city.majorRoads.length > 0) && (
        <Section key="localConditions" tone={nextTone()}>
          <h2 className="font-heading text-2xl font-bold text-navy-950">Local conditions</h2>
          <p className="mt-3 max-w-3xl text-slate-600">{localConditionsOpener(ctx)}</p>
          {city.localSnowNotes && <p className="mt-3 max-w-3xl text-slate-600">{city.localSnowNotes}</p>}
          {city.majorRoads.length > 0 && (
            <p className="mt-3 max-w-3xl text-slate-600">
              We regularly service routes near {city.majorRoads.join(", ")}.
            </p>
          )}
        </Section>
      ),
    ordinance: () =>
      city.ordinanceNote && (
        <Section key="ordinance" tone={nextTone()}>
          <h2 className="font-heading text-2xl font-bold text-navy-950">Local rules & timing</h2>
          <p className="mt-3 max-w-3xl text-slate-600">{city.ordinanceNote}</p>
          <p className="mt-2 text-sm text-slate-600">
            Rules can change, so verify current requirements with your municipality.
          </p>
        </Section>
      ),
    residentialCommercial: () => (
      <Section key="residentialCommercial" tone={nextTone()}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-line-200 bg-white p-6">
            <h3 className="font-heading text-lg font-semibold text-navy-950">Residential</h3>
            <p className="mt-2 text-sm text-slate-600">{residentialBlurb(ctx)}</p>
          </div>
          <div className="rounded-lg border border-line-200 bg-white p-6">
            <h3 className="font-heading text-lg font-semibold text-navy-950">Commercial</h3>
            <p className="mt-2 text-sm text-slate-600">{commercialBlurb(ctx)}</p>
          </div>
        </div>
      </Section>
    ),
    responseTime: () => (
      <Section key="responseTime" tone={nextTone()}>
        <h2 className="font-heading text-2xl font-bold text-navy-950">Response time</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          {business.responseTimePromise}. {responseTimeBlurb(ctx)}
        </p>
      </Section>
    ),
  };

  const orderedMiddleModules = middleModuleOrder(city).map((key) => moduleRenderers[key]());

  return (
    <>
      <Section tone="white" className="pb-6 pt-8 sm:pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Locations", href: "/locations/" },
            { label: state.name, href: `/locations/${state.slug}/` },
            { label: city.name },
          ]}
        />
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <div className="lg:order-2">
            <QuoteForm compact />
          </div>
          <div className="lg:order-1">
            <h1 className="font-heading text-4xl font-extrabold text-navy-950">
              Snow Removal in {city.name}, {state.abbr}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              Residential and commercial plowing with 24/7 storm dispatch.
            </p>
            <div className="mt-5">
              <Button href={`tel:${business.phoneHref}`} variant="primary">
                <PhoneIcon className="size-4" />
                Call {business.phone}
              </Button>
            </div>
            <p className="mt-6 max-w-2xl text-slate-600">{introParagraph(ctx)}</p>
          </div>
        </div>
      </Section>

      {(hasSnowStats || city.county) && (
        <Section tone="fog" className="py-8 sm:py-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Avg. annual snowfall" value={formatInches(city.avgAnnualSnowfallInches)} />
            <StatCard label="Avg. snow days" value={city.avgSnowDaysPerYear !== null ? String(city.avgSnowDaysPerYear) : null} />
            <StatCard label="Coldest month low" value={city.coldestMonthAvgLowF !== null ? `${city.coldestMonthAvgLowF}°F` : null} />
            <StatCard label="County" value={city.county} />
          </div>
        </Section>
      )}

      <Section tone="white">
        <h2 className="font-heading text-2xl font-bold text-navy-950">
          Services we provide in {city.name}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      {orderedMiddleModules}

      <Section tone={nextTone()}>
        <h2 className="font-heading text-2xl font-bold text-navy-950">FAQs</h2>
        <div className="mt-6">
          <FaqAccordion items={selectCityFaqs(ctx, 6)} />
        </div>
      </Section>

      {nearbyCities.length > 0 && (
        <Section tone={nextTone()}>
          <h2 className="font-heading text-2xl font-bold text-navy-950">Nearby cities we serve</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {nearbyCities.map((nearby) => (
              <li key={nearby.slug}>
                <Link
                  href={`/locations/${nearby.stateSlug}/${nearby.slug}/`}
                  className="text-accent-700 hover:underline"
                >
                  {nearby.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
