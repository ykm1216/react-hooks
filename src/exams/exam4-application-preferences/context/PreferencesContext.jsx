import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Exam 4 — Application Preferences
 *
 * ONE context object, created once at module scope. Both the provider and every
 * consumer import this exact object, which is why `===` identity is preserved
 * all the way down the tree (debugging case 10).
 *
 * The default value is `null` on purpose: `null` means "nobody provided a
 * value", which is exactly what `usePreferences` checks for.
 */
export const PreferencesContext = createContext(null);

export const FONT_SIZES = [14, 16, 18];

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }

  // Keep the <html> element's class list in sync so Tailwind's class-based
  // `dark:` variant works anywhere in the document. This is a DOM side effect,
  // so it belongs in an effect -- not in the render body.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    return () => root.classList.remove('dark');
  }, [theme]);

  // The value object is recreated on each provider render. That is deliberate
  // and cheap here: the tree is three levels deep, so every consumer would have
  // to re-render anyway when theme/fontSize changes. `useMemo` around this
  // object only pays off when the provider re-renders for OTHER reasons while
  // its own values stay equal -- see the README for the trade-off.
  const value = { theme, fontSize, setTheme, toggleTheme, setFontSize };

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

/**
 * The ergonomic accessor. Throwing on a missing provider converts a confusing
 * "everything is undefined" runtime error into a clear, actionable message.
 */
export function usePreferences() {
  const value = useContext(PreferencesContext);

  if (value === null) {
    throw new Error(
      'usePreferences must be called inside <PreferencesProvider>. ' +
        'Wrap the component tree in the provider (see src/App.jsx).'
    );
  }

  return value;
}
