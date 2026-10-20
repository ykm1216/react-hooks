# Exam 1 — Smart Task Counter

## Completed requirements
- `useState` manages the count, target, and activity log.
- Increment, decrement, reset, and exact +2 controls are provided; status is derived from state.

## Known limitations
- State resets on refresh. The target may be lowered below the count, and +2 may exceed the target.

## Test steps
From the project root run `npm install` and `npm run dev`. Increment to 4, select **Plus two** and confirm 6; test decrement at 0, reset, and change the target.

## Demo bug and fix
Two `setCount(count + 1)` calls read the same render snapshot. Two functional updates (`setCount(c => c + 1)`) use the latest pending state and add exactly two.
