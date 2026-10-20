import { PANEL } from '../ui.js';

/**
 * Shows the evidence for the performance work: how many products are visible,
 * how long the last memoized recalculation took, and what is selected.
 */
export default function ResultSummary({ shown, total, computeMs, selectedName }) {
  return (
    <section className={`${PANEL} grid gap-3 bg-emerald-50/50`}>
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="font-semibold" data-testid="result-count">
          {shown} of {total} products
        </span>
        <span className="text-stone-500 dark:text-stone-400">
          last recompute:{' '}
          <span className="font-semibold tabular-nums" data-testid="compute-ms">
            {computeMs.toFixed(1)}ms
          </span>
        </span>
      </div>

      <p className="text-sm text-stone-500 dark:text-stone-400" data-testid="selected-label">
        Selected:{' '}
        <span className="font-semibold text-stone-700 dark:text-stone-200">
          {selectedName ?? 'none'}
        </span>
      </p>

      <p className="text-xs text-stone-400">
        Click the unrelated counter: this value must stay frozen, and the console must not print a
        new <code>[render] ProductList</code> line.
      </p>
    </section>
  );
}
