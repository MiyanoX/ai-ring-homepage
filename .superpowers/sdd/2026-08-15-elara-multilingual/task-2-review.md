# Task 2 Review — ELARA One multilingual content contract

## Spec-compliance verdict

Fail.

The inspected implementation satisfies most of the contract: `pageContentByLocale` exists, the three locale records are present with the required top-level keys, the SEO values match the brief, image `src` and `position` values stay aligned across locales, the local-preview disclosure remains explicit, and `package.json` uses an explicit `npm test` file list that excludes `tests/sites-worker.test.mjs`. Current tests also pass.

However, the task does not fully comply with the brief because the legacy standalone `pageContent` export was not actually replaced.

## Task-quality verdict

Mixed.

The content work itself is careful and mostly strong, but the review-critical migration requirement was missed, and the new test file does not protect against that miss.

## Findings

### [high] Spec violation — legacy standalone `pageContent` export still exists

- Evidence: `src/content.js:522-531`
- The brief required: “Replace the current standalone `pageContent` export with `pageContentByLocale`.”
- The file now exports both `pageContentByLocale` (`src/content.js:47`) and a compatibility `pageContent` object (`src/content.js:522-531`).
- Keeping the legacy export preserves the old API surface instead of replacing it, so this conflicts with the stated requirement even if it helps an intermediate split-task workflow.

### [medium] Task-quality gap — tests do not guard the required export-surface change

- Evidence: `tests/content.test.mjs:1-73`
- The new tests validate locale keys, anchor/index consistency, image `src` parity, and non-empty strings, but they never assert that the standalone `pageContent` export is gone.
- Because of that gap, the suite still passes while the main migration requirement is violated.

## Notes

- Verified directly from the current files and runtime import:
  - `pageContentByLocale` exposes exactly `en`, `zh`, and `ja`.
  - Each locale has the required top-level keys.
  - SEO values match the brief exactly.
  - Image `position` values remain identical across locales.
  - `npm test` currently passes with `tests/waitlist.test.mjs tests/locale.test.mjs tests/content.test.mjs`.

## Final verdict

Request fixes.

Required fix before approval: remove the compatibility `pageContent` export so `src/content.js` reflects the brief’s required replacement, and tighten the content-contract test so this export-surface requirement cannot regress silently.
