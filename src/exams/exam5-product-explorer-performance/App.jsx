import { useCallback, useEffect, useMemo, useState } from 'react';

import { CATEGORIES, PRODUCTS, PRODUCT_COUNT } from './products.js';
import { computeVisibleProducts } from './productEngine.js';
import { CODE } from './ui.js';

import ExplorerControls from './components/ExplorerControls.jsx';
import ResultSummary from './components/ResultSummary.jsx';
import ProductList from './components/ProductList.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import DebugNotes from './components/DebugNotes.jsx';

/**
 * Exam 5 — Product Explorer Performance Repair
 * Primary hooks: useMemo, useCallback
 *
 * COMPONENT STRUCTURE
 *   App               -> owns all state, the memoized calculation and the memoized callback
 *     ExplorerControls -> presentational: search / category / sort / counter
 *     ResultSummary    -> presentational: counts, timing, selection
 *     ProductList      -> React.memo'd, receives stable props
 *       ProductCard xN -> presentational row
 *     DebugNotes       -> static explanation
 *
 * The parent deliberately owns an UNRELATED counter. Clicking it re-renders App
 * (and would re-render the whole list if the memo/callback wiring were wrong),
 * but must leave ProductList untouched.
 */
export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('price-asc');
  const [selectedId, setSelectedId] = useState(null);
  const [counter, setCounter] = useState(0);

  /**
   * DEBUGGING CASE 12 — FIXED.
   *
   * The original dependency array was `[category, sortOrder]`. Typing in the
   * search box changed `query`, React skipped the memo (its deps looked equal),
   * and the list kept showing results for the previous query — stale data that
   * "fixes itself" only when you also change the category or the sort order.
   *
   * Fix: `query` is a genuine input to computeVisibleProducts, so it must be
   * listed. React compares the array with Object.is; a changed string always
   * invalidates the memo.
   */
  const visible = useMemo(() => {
    const started = performance.now();
    const { items, considered } = computeVisibleProducts(PRODUCTS, query, category, sortOrder);
    const ms = performance.now() - started;
    console.log(
      `%c[useMemo] recomputed ${items.length}/${considered} of ${PRODUCT_COUNT} products in ${ms.toFixed(1)}ms ` +
        `(query="${query}", category=${category}, sort=${sortOrder})`,
      'color:#525252'
    );
    return { items, computeMs: ms };
  }, [query, category, sortOrder]);

  /**
   * DEBUGGING CASE 13 — FIXED.
   *
   * The original callback toggled a selection using the *current* `selectedId`
   * but declared an empty dependency array:
   *
   *   const handleSelect = useCallback((id) => {
   *     setSelectedId(id === selectedId ? null : id);  // stale `selectedId`
   *   }, []);                                          // <- missing dependency
   *
   * With `[]`, the closure is frozen at the first render, where `selectedId` is
   * `null`. Clicking the same card twice therefore never de-selects it — the
   * handler always compares against `null`, so the first-ever value wins.
   *
   * Fix: add `selectedId`. The identity now changes only when the selection
   * changes, which is exactly when ProductList genuinely must re-render.
   */
  const handleSelect = useCallback(
    (id) => {
      setSelectedId(id === selectedId ? null : id);
    },
    [selectedId]
  );

  /**
   * DEBUGGING CASE 14 — FIXED.
   *
   * The analytics call used to sit inside the `useMemo` above. Two problems:
   * `useMemo` is a calculation cache, not an effect, so React may recalculate
   * (or discard) it for reasons unrelated to your intent — and in StrictMode it
   * runs twice in development, double-counting every event. A side effect
   * belongs in an effect, keyed to the values it reports on.
   */
  useEffect(() => {
    console.log(
      `%c[analytics] search tracked (query="${query}", category=${category})`,
      'color:#737373'
    );
  }, [query, category]);

  const selected = useMemo(
    () => visible.items.find((product) => product.id === selectedId) ?? null,
    [visible.items, selectedId]
  );

  return (
    <main className="mx-auto grid w-full max-w-3xl gap-5 px-4 py-6 sm:px-6">
      <PageHeader
        icon="🛍️"
        title="Product Explorer"
        subtitle={`${PRODUCT_COUNT} records · ${CATEGORIES.length - 1} categories · memoized filter & sort`}
        cover="from-emerald-100 via-sky-50 to-amber-100"
        tags={[
          { label: 'Exam 5', tone: 'bg-emerald-100 text-emerald-800' },
          { label: 'useMemo', tone: 'bg-sky-100 text-sky-800' },
          { label: 'useCallback', tone: 'bg-amber-100 text-amber-800' },
        ]}
      />

      <ExplorerControls
        query={query}
        category={category}
        sortOrder={sortOrder}
        counter={counter}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onSortChange={setSortOrder}
        onCounterClick={() => setCounter((c) => c + 1)}
      />

      <ResultSummary
        shown={visible.items.length}
        total={PRODUCT_COUNT}
        computeMs={visible.computeMs}
        selectedName={selected ? selected.name : null}
      />

      <ProductList products={visible.items} selectedId={selectedId} onSelect={handleSelect} />

      <DebugNotes />
    </main>
  );
}
