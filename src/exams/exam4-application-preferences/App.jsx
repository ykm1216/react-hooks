import { PreferencesProvider } from './context/PreferencesContext.jsx';
import Dashboard from './components/Dashboard.jsx';
import PreferencesPanel from './components/PreferencesPanel.jsx';
import ArticlePreview from './components/ArticlePreview.jsx';
import ProviderDebugDemo from './components/ProviderDebugDemo.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import { CODE } from './ui.js';

/**
 * Exam 4 — Application Preferences
 * Primary hooks: useContext, useState
 *
 * Required tree:
 *   App
 *     PreferencesProvider
 *       Dashboard
 *         Toolbar
 *       PreferencesPanel
 *       ArticlePreview
 *
 * ProviderDebugDemo is rendered as a SIBLING of the provider on purpose: it is
 * the live reproduction for debugging case 9.
 */
export default function App() {
  return (
    <main className="mx-auto grid w-full max-w-3xl gap-5 px-4 py-6 sm:px-6">
      <PageHeader
        icon="🎨"
        title="Application Preferences"
        subtitle="One provider, zero prop drilling"
        cover="from-amber-100 via-rose-50 to-violet-100"
        tags={[
          { label: 'Exam 4', tone: 'bg-violet-100 text-violet-800' },
          { label: 'useContext', tone: 'bg-amber-100 text-amber-800' },
          { label: 'useState', tone: 'bg-sky-100 text-sky-800' },
        ]}
      />

      <PreferencesProvider>
        <Dashboard />
        <PreferencesPanel />
        <ArticlePreview />
      </PreferencesProvider>

      <ProviderDebugDemo />

      <section className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-5 dark:border-stone-800 dark:bg-stone-900">
        <h2 className="text-base font-semibold">💡 Debug notes</h2>

        <h3 className="mt-4 text-sm font-semibold text-violet-700 dark:text-violet-300">
          Case 9 — consumer stuck on the default value
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
          <code className={CODE}>useContext(X)</code> walks up the tree looking for the nearest
          <code className={CODE}>&lt;X.Provider&gt;</code>. If it finds none, it returns the value
          passed to <code className={CODE}>createContext(defaultValue)</code> — here{' '}
          <code className={CODE}>null</code>. The component still renders; it simply never sees the
          app&apos;s data. The fix is to make the provider an ancestor of every consumer. The demo
          above shows the raw hook returning <code className={CODE}>null</code> and the guarded hook
          throwing instead.
        </p>

        <h3 className="mt-5 text-sm font-semibold text-violet-700 dark:text-violet-300">
          Case 10 — two separately created context objects
        </h3>
        <pre className="mt-2 overflow-x-auto rounded-xl border border-stone-200 bg-[#f5f5f5] p-4 font-mono text-[12.5px] leading-relaxed text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
          {`// BROKEN: two different objects, so the provider and the consumer
// are talking past each other. The consumer sees the default value.
// ThemeContext.js
export const ThemeContext = createContext(null);
// Consumer.jsx
import { ThemeContext } from './theme/ThemeContext';  // <- a SECOND module
                                                       //    that also calls
                                                       //    createContext(null)

// FIXED: ONE module owns the context, everyone imports that same export
// context/PreferencesContext.jsx
export const PreferencesContext = createContext(null);
// every component:
import { PreferencesContext } from '../context/PreferencesContext.jsx';`}
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
          Context matching is done by <strong>object identity</strong> (<code className={CODE}>===</code>),
          not by name. Two calls to <code className={CODE}>createContext(null)</code> — even with the
          same default in files that look alike — produce two unrelated channels. The provider fills
          one channel and the consumer listens to the other, so it reads the default. Deleting the
          duplicate module and importing the single exported object fixes it. In this project the
          whole team imports <code className={CODE}>PreferencesContext</code> from{' '}
          <code className={CODE}>src/context/PreferencesContext.jsx</code>.
        </p>
      </section>
    </main>
  );
}
