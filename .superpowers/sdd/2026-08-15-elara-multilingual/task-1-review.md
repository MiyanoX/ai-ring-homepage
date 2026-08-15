# Task 1 Review — ELARA locale module

Spec compliance verdict: request-fixes

Task quality verdict: request-fixes

Findings:

- [P2] Keep `npm test` scoped to unit/content tests only — `package.json:12-13`

  The current `test` script uses `node --test tests/*.test.mjs`, which pulls in `tests/sites-worker.test.mjs` alongside the locale test. That broadens the normal unit-test command to include the Sites-specific suite, contrary to the brief’s requirement that `test:sites` remain separate. The implementer report also shows `npm test` now running 13 tests, which confirms the Sites check was accidentally folded into the general test command.

Overall assessment:

The locale module itself matches the requested path parsing, browser-language mapping, storage safety, and pure-module constraints. The only regression is the widened `npm test` scope, which should be narrowed back to the locale/content unit tests so Sites verification stays isolated.

Final verdict: request-fixes
