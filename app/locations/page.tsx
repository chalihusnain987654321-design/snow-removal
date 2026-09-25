import type { Metadata } from "next";
import Link from "next/link";
import { states } from "@/data/states";
import { cities, getCitiesForState } from "@/data/cities";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StatCard } from "@/components/ui/StatCard";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Snow removal service areas across Michigan, New York, and Minnesota. Find your state and city for local plowing and ice management.",
  alternates: { canonical: "/locations/" },
};

export default function LocationsHubPage() {
  return (
    <>
      <Section tone="navy" className="pb-14 pt-10 sm:pb-20">
        <Breadcrumbs tone="dark" items={[{ label: "Home", href: "/" }, { label: "Locations" }]} />
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <div className="lg:order-2">
            <QuoteForm compact />
          </div>
          <div className="lg:order-1">
            <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl">Where we work</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Service areas across the snowbelt. Select a state to see local coverage, or find your
              city directly below.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-lg sm:grid-cols-3">
              <StatCard label="States served" value={String(states.length)} />
              <StatCard label="Cities served" value={String(cities.length)} />
              <StatCard label="Dispatch" value="24/7" />
            </div>
          </div>
        </div>
      </Section>

      {states.map((state, index) => {
        const cities = getCitiesForState(state.slug);
        return (
          <Section key={state.slug} tone={index % 2 === 0 ? "fog" : "white"}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-heading text-2xl font-bold text-navy-950">
                <Link href={`/locations/${state.slug}/`} className="hover:underline">
                  {state.name}
                </Link>
              </h2>
              <span className="text-sm text-slate-600">{cities.length} cities served</span>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/locations/${state.slug}/${city.slug}/`}
                    className="text-navy-800 hover:text-accent-700 hover:underline"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        );
      })}

      <Section tone="fog">
        <CtaBand
          heading="Don't see your city?"
          subheading="We're expanding coverage every season. Contact us to check availability for your address."
        />
      </Section>
    </>
  );
}
