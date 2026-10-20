/**
 * Shared Tailwind class strings -- pastel, Notion-style theme.
 * Soft borders, large radii, no heavy shadows.
 */

export const PANEL = 'rounded-2xl border border-stone-200/80 bg-white p-5';
export const PANEL_MUTED = 'rounded-2xl border border-stone-200/60 bg-[#f5f5f5] p-5';

export const BTN =
  'rounded-xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40';
export const BTN_PRIMARY = `${BTN} bg-violet-200 text-violet-900 hover:bg-violet-300`;
export const BTN_GHOST = `${BTN} border border-stone-200 bg-white text-stone-700 hover:bg-stone-50`;

export const CODE = 'rounded-md bg-rose-100/70 px-1.5 py-0.5 font-mono text-[0.85em] text-rose-700';
export const HEADING = 'text-base font-semibold';
export const PROSE = 'mt-3 text-sm leading-relaxed text-stone-600';
export const PRE =
  'overflow-x-auto rounded-xl border border-stone-200 bg-[#f5f5f5] p-4 font-mono text-[12.5px] leading-relaxed text-stone-700';
