/** Purely presentational list. Toggling and deleting bubble up as callbacks. */
export default function IssueList({ issues, onToggle, onDelete, emptyMessage }) {
  if (issues.length === 0) {
    return (
      <p
        className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-8 text-center text-sm text-stone-500 dark:border-stone-700 dark:text-stone-400"
        data-testid="empty-state"
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="grid list-none gap-2 p-0" data-testid="issue-list">
      {issues.map((issue) => (
        <li
          key={issue.id}
          data-testid={`issue-${issue.id}`}
          className="flex items-center gap-3 rounded-xl border border-stone-200/70 bg-[#fafafa] px-3.5 py-3 transition hover:bg-sky-50/60 dark:border-stone-700 dark:bg-stone-800/60"
        >
          <input
            id={`issue-check-${issue.id}`}
            type="checkbox"
            checked={issue.done}
            onChange={() => onToggle(issue.id)}
            className="h-4 w-4 accent-sky-400"
            aria-label={`Mark "${issue.title}" as ${issue.done ? 'open' : 'done'}`}
          />
          <label
            htmlFor={`issue-check-${issue.id}`}
            className={`flex-1 cursor-pointer text-sm ${
              issue.done ? 'text-stone-400 line-through' : 'font-medium'
            }`}
          >
            {issue.title}
          </label>
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-stone-700 dark:text-stone-300">
            #{issue.id}
          </span>
          <button
            type="button"
            onClick={() => onDelete(issue.id)}
            aria-label={`Delete "${issue.title}"`}
            className="rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-xs font-semibold text-stone-600 transition hover:bg-rose-50 hover:text-rose-600 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-200"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
