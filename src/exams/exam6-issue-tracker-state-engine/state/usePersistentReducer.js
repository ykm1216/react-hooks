import { useEffect, useReducer } from 'react';

const STORAGE_VERSION = 1;

function isValidPersisted(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    Array.isArray(value.issues) &&
    typeof value.filter === 'string' &&
    typeof value.nextId === 'number'
  );
}

/**
 * Exam 6 — custom Hook.
 *
 * Wraps `useReducer` with localStorage persistence:
 *   - loads ONCE on mount (lazy initialiser, not an effect)
 *   - saves after EVERY state change (effect keyed on `state`)
 *
 * The hook deliberately owns no issue logic: it just persists whatever the
 * reducer produces, so the reducer stays pure and testable.
 */
export function usePersistentReducer(reducer, initialState, storageKey) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    // Third argument = lazy initialiser. React calls it ONCE on mount, which is
    // why the read is not in an effect: an effect would run after the first
    // render and could clobber freshly-typed input.
    (fallback) => {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw === null) {
          console.log(`[persist] no saved state for "${storageKey}" -> using initial state`);
          return fallback;
        }

        const parsed = JSON.parse(raw);

        if (parsed?.version !== STORAGE_VERSION || !isValidPersisted(parsed.data)) {
          console.warn('[persist] saved state shape mismatch -> falling back');
          return fallback;
        }

        console.log(
          `[persist] loaded ${parsed.data.issues.length} issue(s) from "${storageKey}" on mount`
        );
        return parsed.data;
      } catch (error) {
        console.warn('[persist] could not read saved state -> falling back', error);
        return fallback;
      }
    }
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ version: STORAGE_VERSION, data: state })
      );
      console.log(`[persist] saved ${state.issues.length} issue(s) to "${storageKey}"`);
    } catch (error) {
      // Private mode / quota exceeded: the app must keep working in memory.
      console.warn('[persist] could not save state', error);
    }
  }, [storageKey, state]);

  return [state, dispatch];
}
