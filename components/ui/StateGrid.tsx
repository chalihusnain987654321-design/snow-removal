import Link from "next/link";
import type { State } from "@/data/types";

export function StateGrid({ states }: { states: State[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {states.map((state) => (
        <Link
          key={state.slug}
          href={`/locations/${state.slug}/`}
          className="rounded-md border border-line-200 bg-white px-4 py-3 text-center font-medium text-navy-900 transition-colors hover:border-navy-700 hover:bg-fog-100"
        >
          {state.name}
        </Link>
      ))}
    </div>
  );
}
