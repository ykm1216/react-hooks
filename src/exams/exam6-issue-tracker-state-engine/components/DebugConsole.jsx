import { BTN_GHOST, PANEL_MUTED } from '../ui.js';

/**
 * The case 16 / case 17 proving ground: two buttons that send deliberately bad
 * actions and one that clears persistence. Both bad actions must leave the
 * tracker untouched and must not crash.
 *
 * Presentational: it forwards intent upward and prints whatever state it is
 * given, so it never needs to know how actions are built.
 */
export default function DebugConsole({ state, onMalformed, onUnknownAction, onResetStorage }) {
  return (
    <section className={PANEL_MUTED}>
      <h2 className="text-base font-semibold">🧪 Debug console</h2>
      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        These buttons deliberately send bad input. Both must leave the tracker unchanged and must
        not crash — that is cases 16 and 17 working defensively.
      </p>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button type="button" onClick={onMalformed} data-testid="dispatch-malformed" className={BTN_GHOST}>
          Dispatch malformed ADD_ISSUE (top-level `title`)
        </button>
        <button type="button" onClick={onUnknownAction} data-testid="dispatch-unknown" className={BTN_GHOST}>
          Dispatch unknown action
        </button>
        <button
          type="button"
          onClick={onResetStorage}
          className="rounded-xl border border-rose-200 bg-rose-100/70 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
        >
          Clear saved state &amp; reload
        </button>
      </div>

      <p className="mt-4 overflow-x-auto rounded-xl border border-stone-200 bg-white p-4 font-mono text-[12.5px] leading-relaxed text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
        current state: {JSON.stringify(state)}
      </p>
    </section>
  );
}
