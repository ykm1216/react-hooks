# Exam 2 — Live Search and Timer

## Completed requirements
- `useEffect` and `useState` provide debounced local search, a one-second timer, and a result-count document title.
- Search timeouts and the timer interval are cleaned up when effects rerun or unmount.

## Known limitations
- Search simulates a request using local data; matching is case-insensitive substring matching. Background-tab throttling can affect timer accuracy.

## Test steps
From the project root run `npm install` and `npm run dev`. Search for a name, type quickly to check debounce, watch the timer, unmount/remount it, and check the browser title.

## Demo bug and fix
An interval using `setSeconds(seconds + 1)` captured the initial value and stalled. A functional updater (`setSeconds(s => s + 1)`) uses the latest state.
