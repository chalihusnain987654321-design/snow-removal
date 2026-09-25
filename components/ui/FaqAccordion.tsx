import { ChevronDownIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";

export type Faq = { question: string; answer: string };

// details/summary — zero client JS, matches the brief's "ship almost
// zero JS" requirement for location and service pages. FAQPage JSON-LD
// is built from the same `items` array rendered below, so the
// structured data always matches the visible text exactly.
export function FaqAccordion({ items }: { items: Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="divide-y divide-line-200 rounded-lg border border-line-200 bg-white">
      <JsonLd data={schema} />
      {items.map((item) => (
        <details key={item.question} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-950 marker:content-none">
            {item.question}
            <ChevronDownIcon className="size-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
