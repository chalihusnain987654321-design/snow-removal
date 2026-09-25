import type { Metadata } from "next";
import { business } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { TrustBar } from "@/components/ui/TrustBar";
import { PhoneIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Free Estimate",
  description: "Request a free snow removal estimate for your driveway, parking lot, or property.",
  alternates: { canonical: "/free-estimate/" },
};

export default function FreeEstimatePage() {
  return (
    <Section tone="navy" className="py-14 sm:py-20">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
            Get a free snow removal estimate.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-300">
            Tell us about your property and we&apos;ll follow up with a quote, no obligation. Prefer
            to talk it through first?
          </p>
          <div className="mt-6">
            <Button href={`tel:${business.phoneHref}`} variant="primary">
              <PhoneIcon className="size-4" />
              Call {business.phone}
            </Button>
          </div>
          <div className="mt-10">
            <TrustBar tone="dark" align="start" />
          </div>
        </div>
        <QuoteForm />
      </div>
    </Section>
  );
}
