import { useEffect, useState } from 'react';

import { CODE, HEADING, PANEL, PANEL_PLACEHOLDER } from './ui.js';
import SessionWidget from './components/SessionWidget.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import DebugNotes from './components/DebugNotes.jsx';

/**
 * Exam 2 — Live Search and Timer
 * Primary hooks: useEffect, useState
 *
 * COMPONENT STRUCTURE
 *   App             -> owns the mount/unmount toggle + document title cleanup
 *     SessionWidget -> groups the two feature components for mounting as a unit
 *       SessionTimer -> owns `seconds` + the interval effect and its cleanup
 *       SearchPanel  -> owns `query`/`results` + debounce and title effects
 *         UserList   -> presentational list
 *     DebugNotes    -> static explanation of the debugging cases
 *
 * Each effect lives in the component that owns the state it reads, so every
 * dependency array is provably complete and every cleanup sits next to the code
 * that needs it.
 */
export default function App() {
  const [mounted, setMounted] = useState(true);

  // Reset any title left over if the demo user unmounts the widget.
  useEffect(() => {
    if (!mounted) document.title = 'Live Search and Timer';
  }, [mounted]);

  return (
    <main className="mx-auto grid w-full max-w-3xl gap-5 px-4 py-6 sm:px-6">
      <PageHeader
        icon="🔎"
        title="Live Search & Session Timer"
        subtitle="Debounce, cleanup and a derived document title"
        cover="from-sky-100 via-teal-50 to-amber-100"
        tags={[
          { label: 'Exam 2', tone: 'bg-teal-100 text-teal-800' },
          { label: 'useEffect', tone: 'bg-sky-100 text-sky-800' },
          { label: 'useState', tone: 'bg-rose-100 text-rose-700' },
        ]}
      />

      <div className="flex flex-wrap items-center gap-3.5 rounded-2xl bg-teal-50/70 p-4">
        <button
          type="button"
          onClick={() => setMounted((m) => !m)}
          className="rounded-xl bg-teal-200 px-4 py-2.5 text-sm font-semibold text-teal-900 transition hover:bg-teal-300 active:scale-[0.98]"
          data-testid="toggle-mount"
        >
          {mounted ? 'Unmount widget' : 'Mount widget'}
        </button>
        <span className="min-w-[220px] flex-1 text-sm text-stone-500">
          Unmount → the timer resets to 00:00 on re-mount and no duplicate interval survives. Watch
          the console for the mount/unmount cleanup logs.
        </span>
      </div>

      {mounted ? (
        <section className={PANEL}>
          <SessionWidget />
        </section>
      ) : (
        <section className={PANEL_PLACEHOLDER}>
          Widget unmounted. The timer and search effects have both been cleaned up.
        </section>
      )}

      <DebugNotes />

      <section className={PANEL}>
        <h2 className={HEADING}>Component map</h2>
        <ul className="mt-3 grid gap-1.5 text-sm text-stone-600">
          <li>
            <code className={CODE}>components/SessionTimer.jsx</code> — `seconds`, interval effect +
            `clearInterval`
          </li>
          <li>
            <code className={CODE}>components/SearchPanel.jsx</code> — `query`/`results`, debounce
            effect + `clearTimeout`, document-title effect
          </li>
          <li>
            <code className={CODE}>components/UserList.jsx</code> — presentational list
          </li>
          <li>
            <code className={CODE}>components/SessionWidget.jsx</code> — composes the two so they
            unmount together
          </li>
          <li>
            <code className={CODE}>lib/search.js</code> — `searchUsers` + delay;{' '}
            <code className={CODE}>lib/format.js</code> — clock formatting
          </li>
        </ul>
      </section>
    </main>
  );
}
