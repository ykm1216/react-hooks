import { FONT_SIZES, usePreferences } from '../context/PreferencesContext.jsx';
import { HEADING, PANEL } from '../ui.js';

/** Changes theme + font size. Sits as a direct child of the provider. */
export default function PreferencesPanel() {
  const { theme, setTheme, fontSize, setFontSize } = usePreferences();

  return (
    <section className={PANEL}>
      <h2 className={HEADING}>⚙️ Preferences</h2>

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold text-stone-600 dark:text-stone-300">Theme</legend>
        <div className="mt-2 flex gap-2">
          {['light', 'dark'].map((option) => (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium capitalize transition ${
                theme === option
                  ? 'border-violet-300 bg-violet-100 text-violet-900 dark:border-violet-400/40 dark:bg-violet-300/20 dark:text-violet-100'
                  : 'border-stone-200 bg-white text-stone-700 dark:border-stone-700 dark:text-stone-200 dark:bg-stone-800'
              }`}
            >
              <input
                type="radio"
                name="theme"
                value={option}
                checked={theme === option}
                onChange={() => setTheme(option)}
                className="accent-violet-400"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-stone-600 dark:text-stone-300">
          Font size
        </legend>
        <div className="mt-2 flex gap-2">
          {FONT_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setFontSize(size)}
              aria-pressed={fontSize === size}
              data-testid={`font-${size}`}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                fontSize === size
                  ? 'border-violet-300 bg-violet-200 text-violet-900 dark:border-violet-400/40 dark:bg-violet-300/25 dark:text-violet-100'
                  : 'border-stone-200 bg-white text-stone-700 dark:border-stone-700 dark:text-stone-200 dark:bg-stone-800'
              }`}
            >
              {size}px
            </button>
          ))}
        </div>
      </fieldset>

      <p className="mt-4 text-xs text-stone-500 dark:text-stone-400">
        Neither Dashboard nor ArticlePreview receives these as props — both read the same context.
      </p>
    </section>
  );
}
