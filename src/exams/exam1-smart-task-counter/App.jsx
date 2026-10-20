import { useState } from 'react';

import { deriveStatus } from './status.js';
import { CODE, PANEL } from './ui.js';

import Readout from './components/Readout.jsx';
import StatusBadge from './components/StatusBadge.jsx';
import CounterControls from './components/CounterControls.jsx';
import TargetControl from './components/TargetControl.jsx';
import ActivityLog from './components/ActivityLog.jsx';
import DebugNotes from './components/DebugNotes.jsx';
import PageHeader from '../../components/PageHeader.jsx';

/**
 * Exam 1 — Smart Task Counter
 * Primary hook: useState
 *
 * COMPONENT STRUCTURE
 *   App                 -> owns ALL state + handlers (the single source of truth)
 *     Readout           -> presentational: count / target
 *     StatusBadge       -> presentational: derived status string
 *     CounterControls   -> presentational: the four buttons
 *     TargetControl     -> presentational: target input + presets
 *     ActivityLog       -> presentational: recent actions
 *     DebugNotes        -> static explanation of the debugging case
 *
 * Only `App` holds state. The children receive values and callbacks as props and
 * hold no state of their own, which keeps the data flow one-directional and easy
 * to trace.
 *
 * Design decision (documented in README): the "plus two" control increases the
 * count by EXACTLY two, even if that overshoots the target. Capping at `target`
 * would turn a plus-two click into a plus-one click when count === target - 1,
 * which would violate the explicit "exactly two" requirement.
 */
export default function App() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(5);
  const [log, setLog] = useState([]);

  const status = deriveStatus(count, target);
  const targetReached = count >= target;

  function record(message) {
    // Functional update + a tiny bounded activity log (useState only).
    setLog((prev) => {
      const nextId = (prev[0]?.id ?? 0) + 1;
      return [{ id: nextId, message }, ...prev].slice(0, 6);
    });
  }

  /**
   * NOTE ON PURITY. Updater functions passed to a setter must be pure: React
   * intentionally calls them twice in StrictMode development to surface hidden
   * side effects. So `record(...)` is called OUTSIDE the updater, never inside
   * it -- otherwise every click would log twice in development.
   */

  // Decrement never lets the count go below zero.
  function handleDecrement() {
    const next = Math.max(count - 1, 0);
    setCount(next);
    record(`Decrement -> ${next}`);
  }

  function handleIncrement() {
    if (count >= target) return; // guard: never overshoot via the +1 control
    const next = count + 1;
    setCount(next);
    record(`Increment -> ${next}`);
  }

  function handleReset() {
    setCount(0);
    record('Reset -> 0');
  }

  /**
   * DEBUGGING CASE 1 — FIXED.
   *
   * Broken version:
   *   const addTwo = () => {
   *     setCount(count + 1);   // count === 4 => queue 5
   *     setCount(count + 1);   // count is STILL 4 => queue 5 again
   *   };
   * Both calls read the same `count` from the render's closure, so React ends up
   * with 5, not 6. `count` is a constant for the duration of this render: it was
   * captured when the component rendered and cannot change mid-handler.
   *
   * Fix: the functional updater form. Each updater receives the LATEST pending
   * state (not the captured value), so the two updates queue and compose:
   * 4 -> 5 -> 6.
   */
  function handleAddTwo() {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    // Logged outside the updaters (pure updaters) -- and `count + 2` is exact
    // because this handler issues exactly two increments in one batch.
    record(`Plus two -> ${count + 2} (two queued functional updates)`);
  }

  return (
    <main className="mx-auto grid w-full max-w-4xl gap-6 px-4 py-6 sm:px-6">
      <PageHeader
        icon="✅"
        title="Smart Task Counter"
        subtitle="Study session tracker · derived status, boundary-safe controls"
        cover="from-rose-100 via-amber-50 to-emerald-100"
        tags={[
          { label: 'Exam 1', tone: 'bg-violet-100 text-violet-800' },
          { label: 'useState', tone: 'bg-rose-100 text-rose-700' },
        ]}
      />

      <div className="grid items-start gap-5 md:grid-cols-[1.4fr_1fr]">
        <section className={PANEL}>
          <h2 className="mb-4 text-base font-semibold">🎯 Today&apos;s progress</h2>
          <Readout count={count} target={target} />
          <StatusBadge status={status} />
          <CounterControls
            targetReached={targetReached}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onAddTwo={handleAddTwo}
            onReset={handleReset}
          />
          <TargetControl target={target} onChange={setTarget} />
        </section>

        <ActivityLog entries={log} />
      </div>

      <DebugNotes />
    </main>
  );
}
