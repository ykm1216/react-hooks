const CARD =
  'flex w-full flex-col gap-2 rounded-xl border border-stone-200/70 bg-[#fafafa] p-3.5 text-left transition hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-stone-700 dark:bg-stone-800/60';

/**
 * A single row. Presentational: it reports the click upward with the product id
 * and never touches state itself.
 *
 * Deliberately NOT wrapped in React.memo. The list around it is already
 * memoized, so a row only renders when the list renders, and adding a second
 * memo layer would add prop-comparison cost for each of the up-to-600 rows
 * without changing the outcome.
 */
export default function ProductCard({ product, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(product.id)}
      aria-pressed={selected}
      data-testid={`product-${product.id}`}
      className={`${CARD} cursor-pointer ${
        selected ? 'border-emerald-300 bg-emerald-50 ring-2 ring-emerald-100 dark:ring-emerald-900' : ''
      }`}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="font-semibold">{product.name}</span>
        <span className="whitespace-nowrap font-semibold tabular-nums">
          ${product.price.toFixed(2)}
        </span>
      </span>
      <span className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
          {product.category}
        </span>
        <span>★ {product.rating.toFixed(1)}</span>
        <span>{product.inStock ? 'In stock' : 'Backordered'}</span>
        {selected && <span className="font-semibold text-emerald-700">· selected</span>}
      </span>
    </button>
  );
}
