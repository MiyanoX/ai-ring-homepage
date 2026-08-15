# Task 6 brief — browser and visual QA

## Goal

Run the final browser-rendered acceptance pass for the approved ELARA trilingual implementation and record fresh visual QA evidence.

## Scope

- Inspect the provided source visual target and the current rendered implementation.
- Verify `/en/`, `/zh/`, and `/ja/` routes, localized metadata, active language state, and the root/unsupported-route fallback behavior.
- Verify the language switcher preserves the `#rituals` anchor.
- Verify localized invalid-email, success, and reset states without network submission.
- Verify desktop full-width transparent hero composition and 390 × 844 mobile layout.
- Verify ritual card images stay in normal flow and do not cover index, title, English label, or description.
- Check browser console errors and required build/test artifacts.

## Evidence already captured by the controller

- `artifacts/browser-en-desktop-1280x720.png`
- `artifacts/browser-ja-mobile-390x844.png`
- `artifacts/elara-transparent-hero-comparison.png` (source and implementation combined comparison)
- Source visual truth: `references/landing-page/elara-morning-ritual.png`

## Constraints

- Do not change application code unless a P0/P1/P2 finding is confirmed.
- Preserve the approved full-width transparent hero and normal-flow ritual-card contracts.
- Keep Sites handoff files intact.

## Required outputs

- Update project-root `design-qa.md` with the fresh evidence, comparison history, required fidelity-surface review, interaction checks, console result, and exact final result (`passed` or `blocked`).
- Write a concise implementation report listing checks, findings, files changed, and any residual P3 polish.
