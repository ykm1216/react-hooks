import { PANEL_MUTED } from '../ui.js';

/**
 * Shows the ref-held submission history. Presentational only: App owns the
 * `submittedEmailRef` and the mirrored state that feeds this component.
 */
export default function SubmissionHistory({ previousEmail, submitted }) {
  return (
    <section className={PANEL_MUTED}>
      <h2 className="text-base font-semibold">Submission history (ref-held)</h2>

      <dl className="mt-3 grid gap-2 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-stone-500">Previous successful email</dt>
          <dd className="font-semibold" data-testid="previous-email">
            {previousEmail || '— none yet —'}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-stone-500">Current submission</dt>
          <dd className="font-semibold" data-testid="current-email">
            {submitted ? `${submitted.name} · ${submitted.email}` : '—'}
          </dd>
        </div>
      </dl>

      <p className="mt-3 text-xs leading-relaxed text-stone-500">
        Submit once: “Previous” stays empty and the ref now holds that email. Edit the email and
        submit again: the first email appears as the previous value. The ref write itself never
        rendered anything — we only mirror it into state during a submit that was already going to
        re-render.
      </p>
    </section>
  );
}
