import { CATEGORIES } from '../products.js';
import { SORT_OPTIONS } from '../productEngine.js';
import { FIELD, LABEL, PANEL } from '../ui.js';

/**
 * All five parent inputs in one place. Presentational: it reports changes and
 * the parent decides what state to set.
 */
export default function ExplorerControls({
  query,
  category,
  sortOrder,
  counter,
  onQueryChange,
  onCategoryChange,
  onSortChange,
  onCounterClick,
}) {
  return (
    <section className={`${PANEL} grid gap-4 sm:grid-cols-3`}>
      <label className={`${LABEL} sm:col-span-3`}>
        <span>Search</span>
        <input
          type="search"
          value={query}
          autoComplete="off"
          placeholder="name or category, e.g. keyboard"
          onChange={(event) => onQueryChange(event.target.value)}
          className={FIELD}
          data-testid="query"
        />
      </label>

      <label className={LABEL}>
        <span>Category</span>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className={FIELD}
          data-testid="category"
        >
          {CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className={LABEL}>
        <span>Sort</span>
        <select
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
          className={FIELD}
          data-testid="sort"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-1.5">
        <span className="text-sm font-semibold text-stone-600 dark:text-stone-300">
          Unrelated counter
        </span>
        <button
          type="button"
          onClick={onCounterClick}
          className="rounded-xl bg-emerald-200 px-4 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-300 active:scale-[0.98] dark:bg-emerald-300/25 dark:text-emerald-100"
          data-testid="counter"
        >
          Re-render parent · {counter}
        </button>
      </div>
    </section>
  );
}
