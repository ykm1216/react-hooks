import { useState } from 'react';

import Exam1 from './exams/exam1-smart-task-counter/App.jsx';
import Exam2 from './exams/exam2-live-search-and-timer/App.jsx';
import Exam3 from './exams/exam3-accessible-form-toolkit/App.jsx';
import Exam4 from './exams/exam4-application-preferences/App.jsx';
import Exam5 from './exams/exam5-product-explorer-performance/App.jsx';
import Exam6 from './exams/exam6-issue-tracker-state-engine/App.jsx';

/**
 * Host shell for the six practical exams. Only the active exam is mounted, so
 * switching tabs unmounts the previous one and cleans up its effects.
 */
const EXAMS = [
  { id: 1, label: 'Task Counter', hook: 'useState', Component: Exam1 },
  { id: 2, label: 'Live Search', hook: 'useEffect', Component: Exam2 },
  { id: 3, label: 'Form Toolkit', hook: 'useRef', Component: Exam3 },
  { id: 4, label: 'Preferences', hook: 'useContext', Component: Exam4 },
  { id: 5, label: 'Product Explorer', hook: 'useMemo / useCallback', Component: Exam5 },
  { id: 6, label: 'Issue Tracker', hook: 'useReducer', Component: Exam6 },
];

export default function App() {
  const [activeId, setActiveId] = useState(1);
  const current = EXAMS.find((exam) => exam.id === activeId);
  const { Component } = current;

  return (
    <div className="min-h-screen bg-white text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <header className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
              RH
            </span>
            <span>React Hooks Practical</span>
          </a>
          <span className="hidden text-sm text-stone-500 sm:block dark:text-stone-400">
            6 interactive labs
          </span>
        </div>
      </header>

      <main>
        <section className="border-b border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-900/50">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
              Learn by doing
            </p>
            <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Build confidence with React hooks.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-300">
              Explore six hands-on practicals. Choose a topic to start, experiment freely, and see
              each hook in action.
            </p>

            <nav
              className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              role="tablist"
              aria-label="Practical exams"
            >
              {EXAMS.map((exam) => {
                const isActive = exam.id === activeId;
                return (
                  <button
                    key={exam.id}
                    id={`exam-tab-${exam.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="exam-panel"
                    onClick={() => setActiveId(exam.id)}
                    className={`rounded-2xl border p-4 text-left transition active:scale-[0.99] ${
                      isActive
                        ? 'border-black bg-black text-white shadow-sm dark:border-white dark:bg-white dark:text-black'
                        : 'border-stone-200 bg-white text-stone-900 hover:border-stone-300 hover:shadow-sm dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:hover:border-stone-500'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold">
                        {exam.id}. {exam.label}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          isActive
                            ? 'bg-white/15 text-white dark:bg-black/10 dark:text-black'
                            : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300'
                        }`}
                      >
                        {exam.hook}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </section>

        <div
          key={activeId}
          id="exam-panel"
          role="tabpanel"
          aria-labelledby={`exam-tab-${activeId}`}
        >
          <Component />
        </div>
      </main>
    </div>
  );
}
