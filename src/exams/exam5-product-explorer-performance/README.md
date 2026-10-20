# Exam 5 — Product Explorer

## Completed requirements
- `useMemo` caches filtering/sorting and `useCallback` stabilizes selection; `React.memo` avoids unrelated list renders.
- Dependencies are complete and analytics run in an effect. The explorer includes 600 generated products and search, category, and sort controls.

## Known limitations
- Search work is simulated. All matching products render at once (up to 600), so memoization does not optimize rendering of changed results.

## Test steps
From the project root run `npm install` and `npm run dev`. Use the unrelated counter and check the console, then search, change category/sort, and select the same product twice.

## Demo bug and fix
Omitting `query` from `useMemo` dependencies left results stale while typing. Adding `query` makes the list recalculate when the search changes.
