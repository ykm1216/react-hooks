import { STATUS_TONE } from '../status.js';

/** Purely presentational: receives the already-derived status string. */
export default function StatusBadge({ status }) {
  return (
    <p
      className={`my-4 inline-block rounded-full px-3.5 py-2 text-sm font-semibold ${STATUS_TONE[status]}`}
      data-testid="status"
      role="status"
      aria-live="polite"
    >
      {status}
    </p>
  );
}
