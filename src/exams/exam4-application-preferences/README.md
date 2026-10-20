# Exam 4 — Application Preferences

## Completed requirements
- One context/provider shares theme, font size, and update functions without prop drilling.
- Theme toggles and 14/16/18 px choices update the consumers; the guarded hook reports use outside the provider.

## Known limitations
- Preferences are not persisted. Only light/dark themes and the three specified font sizes are supported.

## Test steps
From the project root run `npm install` and `npm run dev`. Toggle the theme from both controls, select each font size, and inspect the provider debug demo.

## Demo bug and fix
A consumer outside its provider reads the context default. App consumers use one shared context object under its provider; the debug demo intentionally shows the outside-provider case.
