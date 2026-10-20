import { usePreferences } from '../context/PreferencesContext.jsx';
import { BUTTON_GHOST } from '../ui.js';

/**
 * Level 3 (leaf). Receives NO props from Dashboard -- it reaches into context
 * for the theme and the toggle function.
 */
export default function Toolbar() {
  const { theme, toggleTheme } = usePreferences();

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-[#f5f5f5] p-4 dark:bg-stone-800/60">
      <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">Toolbar</span>
      <button
        type="button"
        onClick={toggleTheme}
        className={BUTTON_GHOST}
        data-testid="toolbar-theme-toggle"
      >
        {theme === 'light' ? '☾ Dark mode' : '☀ Light mode'}
      </button>
      <span className="text-sm text-stone-500 dark:text-stone-400">
        No props passed in — the value came from context.
      </span>
    </div>
  );
}
