import type { Metadata } from "next";
import { business } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CheckIcon, PhoneIcon } from "@/components/icons";
import { ConversionEvent } from "@/components/analytics/ConversionEvent";

export const metadata: Metadata = {
  title: "Request Received",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <Section tone="white" className="py-20 text-center">
      <ConversionEvent event="quote_request_submitted" />
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent-600 text-white">
        <CheckIcon className="size-7" />
      </div>
      <h1 className="mt-6 font-heading text-3xl font-extrabold text-navy-950 sm:text-4xl">
        Thanks, we&apos;ve got your request.
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-lg text-slate-600">
        {business.responseTimePromise}. If it&apos;s urgent, call dispatch directly.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href={`tel:${business.phoneHref}`} variant="primary">
          <PhoneIcon className="size-4" />
          Call {business.phone}
        </Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </Section>
  );
}
