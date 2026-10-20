/**
 * Status rules for the task counter, kept outside the component tree so the
 * derivation is a plain, testable function.
 *
 * Status is DERIVED from state on every render. It is intentionally NOT stored
 * in its own useState -- a second state variable could drift out of sync with
 * `count`/`target` (a classic duplicated-state bug).
 */

export const STATUS = {
  NOT_STARTED: 'Not started',
  IN_PROGRESS: 'In progress',
  TARGET_REACHED: 'Target reached',
};

export function deriveStatus(count, target) {
  if (count <= 0) return STATUS.NOT_STARTED;
  if (count >= target) return STATUS.TARGET_REACHED;
  return STATUS.IN_PROGRESS;
}

export const STATUS_TONE = {
  [STATUS.NOT_STARTED]: 'bg-stone-100 text-stone-600',
  [STATUS.IN_PROGRESS]: 'bg-amber-100 text-amber-800',
  [STATUS.TARGET_REACHED]: 'bg-emerald-100 text-emerald-800',
};
