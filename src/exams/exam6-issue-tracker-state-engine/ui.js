/** Shared Tailwind class strings -- pastel, Notion-style theme. */

export const PANEL = 'rounded-2xl border border-stone-200/80 bg-white p-5 dark:border-stone-800 dark:bg-stone-900';
export const PANEL_MUTED = `${PANEL} bg-[#f5f5f5] dark:bg-stone-900/60`;

export const BTN_PRIMARY =
  'rounded-xl bg-sky-200 px-4 py-2.5 text-sm font-semibold text-sky-900 transition hover:bg-sky-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-sky-300/25 dark:text-sky-100';
export const BTN_GHOST =
  'rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700';

export const FIELD =
  'min-w-[220px] flex-1 rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-800 outline-none focus:outline-2 focus:outline-sky-300 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100';

export const CODE =
  'rounded-md bg-sky-100/70 px-1.5 py-0.5 font-mono text-[0.85em] text-sky-800 dark:bg-stone-800 dark:text-sky-300';
export const HEADING = 'text-base font-semibold';
export const SUBHEADING = 'mt-4 text-sm font-semibold text-sky-700 dark:text-sky-300';
export const PROSE = 'mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300';
export const PRE =
  'mt-2 overflow-x-auto rounded-xl border border-stone-200 bg-[#f5f5f5] p-4 font-mono text-[12.5px] leading-relaxed text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200';
