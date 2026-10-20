import { BTN_GHOST, BTN_PRIMARY } from '../ui.js';

/**
 * Stateless controls. All handlers and the derived `targetReached` flag come in
 * as props, so this component holds no logic of its own.
 */
export default function CounterControls({
  targetReached,
  onIncrement,
  onDecrement,
  onAddTwo,
  onReset,
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <button
        type="button"
        onClick={onIncrement}
        disabled={targetReached}
        className={BTN_PRIMARY}
        data-testid="increment"
      >
        Increment
      </button>
      <button
        type="button"
        onClick={onDecrement}
        className={BTN_PRIMARY}
        data-testid="decrement"
      >
        Decrement
      </button>
      <button
        type="button"
        onClick={onAddTwo}
        disabled={targetReached}
        className={BTN_PRIMARY}
        data-testid="add-two"
      >
        Plus two
      </button>
      <button type="button" onClick={onReset} className={BTN_GHOST} data-testid="reset">
        Reset
      </button>
    </div>
  );
}
