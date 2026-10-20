/**
 * Exam 6 — Issue Tracker State Engine
 *
 * A PURE reducer. It must not mutate `state`, must not mutate any issue object,
 * and must not perform side effects (no logging of mutations, no storage, no
 * timers). Given the same state and action it always returns the same next
 * state, which is what makes it directly unit-testable without React.
 *
 * State shape (as required):
 *   { issues: [], filter: 'all', nextId: 1 }
 *
 * Issue shape: { id: number, title: string, done: boolean }
 */

export const INITIAL_STATE = {
  issues: [],
  filter: 'all',
  nextId: 1,
};

export const FILTERS = ['all', 'open', 'done'];

export const ACTION_TYPES = {
  ADD_ISSUE: 'ADD_ISSUE',
  TOGGLE_ISSUE: 'TOGGLE_ISSUE',
  DELETE_ISSUE: 'DELETE_ISSUE',
  SET_FILTER: 'SET_FILTER',
  CLEAR_DONE: 'CLEAR_DONE',
};

export function reducer(state, action) {
  switch (action.type) {
    /**
     * DEBUGGING CASE 16 — FIXED (shape mismatch).
     *
     * The reducer reads `action.payload.title`, while the caller used to
     * dispatch `{ type: 'ADD_ISSUE', title }`. The payload was therefore
     * `undefined`, `payload.title` threw (or produced a blank issue depending on
     * the guard), and nothing was ever added.
     *
     * The contract is now explicit and defensive: the reducer reads
     * `action.payload`, and every dispatch site sends `payload: { title }`.
     */
    case ACTION_TYPES.ADD_ISSUE: {
      const title = typeof action.payload?.title === 'string' ? action.payload.title.trim() : '';
      if (!title) return state; // reject blank titles without changing state

      const issue = { id: state.nextId, title, done: false };

      // DEBUGGING CASE 15 — FIXED (immutability).
      // `state.issues.push(issue)` would mutate the existing array, so React
      // could see the SAME reference and skip the re-render. A new array plus a
      // new object per change keeps every update observable and predictable.
      return {
        ...state,
        issues: [...state.issues, issue],
        nextId: state.nextId + 1,
      };
    }

    case ACTION_TYPES.TOGGLE_ISSUE: {
      const { id } = action.payload;
      const issues = state.issues.map((issue) =>
        // DEBUGGING CASE 15 — FIXED: spread into a NEW object instead of
        // `issue.done = !issue.done`, which mutated the existing issue.
        issue.id === id ? { ...issue, done: !issue.done } : issue
      );
      return { ...state, issues };
    }

    case ACTION_TYPES.DELETE_ISSUE: {
      const { id } = action.payload;
      const issues = state.issues.filter((issue) => issue.id !== id);
      if (issues.length === state.issues.length) return state; // nothing matched
      return { ...state, issues };
    }

    case ACTION_TYPES.SET_FILTER: {
      const { filter } = action.payload;
      if (!FILTERS.includes(filter)) return state;
      return { ...state, filter };
    }

    case ACTION_TYPES.CLEAR_DONE: {
      const issues = state.issues.filter((issue) => !issue.done);
      if (issues.length === state.issues.length) return state; // nothing to clear
      return { ...state, issues };
    }

    /**
     * DEBUGGING CASE 17 — FIXED.
     *
     * The original default branch returned `undefined` (a bare `return;`), so any
     * unrecognised action — a typo in a type string, a hot-reload leftover, a
     * new action not yet implemented — wiped the entire state and the next
     * render crashed on `state.issues.length`.
     *
     * Default must return the EXISTING state unchanged: same reference, so React
     * bails out of re-rendering entirely.
     */
    default:
      return state;
  }
}
