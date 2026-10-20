import { memo } from 'react';
import ProductCard from './ProductCard.jsx';

/**
 * Wrapped in React.memo. The memo is only effective if EVERY prop keeps a stable
 * identity across unrelated parent renders:
 *
 *   products   -> the useMemo'd array (new identity only when query/category/sort change)
 *   selectedId -> a primitive
 *   onSelect   -> the useCallback'd handler (new identity only when selectedId changes)
 *
 * If any one of those were recreated on every render, memo would bail out of its
 * optimisation and re-render the list anyway.
 */
function ProductList({ products, selectedId, onSelect }) {
  // Console evidence for the "unrelated counter" test: this line prints once
  // per real render of the list, and must NOT print when the counter changes.
  console.log(
    `%c[render] ProductList (${products.length} items, selected=${selectedId ?? 'none'})`,
    'color:#525252'
  );

  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-8 text-center text-sm text-stone-500 dark:border-stone-700">
        No products match the current filters.
      </p>
    );
  }

  return (
    <ul
      className="grid max-h-[420px] list-none gap-2 overflow-y-auto p-0 pr-1"
      data-testid="product-list"
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            selected={product.id === selectedId}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  );
}

export default memo(ProductList);
