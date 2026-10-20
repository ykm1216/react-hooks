import { useState } from 'react';
import { BTN_PRIMARY, FIELD } from '../ui.js';

/**
 * Owns ONLY the transient text draft. That is genuinely local UI state — it is
 * not part of the tracked domain state — so keeping it here lets the rest of the
 * app be driven purely by the reducer.
 *
 * The component reports a finished title upward; it never dispatches itself, so
 * all action shapes stay visible in one place (App.jsx).
 */
export default function AddIssueForm({ onAdd }) {
  const [draft, setDraft] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;
    onAdd(title);
    setDraft('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2.5">
      <label className="sr-only" htmlFor="new-issue">
        New issue title
      </label>
      <input
        id="new-issue"
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Describe the issue…"
        autoComplete="off"
        data-testid="new-issue"
        className={FIELD}
      />
      <button type="submit" disabled={draft.trim() === ''} data-testid="add-issue" className={BTN_PRIMARY}>
        Add issue
      </button>
    </form>
  );
}
