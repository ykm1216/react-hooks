import { CODE, HEADING, PRE, PROSE, SUBHEADING, SUBPROSE } from '../ui.js';

/** Static explanation of the required debugging cases (no props, no state). */
export default function DebugNotes() {
  return (
    <section className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-5">
      <h2 className={HEADING}>💡 Debug notes</h2>

      <h3 className={SUBHEADING}>Case 6 — effect that depends on the state it updates</h3>
      <pre className={PRE}>
        {`// BROKEN: reads and writes the same state -> runs forever
useEffect(() => {
  setSeconds(seconds + 1);
}, [seconds]);

// FIXED: run once per mount, advance with a functional updater
useEffect(() => {
  const id = setInterval(() => setSeconds((s) => s + 1), 1000);
  return () => clearInterval(id);
}, []);`}
      </pre>
      <p className={PROSE}>
        An effect re-runs whenever a value in its dependency array changes. If the effect writes that
        same value, the write schedules another render, which changes the dependency, which re-runs
        the effect — an unbounded loop. Keeping the timer effect&apos;s array empty and updating
        through <code className={CODE}>s =&gt; s + 1</code> removes the cycle.
      </p>

      <h3 className={SUBHEADING}>Case 7 — callback stuck at 00:01</h3>
      <p className={SUBPROSE}>
        <code className={CODE}>setInterval(() =&gt; setSeconds(seconds + 1), 1000)</code> captures{' '}
        <code className={CODE}>seconds</code> from the first render, so every tick writes{' '}
        <code className={CODE}>0 + 1</code>. The functional updater{' '}
        <code className={CODE}>(s) =&gt; s + 1</code> (or a <code className={CODE}>useRef</code>)
        always sees the latest value.
      </p>

      <h3 className={SUBHEADING}>Case 8 — the two cleanup functions</h3>
      <ul className="grid list-disc gap-2 pl-5 text-sm leading-relaxed text-stone-700">
        <li>
          <strong>clearTimeout</strong> cancels the pending simulated search request. React runs the
          previous effect&apos;s cleanup before the next one, so rapid typing schedules a timeout per
          keystroke and immediately cancels the previous one — only the final query can call{' '}
          <code className={CODE}>setResults</code>. Without it, an older, slower request could land
          last and show a stale result.
        </li>
        <li>
          <strong>clearInterval</strong> stops the one-second tick when the widget unmounts (and
          before StrictMode&apos;s development re-mount runs the effect again). Without it, the
          interval keeps firing after the component is gone, so the timer would keep counting and
          re-mounting would leave multiple intervals running at once.
        </li>
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-stone-700">
        Both cleanups run on two occasions: when the dependencies change (before the effect re-runs)
        and when the component unmounts. That single mechanism is what makes the search safe and the
        timer leak-free.
      </p>
    </section>
  );
}
