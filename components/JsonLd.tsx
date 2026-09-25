// Renders a JSON-LD <script> tag. Safe to use with dangerouslySetInnerHTML
// here because every caller passes structured data built from our own
// typed config/data files — never raw user input.
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
