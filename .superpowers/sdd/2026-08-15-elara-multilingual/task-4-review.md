# Task 4 Review — visible language switcher + full-width hero contract

Date: 2026-08-15
Reviewer: Codex Task 4 reviewer

## Materials reviewed

- Brief: `.superpowers/sdd/2026-08-15-elara-multilingual/task-4-brief.md`
- Implementer report: `.superpowers/sdd/2026-08-15-elara-multilingual/task-4-report.md`
- Review package: `.superpowers/sdd/2026-08-15-elara-multilingual/task-4-review-package.md`
- Implementation: `src/App.jsx`, `src/styles.css`

## Verification performed

- Source inspection of the current `Header`, `Hero`, app composition, locale-link wiring, and responsive CSS.
- Fresh verification commands:
  - `npm test` — PASS (15/15 tests passed)
  - `npm run build` — PASS
- Local rendered verification through the preview server at `http://127.0.0.1:4173/`:
  - desktop/default viewport
  - 980px breakpoint
  - 390px mobile breakpoint
- Browser checks confirmed:
  - transparent absolute header overlay
  - transparent hero copy background
  - gradient-only hero legibility treatment
  - visible locale switcher with `aria-current="page"` and localized `aria-label`
  - desktop full labels / mobile short labels
  - hidden section nav at 980px and below
  - no horizontal overflow at 980px or 390px
  - ritual media/text remaining in normal flow with static positioning

## Spec-compliance verdict

PASS

The implementation matches the Task 4 contract:

- `Header` and `Hero` now share `.hero-stage`, with `<main id="main-content">` following the shared wrapper (`src/App.jsx:100-176`, `src/App.jsx:456-477`).
- The header is split into wordmark, center nav, and right-side tools with a visible locale switcher using anchor links, `aria-current`, localized `aria-label`, and the existing locale-link contract (`src/App.jsx:100-147`, `src/App.jsx:451-453`).
- The header and hero copy float directly over the hero image with transparent backgrounds and no reserved header row or left content panel (`src/styles.css:77-112`, `src/styles.css:207-240`, `src/styles.css:336-343`).
- The hero uses gradient-only image overlay treatment rather than a separate content panel (`src/styles.css:216-229`, `src/styles.css:790-798`).
- The old split-hero behavior is not present; the hero remains block/full-bleed across breakpoints (`src/styles.css:207-240`, `src/styles.css:708-735`, `src/styles.css:786-815`).
- Locale links meet the visible-control requirements, including 44px minimum height, active underline state, desktop full labels, and mobile short labels (`src/styles.css:132-205`, `src/styles.css:760-773`).
- At `max-width: 980px`, only the section nav hides while the locale switcher and preview CTA remain visible; at `max-width: 760px`, the overlay header and mobile short labels remain in place without horizontal overflow (`src/styles.css:708-735`, `src/styles.css:742-778`; rendered checks at 980px and 390px).
- Ritual cards keep image and text in normal flow without absolute positioning or overlap regressions (`src/styles.css:419-470`; rendered check confirmed static positioning and text below image).

## Task-quality verdict

PASS

The implementation quality is good for the requested scope:

- Changes are focused on the intended composition and CSS boundaries rather than introducing router or data-contract churn.
- Existing locale semantics and safe preference-write behavior are preserved.
- Responsive behavior is coherent at the requested breakpoints.
- Current tests/build remain green after the Task 4 work.
- I did not find downstream visual-contract regressions from the current source or rendered verification.

## Findings

No findings.

## Notes

- Git metadata is unavailable in this review package, so I could not independently diff the whole workspace for out-of-scope file edits. Within the provided review scope, the current implementation matches the Task 4 contract and behaves correctly in source and rendered verification.

## Final verdict

APPROVE
