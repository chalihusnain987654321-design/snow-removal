import type { Metadata } from "next";
import { business } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${business.name}.`,
  alternates: { canonical: "/terms/" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <Section tone="white" className="pb-16 pt-8 sm:pt-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <h1 className="mt-4 font-heading text-4xl font-extrabold text-navy-950">Terms of Service</h1>

      <div className="mt-4 max-w-3xl rounded-lg border border-dashed border-accent-600 bg-white p-4 text-sm text-slate-700">
        <strong>Template: not legal advice.</strong> This is a generic starting point. Have an
        attorney review it and draft real service contract terms (cancellation, liability,
        trigger-depth definitions, storm-event definitions) before publishing or using it to
        govern actual service agreements.
      </div>

      <div className="prose prose-slate mt-8 max-w-3xl space-y-6 text-slate-700">
        <p>Last updated: {"{{LAST_UPDATED_DATE}}"}</p>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">Use of this website</h2>
          <p className="mt-2">
            This website provides information about {business.name}&apos;s services and allows you to
            request a quote. Submitting a quote request does not create a service agreement; an
            agreement is formed when both parties confirm service terms separately.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">Estimates</h2>
          <p className="mt-2">
            Any estimate provided is for informational purposes only and is not a binding quote.
            Final cost is confirmed before service begins.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">Service agreements</h2>
          <p className="mt-2">
            Actual service terms (including trigger depth, response times, contract length,
            cancellation, and liability) are governed by a separate service agreement, not by
            this website.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">Limitation of liability</h2>
          <p className="mt-2">
            {"{{LIABILITY_TERMS}}"} (to be drafted with an attorney and matched to your actual
            insurance coverage and service agreements).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${business.email}`} className="text-accent-700 underline hover:text-accent-600">
              {business.email}
            </a>
            .
          </p>
        </section>
      </div>
    </Section>
  );
}
