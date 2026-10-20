import { inputClass } from '../ui.js';

/**
 * One reusable, accessible controlled field.
 *
 * The DOM ref arrives as the `inputRef` prop (not the special `ref` prop) so the
 * ownership is explicit: App creates the refs, this component only attaches them
 * to the element. Nothing here reads `inputRef.current` — only App's submit
 * handler does, which keeps the exam's "no ref access during render" rule.
 */
export default function TextField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  inputRef,
  error,
  hint,
  placeholder,
  autoComplete,
}) {
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-semibold text-stone-700" htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass(Boolean(error))}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />

      {error ? (
        <p id={errorId} role="alert" className="text-sm font-medium text-rose-500">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-stone-400">{hint}</p>
      ) : null}
    </div>
  );
}
