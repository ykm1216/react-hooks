/** Shared Tailwind class strings -- pastel, Notion-style theme. */

export const PANEL = 'rounded-2xl border border-stone-200/80 bg-white p-5';
export const PANEL_MUTED = 'rounded-2xl border border-stone-200/60 bg-[#f5f5f5] p-5';

export const BTN_PRIMARY =
  'rounded-xl bg-violet-200 px-4 py-2.5 text-sm font-semibold text-violet-900 transition hover:bg-violet-300 active:scale-[0.98]';
export const BTN_GHOST =
  'rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50';

export const CODE = 'rounded-md bg-violet-100/70 px-1.5 py-0.5 font-mono text-[0.85em] text-violet-800';
export const HEADING = 'text-base font-semibold';
export const SUBHEADING = 'mt-4 text-sm font-semibold text-violet-700';
export const PROSE = 'mt-3 text-sm leading-relaxed text-stone-600';
export const PRE =
  'mt-2 overflow-x-auto rounded-xl border border-stone-200 bg-[#f5f5f5] p-4 font-mono text-[12.5px] leading-relaxed text-stone-700';

const INPUT_BASE =
  'w-full rounded-xl border px-3.5 py-2.5 text-base outline-none transition focus:outline-2';

/** Error styling lives here so the field component stays declarative. */
export function inputClass(hasError) {
  return `${INPUT_BASE} ${
    hasError
      ? 'border-rose-300 bg-rose-50 focus:outline-rose-300'
      : 'border-stone-200 bg-white focus:outline-violet-300'
  }`;
}
