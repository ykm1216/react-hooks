function ReadoutCell({ label, value, testId, tone }) {
  return (
    <div className={`flex flex-col gap-1.5 rounded-2xl p-4 ${tone}`}>
      <span className="text-xs font-medium uppercase tracking-widest text-stone-500">{label}</span>
      <span className="text-4xl font-bold tabular-nums" data-testid={testId}>
        {value}
      </span>
    </div>
  );
}

/** Shows the two pieces of state side by side. */
export default function Readout({ count, target }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <ReadoutCell label="Completed" value={count} testId="count" tone="bg-emerald-50" />
      <ReadoutCell label="Target" value={target} testId="target" tone="bg-amber-50" />
    </div>
  );
}
