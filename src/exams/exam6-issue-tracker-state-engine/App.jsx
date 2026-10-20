import { ACTION_TYPES, INITIAL_STATE, reducer } from './state/reducer.js';
import { selectCounts, selectVisibleIssues } from './state/selectors.js';
import { usePersistentReducer } from './state/usePersistentReducer.js';
import { CODE, PANEL } from './ui.js';

import AddIssueForm from './components/AddIssueForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import IssueList from './components/IssueList.jsx';
import DebugConsole from './components/DebugConsole.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import DebugNotes from './components/DebugNotes.jsx';

/**
 * Exam 6 — Issue Tracker State Engine
 * Primary hooks: useReducer, custom Hooks
 *
 * COMPONENT STRUCTURE
 *   App              -> state owner: usePersistentReducer + every dispatch
 *     AddIssueForm   -> owns only the transient draft text (leaf useState)
 *     FilterBar      -> presentational: All / Open / Done + Clear completed
 *     IssueList      -> presentational: the rows
 *     DebugConsole   -> sends malformed / unknown actions to prove resilience
 *     DebugNotes     -> static explanation
 *
 * Every domain transition goes through the pure reducer; persistence is
 * extracted into `usePersistentReducer`. This component holds NO useState at
 * all — the only useState in the app is the input draft inside AddIssueForm,
 * which is transient UI state rather than tracked domain state.
 */

const STORAGE_KEY = 'exam6.issueTracker.v1';

const EMPTY_MESSAGE = {
  all: 'No issues yet. Add the first one above.',
  open: 'Nothing open — nice work.',
  done: 'No completed issues yet.',
};

export default function App() {
  const [state, dispatch] = usePersistentReducer(reducer, INITIAL_STATE, STORAGE_KEY);

  const visibleIssues = selectVisibleIssues(state);
  const counts = selectCounts(state);

  function handleResetStorage() {
    window.localStorage.removeItem(STORAGE_KEY);
    console.log('[persist] cleared saved state — reloading');
    window.location.reload();
  }

  return (
    <main className="mx-auto grid w-full max-w-3xl gap-5 px-4 py-6 sm:px-6">
      <PageHeader
        icon="🐞"
        title="Issue Tracker"
        subtitle="Pure reducer transitions, saved in localStorage"
        cover="from-sky-100 via-violet-50 to-rose-100"
        tags={[
          { label: 'Exam 6', tone: 'bg-sky-100 text-sky-800' },
          { label: 'useReducer', tone: 'bg-violet-100 text-violet-800' },
          { label: 'custom hook', tone: 'bg-rose-100 text-rose-700' },
        ]}
      />

      <section className={PANEL}>
        <AddIssueForm
          // The reducer reads `action.payload.title`, so the payload object is
          // part of the contract. Sending `title` at the top level is case 16.
          onAdd={(title) => dispatch({ type: ACTION_TYPES.ADD_ISSUE, payload: { title } })}
        />

        <div className="mt-5 border-t border-stone-200/80 pt-5 dark:border-stone-800">
          <FilterBar
            filter={state.filter}
            counts={counts}
            onFilter={(filter) => dispatch({ type: ACTION_TYPES.SET_FILTER, payload: { filter } })}
            onClearDone={() => dispatch({ type: ACTION_TYPES.CLEAR_DONE })}
          />
        </div>

        <div className="mt-4">
          <IssueList
            issues={visibleIssues}
            onToggle={(id) => dispatch({ type: ACTION_TYPES.TOGGLE_ISSUE, payload: { id } })}
            onDelete={(id) => dispatch({ type: ACTION_TYPES.DELETE_ISSUE, payload: { id } })}
            emptyMessage={EMPTY_MESSAGE[state.filter]}
          />
        </div>

        <p className="mt-4 text-xs text-stone-500 dark:text-stone-400" data-testid="summary">
          {counts.all} total · {counts.open} open · {counts.done} done · next id #{state.nextId}
        </p>
      </section>

      <DebugConsole
        state={state}
        onMalformed={() => dispatch({ type: ACTION_TYPES.ADD_ISSUE, title: 'Mismatched shape' })}
        onUnknownAction={() => dispatch({ type: 'SOME_UNKNOWN_ACTION' })}
        onResetStorage={handleResetStorage}
      />

      <DebugNotes />
    </main>
  );
}
