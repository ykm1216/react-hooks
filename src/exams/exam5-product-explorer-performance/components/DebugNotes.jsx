import { CODE, HEADING, PRE, PROSE, SUBHEADING } from '../ui.js';

/** Static explanation of the required debugging cases (no props, no state). */
export default function DebugNotes() {
  return (
    <section className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-5 dark:border-stone-800 dark:bg-stone-900">
      <h2 className={HEADING}>💡 Debug notes</h2>

      <h3 className={SUBHEADING}>Case 12 — missing `query` dependency in `useMemo`</h3>
      <p className={PROSE}>
        With deps <code className={CODE}>[category, sortOrder]</code>, typing into the search box
        left the array &quot;equal&quot; from React&apos;s point of view, so the cached list was
        returned unchanged: stale results that only refreshed when you also touched the category or
        sort control. The dependency array must list{' '}
        <strong>every reactive value the calculation reads</strong>. <code>query</code>,{' '}
        <code>category</code> and <code>sortOrder</code> are all inputs, so all three are listed.
      </p>

      <h3 className={SUBHEADING}>Case 13 — missing `selectedId` dependency in `useCallback`</h3>
      <p className={PROSE}>
        The handler compares against <code>selectedId</code>, so with an empty dependency array the
        closure kept the very first value (<code>null</code>) forever and clicking the same card
        twice never de-selected it. Adding <code>selectedId</code> keeps the handler correct — and
        because the identity only changes when the selection changes, <code>ProductList</code> still
        skips re-rendering for the unrelated counter.
      </p>

      <h3 className={SUBHEADING}>Case 14 — analytics moved out of `useMemo` into `useEffect`</h3>
      <pre className={PRE}>
        {`// BROKEN: a side effect inside a pure calculation
const visible = useMemo(() => {
  trackSearch(query, category);         // runs on every recalculation,
  return computeVisibleProducts(...);   // twice in StrictMode dev
}, [query, category]);

// FIXED: calculation stays pure, reporting moves to an effect
const visible = useMemo(
  () => computeVisibleProducts(PRODUCTS, query, category, sortOrder),
  [query, category, sortOrder]
);
useEffect(() => {
  trackSearch(query, category);
}, [query, category]);`}
      </pre>
      <p className={PROSE}>
        <code>useMemo</code> is a cache, not a lifecycle: React is free to drop or recompute the
        cached value, and it must not be relied on for things that happen to the outside world.
        Effects are the designated place for synchronisation and telemetry.
      </p>

      <h3 className={SUBHEADING}>Where memoization is UNNECESSARY</h3>
      <p className={PROSE}>
        <code>ProductCard</code> is intentionally <strong>not</strong> wrapped in{' '}
        <code>React.memo</code>. The list around it is already memoized, so a card only renders when
        the list renders; adding a second memo layer would run a prop comparison for each of the
        up-to-600 rows on every list render without changing the result. Likewise{' '}
        <code>{'{products.length} products'}</code> needs no memo — reading an array&apos;s length is
        O(1) and cannot be made meaningfully faster. Memoization earns its place when the work is
        expensive (here, 600 × 2000 trigonometric iterations) or when the{' '}
        <em>identity</em> of the result matters (the array identity keeps this list&apos;s memo
        effective).
      </p>
    </section>
  );
}
