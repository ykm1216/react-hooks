import { CODE, HEADING, PRE, PROSE, SUBHEADING } from '../ui.js';

/** Static explanation of the required debugging cases (no props, no state). */
export default function DebugNotes() {
  return (
    <section className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-5 dark:border-stone-800 dark:bg-stone-900">
      <h2 className={HEADING}>💡 Debug notes</h2>

      <h3 className={SUBHEADING}>Case 15 — direct state mutation replaced with new objects</h3>
      <pre className={PRE}>
        {`// BROKEN
state.issues.push(newIssue);          // same array reference
issue.done = !issue.done;             // same issue object
return state;                         // React sees no change -> no render

// FIXED
return { ...state, issues: [...state.issues, newIssue], nextId: state.nextId + 1 };
// and for a single issue:
issues: state.issues.map((issue) =>
  issue.id === id ? { ...issue, done: !issue.done } : issue
),`}
      </pre>
      <p className={PROSE}>
        React decides whether to re-render by comparing the returned state with{' '}
        <code className={CODE}>Object.is</code>. Mutating the existing array or issue keeps every
        reference identical, so the reducer returns the same object, React bails out, and the screen
        never updates. Purity also protects the undo/history pattern and keeps the reducer testable
        in isolation — the tests assert <code className={CODE}>assert.notEqual</code> on the previous
        references.
      </p>

      <h3 className={SUBHEADING}>Case 16 — mismatched action shape</h3>
      <pre className={PRE}>
        {`// BROKEN: reducer reads payload, caller sends a bare property
dispatch({ type: 'ADD_ISSUE', title });              // caller
const { title } = action.payload;                    // reducer -> undefined

// FIXED: one agreed shape everywhere
dispatch({ type: 'ADD_ISSUE', payload: { title } });
const title = action.payload?.title ?? '';           // defensive read`}
      </pre>
      <p className={PROSE}>
        The mismatch is silent in JavaScript: destructuring a missing property gives{' '}
        <code className={CODE}>undefined</code> rather than throwing, so the issue was simply never
        added. The fix aligns every dispatch site on <code className={CODE}>payload</code> and makes
        the reducer defend itself against a blank title. Try the malformed button above to confirm
        nothing is added.
      </p>

      <h3 className={SUBHEADING}>Case 17 — default branch that returned `undefined`</h3>
      <pre className={PRE}>
        {`// BROKEN
default:
  return;              // undefined -> next render reads state.issues of undefined

// FIXED
default:
  return state;        // unchanged reference; React even skips the re-render`}
      </pre>
      <p className={PROSE}>
        An unrecognised action (typo, half-finished feature, stale hot-reload dispatch) used to
        replace the whole state with <code className={CODE}>undefined</code>, which crashed the very
        next render. Returning the existing state preserves it and, because the reference is
        identical, React bails out of re-rendering. Press <em>Dispatch unknown action</em> above —
        the app keeps working and the JSON block does not change.
      </p>
    </section>
  );
}
