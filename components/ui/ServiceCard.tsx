import Link from "next/link";
import { ServiceIconGlyph } from "@/components/icons";
import type { Service } from "@/data/types";

export function ServiceCard({ service }: { service: Pick<Service, "slug" | "name" | "shortDescription" | "icon"> }) {
  return (
    <Link
      href={`/services/${service.slug}/`}
      className="group flex flex-col gap-3 rounded-lg border border-line-200 bg-white p-6 transition-colors hover:border-navy-700"
    >
      <span className="flex size-10 items-center justify-center rounded-md bg-navy-950 text-white">
        <ServiceIconGlyph icon={service.icon} className="size-5" />
      </span>
      <span className="font-heading text-lg font-semibold text-navy-950 group-hover:underline">
        {service.name}
      </span>
      <span className="text-sm text-slate-600">{service.shortDescription}</span>
    </Link>
  );
}
