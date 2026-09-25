import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${business.name} for a snow removal quote: phone, email, and a request form.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <Section tone="white" className="pb-16 pt-8 sm:pt-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <h1 className="mt-4 font-heading text-4xl font-extrabold text-navy-950">Contact us</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        Call for the fastest response during an active storm, or send a request below.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <a
            href={`tel:${business.phoneHref}`}
            className="flex items-center gap-3 rounded-lg border border-line-200 bg-white p-5 hover:border-navy-700"
          >
            <span className="flex size-10 items-center justify-center rounded-md bg-accent-600 text-white">
              <PhoneIcon className="size-5" />
            </span>
            <div>
              <div className="text-sm text-slate-500">Call dispatch</div>
              <div className="font-heading text-lg font-semibold text-navy-950">{business.phone}</div>
            </div>
          </a>

          <div className="rounded-lg border border-line-200 bg-white p-5">
            <div className="text-sm text-slate-500">Email</div>
            <a href={`mailto:${business.email}`} className="font-medium text-navy-950 hover:underline">
              {business.email}
            </a>
          </div>

          <div className="rounded-lg border border-line-200 bg-white p-5">
            <div className="text-sm text-slate-500">Hours</div>
            <div className="font-medium text-navy-950">{business.hours}</div>
          </div>

          {business.address ? (
            <div className="rounded-lg border border-line-200 bg-white p-5">
              <div className="text-sm text-slate-500">Address</div>
              <div className="font-medium text-navy-950">
                {business.address.street}, {business.address.city}, {business.address.state}{" "}
                {business.address.zip}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-line-200 bg-white p-5">
              <div className="text-sm text-slate-500">Service area</div>
              <div className="font-medium text-navy-950">
                We operate as a service-area business: see{" "}
                <Link href="/locations/" className="text-accent-700 underline hover:text-accent-600">
                  where we work
                </Link>
                .
              </div>
            </div>
          )}
        </div>

        <QuoteForm />
      </div>
    </Section>
  );
}
