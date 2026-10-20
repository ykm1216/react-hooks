# Exam 6 — Issue Tracker

## Completed requirements
- A pure `useReducer` manages issue actions, filters, and counts; a custom hook persists state to localStorage.
- Five reducer tests cover updates, filtering, immutability, and unknown actions.

## Known limitations
- Persistence is local to one browser and does not sync across tabs. Issue fields and filters are intentionally limited.

## Test steps
From the project root run `npm install`, `npm test`, and `npm run dev`. Add, complete, delete, and filter issues; reload to check persistence and try the debug actions.

## Demo bug and fix
In-place state or issue mutation can hide changes from React and alter prior state. Reducer actions return new state and issue objects instead.
