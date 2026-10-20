import { useRef, useState } from 'react';
import { PANEL } from '../ui.js';

/**
 * DEBUGGING CASE 18 — ref vs state, demonstrated live.
 *
 * The starter code rendered `clicks.current` directly. A ref lives in a mutable
 * box that survives renders, but writing to `ref.current` does NOT schedule a
 * re-render, so React never re-evaluated the JSX and the screen never changed.
 *
 * Anything that must appear on screen belongs in state. The ref stays here only
 * to hold a value we read on demand inside handlers (and to prove it was
 * changing silently all along).
 */
export default function RefVsStateDemo() {
  const [stateClicks, setStateClicks] = useState(0);
  const [revealedRefValue, setRevealedRefValue] = useState(null);

  const silentClicksRef = useRef(0);

  function handleStateClick() {
    // Goes through state -> React schedules a re-render -> UI updates.
    setStateClicks((c) => c + 1);
  }

  function handleRefClick() {
    // Mutates the ref -> no re-render -> nothing on screen changes.
    silentClicksRef.current += 1;
    console.log('[RefVsStateDemo] ref.current is now', silentClicksRef.current, '(no render)');
  }

  function revealRefValue() {
    // Reading a ref inside an event handler is fine; we push it into STATE so
    // the revealed number can be displayed.
    setRevealedRefValue(silentClicksRef.current);
  }

  return (
    <section className={PANEL}>
      <h2 className="text-base font-semibold">🧪 Debugging case — a ref cannot drive the UI</h2>
      <p className="mt-1 text-sm text-stone-500">
        Click both buttons the same number of times. The state counter updates on screen; the ref
        counter only writes to the console. &quot;Reveal&quot; reads the ref in a handler and pushes
        it into state so you can prove it was incrementing the whole time.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-violet-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">useState</p>
          <p className="mt-1 text-3xl font-bold tabular-nums" data-testid="state-clicks">
            {stateClicks}
          </p>
          <button
            type="button"
            onClick={handleStateClick}
            className="mt-3 w-full rounded-xl bg-violet-200 px-4 py-2 text-sm font-semibold text-violet-900 transition hover:bg-violet-300"
          >
            +1 state click
          </button>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            useRef (rendered value)
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-stone-400" data-testid="ref-clicks">
            {revealedRefValue === null ? '—' : revealedRefValue}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleRefClick}
              className="flex-1 rounded-xl bg-amber-200 px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-300"
            >
              +1 ref click
            </button>
            <button
              type="button"
              onClick={revealRefValue}
              className="flex-1 rounded-xl border border-stone-200/80 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-[#f5f5f5]"
            >
              Reveal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
