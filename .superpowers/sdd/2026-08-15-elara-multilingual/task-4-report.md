# Task 4 Report — visible language switcher + full-width hero contract

Date: 2026-08-15

## Scope

Implemented only the Task 4 UI changes in:

- `src/App.jsx`
- `src/styles.css`

No content data, locale utilities, tests, assets, worker files, scripts, or hosting files were modified.

## Baseline verification

Command:

```bash
npm test
```

Result:

- PASS — 15 tests passed, 0 failed

## Implementation summary

- Wrapped `Header` and `Hero` in a shared `.hero-stage` container so the header floats over the hero image.
- Split the header into three regions: wordmark, center section nav, and right-side tools.
- Added the visible three-link locale switcher using the existing locale link contract, preserved `aria-current="page"`, localized `aria-label`s, hash-preserving hrefs, and safe locale preference writes.
- Removed the old combined nav/language layout.
- Updated hero layout so the image stays full-bleed with transparent overlay header/copy rather than a reserved panel.
- Added gradient-only legibility treatment over the hero image.
- Kept ritual media/text in normal flow and preserved non-absolute layout for ritual cards.
- Added responsive locale label behavior: full labels on desktop, short labels on mobile.
- Preserved mobile header overlay while keeping locale switcher and preview CTA visible when the section nav hides.

## Final verification

Commands:

```bash
npm test
npm run build
```

Results:

- `npm test`: PASS — 15 tests passed, 0 failed
- `npm run build`: PASS — Vite production build succeeded and `scripts/prepare-sites-build.mjs` prepared `dist/server/index.js` and `dist/.openai/hosting.json`

## Responsive / overlay self-review

Local preview reviewed at `http://127.0.0.1:4173/` after implementation.

- Desktop (1440px):
  - Header overlays the hero image with a transparent background.
  - Center section nav remains visible.
  - Locale switcher and preview CTA sit in the right-side tools group.
  - Hero copy overlays the image on the left without an opaque/translucent content panel.
- 980px breakpoint:
  - Section nav hides.
  - Locale switcher remains visible.
  - Preview CTA remains visible.
  - No horizontal overflow (`scrollWidth === innerWidth`).
- Mobile (390px):
  - Header remains over the hero image.
  - Locale switcher shows short labels (`EN`, `中`, `日`).
  - Preview CTA remains visible.
  - Hero stays full-width and full-height with copy over the image.
  - No horizontal overflow (`scrollWidth === innerWidth`).
- Ritual section:
  - Ritual card `img`, `.ritual-heading`, and `.ritual-copy` all remained `position: static`.
  - Visual review and DOM metrics both showed the ritual text staying below the image instead of overlapping it.

## Changed files

- `src/App.jsx`
- `src/styles.css`

## Concerns

- Mobile hero subtitle/description contrast is acceptable but slightly softer than desktop because the copy sits directly on the image; if you want, this can be tuned further with a lighter mobile gradient without changing the overall layout contract.
