# Exam 3 — Accessible Form Toolkit

## Completed requirements
- Controlled name, email, and password fields are validated on submit.
- Refs focus the first invalid field and retain the previous successful email; error messages are announced accessibly.

## Known limitations
- Validation runs on submit, email validation is intentionally basic, and submissions are not persisted or sent to a server.

## Test steps
From the project root run `npm install` and `npm run dev`. Submit empty and partially completed forms to check focus order, then submit valid data twice to check email history.

## Demo bug and fix
Updating a ref does not trigger a render. State now drives rendered values, while refs remain for DOM access and non-rendered bookkeeping.
