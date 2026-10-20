import { usePreferences } from '../context/PreferencesContext.jsx';
import Toolbar from './Toolbar.jsx';
import { BUTTON, PANEL } from '../ui.js';

/**
 * Level 2 of the required tree. It reads preferences and renders Toolbar, but
 * it does NOT pass a single preference prop down to it.
 */
export default function Dashboard() {
  const { theme, fontSize, toggleTheme } = usePreferences();

  return (
    <section className={PANEL} data-testid="dashboard" data-theme={theme}>
      <h2 className="text-base font-semibold">🏠 Dashboard</h2>
      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        Reads context directly: <strong>{theme}</strong> theme · base {fontSize}px
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={toggleTheme} className={BUTTON} data-testid="toggle-theme">
          Switch to {theme === 'light' ? 'dark' : 'light'} theme
        </button>
        <span className="text-sm text-stone-500 dark:text-stone-400">
          Article preview updates together with this — one shared value.
        </span>
      </div>

      <Toolbar />
    </section>
  );
}
