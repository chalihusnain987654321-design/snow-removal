import { business } from "@/config/business";
import { Button } from "./Button";
import { PhoneIcon } from "@/components/icons";

export function CtaBand({
  heading,
  subheading,
}: {
  heading: string;
  subheading?: string;
}) {
  return (
    <div className="rounded-xl bg-navy-950 px-6 py-10 text-center text-white sm:px-12">
      <h2 className="font-heading text-2xl font-bold sm:text-3xl">{heading}</h2>
      {subheading && <p className="mx-auto mt-3 max-w-2xl text-slate-300">{subheading}</p>}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button href={`tel:${business.phoneHref}`} variant="primary">
          <PhoneIcon className="size-4" />
          Call {business.phone}
        </Button>
        <Button href="/free-estimate/" variant="outline">
          Get a free estimate
        </Button>
      </div>
    </div>
  );
}
