import type { Metadata } from "next";
import { business } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Request Not Sent",
  robots: { index: false },
};

export default function QuoteErrorPage() {
  return (
    <Section tone="white" className="py-20 text-center">
      <h1 className="font-heading text-3xl font-extrabold text-navy-950 sm:text-4xl">
        We couldn&apos;t send your request.
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-lg text-slate-600">
        Double-check your name, phone number, and address, then try again, or call us directly
        and we&apos;ll take it down over the phone.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href={`tel:${business.phoneHref}`} variant="primary">
          <PhoneIcon className="size-4" />
          Call {business.phone}
        </Button>
        <Button href="/free-estimate/" variant="secondary">
          Try again
        </Button>
      </div>
    </Section>
  );
}
