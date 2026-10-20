import { CODE, PRE, PROSE } from '../ui.js';

/** Static explanation of the required debugging case (no props, no state). */
export default function DebugNotes() {
  return (
    <section className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-5">
      <h2 className="mb-3 text-base font-semibold">
        💡 Debug notes — why the original handler was broken
      </h2>
      <pre className={PRE}>
        {`const addTwo = () => {
  setCount(count + 1); // captured count = 4 -> queues 5
  setCount(count + 1); // SAME captured count = 4 -> queues 5
};`}
      </pre>
      <p className={PROSE}>
        Both calls read the <code className={CODE}>count</code> value captured by this render&apos;s
        closure, so the second call overwrites the first with the same number and the count only
        grows by one. React does not re-render between the two calls.
      </p>
      <p className={PROSE}>
        <strong>Fix:</strong> pass an updater instead of a value —
        <code className={`ml-1 ${CODE}`}>setCount(c =&gt; c + 1)</code> twice. Each updater receives
        the latest queued state, so the updates compose: 4 → 5 → 6.
      </p>
      <p className={PROSE}>
        <strong>Related purity note:</strong> the activity logging happens in the handler *around*
        the updaters, never inside them. React deliberately double-invokes updater functions in
        StrictMode development, so a side effect inside an updater would run twice per click.
      </p>
    </section>
  );
}
