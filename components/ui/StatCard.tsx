export function StatCard({ label, value }: { label: string; value: string | null }) {
  if (value === null) return null;
  return (
    <div className="rounded-lg border border-line-200 bg-white p-4 text-center">
      <div className="font-heading text-2xl font-bold text-navy-950">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-slate-600">{label}</div>
    </div>
  );
}
