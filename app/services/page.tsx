import type { Metadata } from "next";
import { services } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StatCard } from "@/components/ui/StatCard";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Snow Removal Services",
  description:
    "Residential and commercial snow removal services: plowing, sidewalk clearing, ice management, roof snow removal, and seasonal contracts.",
  alternates: { canonical: "/services/" },
};

// Services marked "both" belong under each audience that actually uses
// them, not siloed into a separate third group — otherwise a service
// like sidewalk clearing (relevant to homeowners) only shows up under
// "Residential & Commercial" and the Residential section looks like it
// has almost nothing in it. Matches the filter logic already used on
// /residential/ and /commercial/.
const groups = [
  { label: "Residential", exclude: "commercial" as const },
  { label: "Commercial & Institutional", exclude: "residential" as const },
];

export default function ServicesHubPage() {
  const residentialCount = services.filter((service) => service.audience !== "commercial").length;
  const commercialCount = services.filter((service) => service.audience !== "residential").length;

  return (
    <>
      <Section tone="navy" className="pb-14 pt-10 sm:pb-20">
        <Breadcrumbs tone="dark" items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl">Services</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Plowing, ice management, and everything in between, for driveways, parking lots, and
              everything a property needs to stay clear through the winter.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-lg sm:grid-cols-3">
              <StatCard label="Total services" value={String(services.length)} />
              <StatCard label="Residential" value={String(residentialCount)} />
              <StatCard label="Commercial" value={String(commercialCount)} />
            </div>
          </div>
          <div>
            <QuoteForm compact />
          </div>
        </div>
      </Section>

      {groups.map((group, index) => {
        const groupServices = services.filter((service) => service.audience !== group.exclude);
        if (groupServices.length === 0) return null;
        return (
          <Section key={group.label} tone={index % 2 === 0 ? "fog" : "white"}>
            <h2 className="font-heading text-2xl font-bold text-navy-950">{group.label}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {groupServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Section>
        );
      })}

      <Section tone="fog">
        <CtaBand heading="Not sure which service you need?" subheading="Tell us about your property and we'll recommend a plan." />
      </Section>
    </>
  );
}
