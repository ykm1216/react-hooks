import { usePreferences } from '../context/PreferencesContext.jsx';
import { PANEL } from '../ui.js';

/**
 * All three font sizes are written out literally so Tailwind's static scanner
 * can find the `text-[Npx]` classes. Building the class name with a template
 * string (e.g. `text-[${size}px]`) would NOT be detected and would produce no
 * CSS — a classic Tailwind pitfall worth noting.
 */
const FONT_CLASS = {
  14: 'text-[14px]',
  16: 'text-[16px]',
  18: 'text-[18px]',
};

const THEME_VISUAL = {
  light: {
    wrapper: 'bg-[#fafafa] text-stone-900 ring-1 ring-stone-200',
    meta: 'text-stone-500',
    badge: 'bg-amber-100 text-amber-800',
  },
  dark: {
    wrapper: 'bg-stone-950 text-stone-100 ring-1 ring-stone-800',
    meta: 'text-stone-400',
    badge: 'bg-violet-300/25 text-violet-100',
  },
};

/** A sibling of Dashboard: updates with the same theme/fontSize values. */
export default function ArticlePreview() {
  const { theme, fontSize } = usePreferences();
  const visual = THEME_VISUAL[theme];

  return (
    <section className={PANEL}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">📰 Article preview</h2>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${visual.badge}`}
          data-testid="preview-theme"
        >
          {theme} · {fontSize}px
        </span>
      </div>

      <article
        className={`mt-4 rounded-xl p-4 ${visual.wrapper} ${FONT_CLASS[fontSize]}`}
        data-testid="preview-article"
        data-font-size={fontSize}
      >
        <h3 className="text-xl font-bold">Why context beats prop drilling</h3>
        <p className={`mt-2 ${visual.meta}`}>
          This paragraph inherits the shared font size and colour palette from context. Change
          either control above and this preview updates instantly, without any component in between
          passing the values along.
        </p>
        <p className={`mt-2 ${visual.meta}`}>
          Every element here is sized by the same <code>fontSize</code> value the Dashboard reports.
        </p>
      </article>
    </section>
  );
}
