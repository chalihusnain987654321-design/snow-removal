import type { Metadata } from "next";
import { business } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrustBar } from "@/components/ui/TrustBar";
import { CtaBand } from "@/components/ui/CtaBand";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${business.name}: licensed snow removal with 24/7 storm dispatch for residential and commercial properties.`,
  alternates: { canonical: "/about/" },
};

const guarantees = [
  "Trigger-depth dispatch during active storms, not next-day cleanup",
  "Damage-aware equipment operators, scouted properties before the season",
  "Dated service records available on request",
  "Direct line to dispatch during an active storm",
];

export default function AboutPage() {
  return (
    <>
      <Section tone="white" className="pb-6 pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <h1 className="mt-4 font-heading text-4xl font-extrabold text-navy-950">About {business.name}</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          {business.legalName} provides residential and commercial snow removal with 24/7 storm
          dispatch. {business.licenseText ?? "Licensing and insurance details available on request."}
        </p>
      </Section>

      <Section tone="fog" className="py-8 sm:py-10">
        <TrustBar />
      </Section>

      <Section tone="white">
        <h2 className="font-heading text-2xl font-bold text-navy-950">Our approach</h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          Snow removal fails when it&apos;s reactive: a truck that shows up after the storm has
          already caused a problem. We plan routes from the forecast, not the weather that
          already happened, and dispatch once a property&apos;s trigger depth is reached so driveways
          and lots stay usable through the entire storm cycle, not just after it clears.
        </p>
        <p className="mt-3 max-w-3xl text-slate-700">
          Every property is scouted before the season so crews know where the edges, drainage,
          and hardscaping are before the first snow falls. That&apos;s what keeps mailboxes,
          landscaping, and pavement intact winter after winter.
        </p>
      </Section>

      <Section tone="fog">
        <h2 className="font-heading text-2xl font-bold text-navy-950">Service guarantees</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {guarantees.map((item) => (
            <li key={item} className="flex items-start gap-2 text-slate-700">
              <CheckIcon className="mt-1 size-4 shrink-0 text-accent-600" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <h2 className="font-heading text-2xl font-bold text-navy-950">Equipment & photos</h2>
        <div className="mt-4 flex aspect-video max-w-2xl items-center justify-center rounded-lg border border-dashed border-line-200 bg-fog-100 text-sm text-slate-600">
          TODO: replace with real equipment and job photos
        </div>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          We don&apos;t use stock or scraped images. Photos here will be real equipment and real job
          sites once available.
        </p>
      </Section>

      <Section tone="fog">
        <h2 className="font-heading text-2xl font-bold text-navy-950">What customers say</h2>
        <div className="mt-4 max-w-2xl rounded-lg border border-dashed border-line-200 bg-white p-6 text-sm text-slate-600">
          TODO: add real customer reviews once available. We don&apos;t publish placeholder or
          fabricated testimonials.
        </div>
      </Section>

      <Section tone="white">
        <CtaBand heading="Get a free estimate" subheading={business.responseTimePromise} />
      </Section>
    </>
  );
}
