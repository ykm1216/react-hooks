# React Hooks Practical Exam

One Vite + React app containing six independent practicals. Install dependencies and start the app from the project root:

```bash
npm install
npm run dev
```

Other checks: `npm run build` creates a production build; `npm test` runs the five Exam 6 reducer tests. Use the tabs in the app to open each practical.

## Exam summaries

### 1. Smart Task Counter
- **Completed:** `useState` counter and target, bounded decrement, reset, exact +2 updates, derived status, and activity log.
- **Known limitations:** State resets on refresh; lowering the target below the count is allowed; +2 can exceed the target.
- **Test:** Increment to 4, click **Plus two** and confirm 6; test decrement at 0; reset and change the target.
- **Demo bug and fix:** Two `setCount(count + 1)` calls used the same render snapshot. Two functional updates (`setCount(c => c + 1)`) correctly add two.

### 2. Live Search and Timer
- **Completed:** Debounced local search, timeout and interval cleanup, one-second timer, and result-count document title.
- **Known limitations:** Search is simulated against local data; matching is case-insensitive substring matching; background-tab throttling can affect the timer.
- **Test:** Search for a name, type quickly to check debounce, watch the timer, unmount/remount it, and check the browser title.
- **Demo bug and fix:** An interval using `setSeconds(seconds + 1)` captured the initial value. A functional updater (`setSeconds(s => s + 1)`) uses the latest value.

### 3. Accessible Form Toolkit
- **Completed:** Controlled fields, submit validation, focus on the first invalid field, accessible error messaging, and ref-held previous successful email.
- **Known limitations:** Validation occurs on submit; email validation is intentionally basic; submissions are not persisted or sent to a server.
- **Test:** Submit empty and partially completed forms to check focus order, then submit valid data twice to check email history.
- **Demo bug and fix:** Updating a ref does not trigger a render. State now drives rendered values; the ref remains for non-rendered bookkeeping.

### 4. Application Preferences
- **Completed:** Shared theme and font-size state using one context/provider, with consumers that do not require prop drilling.
- **Known limitations:** Preferences are not persisted; only light/dark themes and 14/16/18 px sizes are supported.
- **Test:** Toggle the theme from both controls, select each font size, and inspect the provider debug demo.
- **Demo bug and fix:** A consumer outside its provider reads the default context value. The app's consumers share one context object beneath its provider; the debug demo intentionally shows the outside-provider case.

### 5. Product Explorer
- **Completed:** Memoized filtering/sorting and selection callback, memoized product list, complete dependencies, and analytics in an effect.
- **Known limitations:** Search work is simulated; all matching products render at once (up to 600); memoization does not optimize DOM rendering of changed results.
- **Test:** Use the unrelated counter and check the console, then search, change category/sort, and select the same product twice.
- **Demo bug and fix:** Omitting `query` from `useMemo` dependencies left results stale while typing. Adding `query` ensures the list recalculates when the search changes.

### 6. Issue Tracker
- **Completed:** Pure `useReducer` state transitions, filtering/count selectors, localStorage persistence through a custom hook, and five reducer tests.
- **Known limitations:** Persistence is local to one browser; there is no cross-tab sync; issue fields and filter options are intentionally limited.
- **Test:** Run `npm test`, then add, complete, delete, and filter issues; reload to check persistence and try the debug actions.
- **Demo bug and fix:** Mutating the current state or issue in place can hide changes from React and corrupt prior state. Reducer actions return new state and issue objects.

## Submission and demonstration checklist

1. Submit the project without `node_modules`; include a repository link if required.
2. Confirm `npm install` and `npm run dev` work from the project root.
3. No state-management library is used.
4. Each exam README identifies completed requirements, known limitations, and test steps.
5. During the demonstration, explain one bug and the code change that fixed it. The examples above provide a concise talking point for each exam.

## Project notes

- Only the active exam is mounted; switching tabs unmounts it and cleans up its effects.
- Exam 4's preference toggle applies the class-based dark theme to the document.
- Stack: React 19, Vite 7, and Tailwind CSS v4.
