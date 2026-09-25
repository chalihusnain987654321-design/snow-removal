import type { Metadata } from "next";
import Link from "next/link";
import { states } from "@/data/states";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

// Backs the WebSite SearchAction in the site-wide JSON-LD (lib/schema.ts)
// — server-rendered, no client JS, so the schema points at a real,
// working results page instead of a URL that doesn't do anything.
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();

  const matchedStates = query ? states.filter((state) => state.name.toLowerCase().includes(query)) : [];
  const matchedCities = query
    ? cities.filter((city) => city.name.toLowerCase().includes(query) || city.stateSlug.includes(query))
    : [];
  const matchedServices = query
    ? services.filter(
        (service) =>
          service.name.toLowerCase().includes(query) || service.shortDescription.toLowerCase().includes(query),
      )
    : [];

  const hasResults = matchedStates.length + matchedCities.length + matchedServices.length > 0;

  return (
    <Section tone="white" className="pb-16 pt-8 sm:pt-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <h1 className="mt-4 font-heading text-4xl font-extrabold text-navy-950">Search</h1>

      <form method="get" className="mt-6 flex max-w-md gap-2">
        <label htmlFor="q" className="sr-only">
          Search services and locations
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={q ?? ""}
          placeholder="Search a city, state, or service…"
          className="w-full rounded-md border border-line-200 px-3 py-2 text-[15px] focus:border-navy-700 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-accent-600 px-4 py-2 text-[15px] font-semibold text-white hover:bg-accent-700"
        >
          Search
        </button>
      </form>

      {query && (
        <div className="mt-10 space-y-10">
          {matchedServices.length > 0 && (
            <div>
              <h2 className="font-heading text-xl font-bold text-navy-950">Services</h2>
              <ul className="mt-3 space-y-1">
                {matchedServices.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}/`} className="text-accent-700 hover:underline">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {matchedStates.length > 0 && (
            <div>
              <h2 className="font-heading text-xl font-bold text-navy-950">States</h2>
              <ul className="mt-3 space-y-1">
                {matchedStates.map((state) => (
                  <li key={state.slug}>
                    <Link href={`/locations/${state.slug}/`} className="text-accent-700 hover:underline">
                      {state.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {matchedCities.length > 0 && (
            <div>
              <h2 className="font-heading text-xl font-bold text-navy-950">Cities</h2>
              <ul className="mt-3 space-y-1">
                {matchedCities.map((city) => (
                  <li key={`${city.stateSlug}-${city.slug}`}>
                    <Link
                      href={`/locations/${city.stateSlug}/${city.slug}/`}
                      className="text-accent-700 hover:underline"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!hasResults && (
            <p className="text-slate-600">
              No matches for &ldquo;{q}&rdquo;. Try a city, state, or service name, or{" "}
              <Link href="/contact/" className="text-accent-700 underline hover:text-accent-600">
                contact us
              </Link>{" "}
              directly.
            </p>
          )}
        </div>
      )}
    </Section>
  );
}
