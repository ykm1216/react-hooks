const PRESETS = [3, 5, 10];

/** Lets the `target` state value be exercised from the UI. */
export default function TargetControl({ target, onChange }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-stone-200 pt-4">
      <label htmlFor="target-input" className="text-sm font-medium text-stone-500">
        Target
      </label>
      <input
        id="target-input"
        type="number"
        min="1"
        value={target}
        onChange={(event) => onChange(Math.max(1, Number(event.target.value) || 1))}
        className="w-20 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm focus:outline-2 focus:outline-violet-300"
      />
      <div className="flex gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
              target === preset
                ? 'border-violet-200 bg-violet-200 text-violet-900'
                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
