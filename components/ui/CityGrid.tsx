import Link from "next/link";
import type { City } from "@/data/types";

export function CityGrid({ stateSlug, cities }: { stateSlug: string; cities: City[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
      {cities.map((city) => (
        <li key={city.slug}>
          <Link
            href={`/locations/${stateSlug}/${city.slug}/`}
            className="text-navy-800 hover:text-accent-700 hover:underline"
          >
            {city.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
