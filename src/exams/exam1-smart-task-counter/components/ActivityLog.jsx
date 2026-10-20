import { PANEL_MUTED } from '../ui.js';

/** Visible per-click evidence for the manual validation cases. */
export default function ActivityLog({ entries }) {
  return (
    <section className={PANEL_MUTED}>
      <h2 className="mb-3 text-base font-semibold">📋 Activity log</h2>
      {entries.length === 0 ? (
        <p className="text-sm text-stone-500">No interactions yet.</p>
      ) : (
        <ol className="grid list-decimal gap-1 pl-5 text-sm text-stone-600">
          {entries.map((entry) => (
            <li key={entry.id}>{entry.message}</li>
          ))}
        </ol>
      )}
    </section>
  );
}
