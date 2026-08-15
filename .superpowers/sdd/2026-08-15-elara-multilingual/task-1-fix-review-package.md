# Task 1 fix-round review package

Git metadata is unavailable, so this scoped review package points directly at the current implementation and the fix evidence.

Files to inspect:

- `package.json`
- `.superpowers/sdd/2026-08-15-elara-multilingual/task-1-report.md`

Original finding:

- `[P2]` The normal `npm test` command used `tests/*.test.mjs`, which included `tests/sites-worker.test.mjs`. The plan requires the Sites suite to remain behind `npm run test:sites`.

Expected fix:

- `npm test` explicitly runs `tests/waitlist.test.mjs` and `tests/locale.test.mjs` at this task stage.
- `test:sites` remains `node --test tests/sites-worker.test.mjs`.
- Task 2 will add `tests/content.test.mjs` to `npm test` after that file exists.

The implementer reports that `npm test` and the locale test pass after the fix. Do not modify implementation files. Write the scoped re-review to `.superpowers/sdd/2026-08-15-elara-multilingual/task-1-fix-review.md`, verdicting the original finding as ADDRESSED or NOT ADDRESSED and listing any new breakage in the fix diff only.
