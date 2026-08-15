# Task 5: Extend automated verification and preserve Sites packaging

This is a verification-only task after the locale implementation and visual changes. Read this brief first — it defines the commands and artifact checks to run.

## Scope

- Do not modify application, test, Worker, script, hosting, or asset files.
- Do not initialize Git or create commits.
- Write only `.superpowers/sdd/2026-08-15-elara-multilingual/task-5-report.md`.

## Required commands

Run each command as a complete fresh verification:

```bash
npm test
npm run build
npm run test:sites
```

Expected behavior:

- `npm test` runs waitlist, locale, and content contract tests and does not run `tests/sites-worker.test.mjs`.
- `npm run build` exits 0, runs Vite, then runs `scripts/prepare-sites-build.mjs`.
- `npm run test:sites` exits 0 and validates static asset passthrough, HTML fallback, non-HTML/non-GET 404 behavior, and Sites artifacts.

## Required artifact checks

After build, verify all three paths exist and are non-empty:

```text
dist/client/index.html
dist/server/index.js
dist/.openai/hosting.json
```

Also inspect these required project files and confirm they remain present and unmodified by this verification task:

```text
.openai/hosting.json
worker/index.js
scripts/prepare-sites-build.mjs
tests/sites-worker.test.mjs
```

Do not claim browser behavior from this task; Task 6 owns live browser verification.

## Report

Write the report to `.superpowers/sdd/2026-08-15-elara-multilingual/task-5-report.md` with exact commands, pass/fail counts, artifact paths and sizes, file-presence checks, and concerns. Return only status, command summary, artifact summary, and concerns.
