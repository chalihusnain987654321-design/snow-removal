import { CheckIcon } from "@/components/icons";
import { business } from "@/config/business";

const items = [
  "Licensed & insured",
  "24/7 storm dispatch",
  "Commercial-grade equipment",
  business.responseTimePromise,
];

export function TrustBar({
  tone = "light",
  align = "center",
}: {
  tone?: "light" | "dark";
  align?: "center" | "start";
}) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium ${
        align === "start" ? "justify-start" : "justify-center"
      } ${tone === "dark" ? "text-white" : "text-navy-900"}`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <CheckIcon className="size-4 text-accent-600" />
          {item}
        </li>
      ))}
    </ul>
  );
}
