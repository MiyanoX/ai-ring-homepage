# Final review package — ELARA One trilingual landing page

Git metadata is unavailable in this checkout. Review the current working tree directly; do not initialize Git, mutate application files, or alter the index.

## Requirements

- Support English, Simplified Chinese, and Japanese at /en/, /zh/, and /ja/.
- Keep the locale content contract uniform across all three records.
- Use explicit locale paths as authoritative; root may use safe stored/browser preference; unsupported paths fall back safely.
- Localize visible copy, metadata, hreflang, language switcher, accessibility labels, and preview form states.
- Preserve the approved visual contract: one full-width hero image, transparent floating header and desktop copy/action group, and ritual-card images in normal flow.
- Preserve Sites handoff files: .openai/hosting.json, worker/index.js, scripts/prepare-sites-build.mjs, tests/sites-worker.test.mjs.
- Required verification: npm test, npm run build, npm run test:sites, and browser-rendered QA in design-qa.md.

## Review scope

- src/content.js
- src/i18n/locale.js
- src/App.jsx
- src/styles.css
- index.html
- tests/content.test.mjs
- tests/locale.test.mjs
- package.json
- design-qa.md
- .superpowers/sdd/2026-08-15-elara-multilingual/

## Evidence

- Browser screenshots: artifacts/browser-en-desktop-1280x720.png, artifacts/browser-ja-mobile-390x844.png, artifacts/browser-ja-ritual-cards-390x844.png
- Source target: references/landing-page/elara-morning-ritual.png
- Latest automated runs are recorded in task-6-report.md and design-qa.md.

## Required review

Read the approved plan/spec and the scoped files. Confirm the three locale records have identical top-level keys and that no legacy Chinese-only landing branch remains. Inspect App routing/metadata/form behavior and CSS against the current AGENTS.md visual contract. Check the Sites handoff files are intact. Run the three required commands if practical. Report strengths, Critical/Important/Minor findings with file and line references, recommendations, and a clear ready-to-merge assessment.

Write the review to .superpowers/sdd/2026-08-15-elara-multilingual/final-review.md only. Do not modify any other file.
