// Leads are sold to a third-party buyer (leadsmartinc) through their
// embedded funnel rather than captured by us — this used to be a native
// <form> posting to /api/quote/, which is why the container/spacing below
// still matches that card so every existing placement keeps its layout.
// That endpoint (and lib/email, lib/rate-limit, /quote-error, /thank-you)
// is left in place but nothing posts to it anymore.
export function QuoteForm({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-lg border border-line-200 bg-white ${compact ? "p-4" : "p-4 sm:p-6"}`}>
      <iframe
        src="https://leads.leadsmartinc.com/?api_key=d1ee9657b8b70d031e797221e28d43b58e732b92&affiliate_source=alihsnn1&funnel=4&category=14&step=1&buttons=btn-success"
        title="Get a free snow removal estimate"
        width={600}
        height={545}
        style={{ width: "100%", maxWidth: 600, height: 545, border: 0, display: "block" }}
        className="mx-auto"
      />
    </div>
  );
}
