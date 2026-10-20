import { HEADING, PRE, PROSE, SUBHEADING, CODE } from '../ui.js';

/** Static explanation of the required debugging case (no props, no state). */
export default function DebugNotes() {
  return (
    <section className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-5">
      <h2 className={HEADING}>💡 Debug notes</h2>

      <h3 className={SUBHEADING}>Case 18 — “the ref value never updates on screen”</h3>
      <pre className={PRE}>
        {`// BROKEN: rendering a ref value
const clicks = useRef(0);
function handleClick() {
  clicks.current += 1;          // mutation, no re-render scheduled
}
return <p>{clicks.current}</p>; // never changes on screen

// FIXED: render state, keep the ref for non-rendered bookkeeping
const [clicks, setClicks] = useState(0);
function handleClick() {
  setClicks((c) => c + 1);      // schedules a re-render
}
return <p>{clicks}</p>;`}
      </pre>
      <p className={PROSE}>
        A ref is a stable, mutable box: <code className={CODE}>useRef(0)</code> returns the same
        object on every render, and assigning <code className={CODE}>clicks.current += 1</code>{' '}
        changes the box&apos;s contents only. React has no idea the box changed — refs are not part
        of the render output and do not participate in the re-render decision. State does: calling a
        setter tells React &quot;this render&apos;s output is now stale, render again&quot;.
      </p>
      <p className={PROSE}>
        <strong>Rule of thumb:</strong> if a value appears in JSX, it belongs in state. Refs are for
        values you read on demand inside handlers or effects — DOM nodes, timer ids, and the
        previous-email buffer used in App.
      </p>
    </section>
  );
}
