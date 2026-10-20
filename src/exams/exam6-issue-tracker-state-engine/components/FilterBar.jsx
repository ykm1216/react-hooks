import { FILTERS } from '../state/reducer.js';

const LABELS = { all: 'All', open: 'Open', done: 'Done' };

/**
 * Presentational only: it renders the counts it is given and reports clicks.
 * All state changes go back through App's `dispatch`.
 */
export default function FilterBar({ filter, counts, onFilter, onClearDone }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter issues">
        {FILTERS.map((option) => {
          const isActive = filter === option;
          return (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onFilter(option)}
              data-testid={`filter-${option}`}
              className={`rounded-xl border px-3.5 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'border-sky-200 bg-sky-200 text-sky-900 dark:border-sky-400/40 dark:bg-sky-300/25 dark:text-sky-100'
                  : 'border-stone-200/80 bg-white hover:bg-[#f5f5f5] dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700'
              }`}
            >
              {LABELS[option]}
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-xs tabular-nums ${
                  isActive ? 'bg-white/60 dark:bg-white/10' : 'bg-stone-100 dark:bg-stone-700'
                }`}
              >
                {counts[option]}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onClearDone}
        disabled={counts.done === 0}
        data-testid="clear-done"
        className="rounded-xl border border-rose-200 bg-rose-100/70 px-3.5 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
      >
        Clear completed ({counts.done})
      </button>
    </div>
  );
}
