# ELARA Transparent Hero Overlay and Ritual Overlap Fix

## Goal

Match the approved ELARA reference by turning the first screen into one full-width photographic canvas, with the header and desktop copy/actions floating transparently above it, while eliminating the mobile ritual-card image overlap shown in the supplied screenshot.

## Source of Truth

- Full-page visual target: `references/landing-page/elara-morning-ritual.png`
- Reported overlap evidence: `/tmp/codex-remote-attachments/01a00471-851f-7bd1-b27b-fe5145f2f5a3/527FDFB2-D6B1-421D-BE27-30FD5F58862C/1-Photo-1.jpg`
- Existing face-free hero asset: `public/assets/elara/hero-hands-v2.jpg`

## Confirmed Root Causes

1. `.site-header` is a sticky, 82-pixel normal-flow row. The hero starts below it, so the header cannot float over the hero image.
2. `.hero-copy` and `.hero-media` are separate grid columns. The image therefore begins to the right of the copy instead of filling the viewport behind it.
3. The shared image rule applies `height: 100%` to `.ritual img`. On the mobile grid, this makes each article's measured height exclude its heading and description. The next article begins early and its image covers the previous title.

## Approved Visual Contract

### Desktop Hero

- The hero image fills the entire viewport width and the first-screen height.
- The image remains a real `<img>` with `object-fit: cover`; no replacement gradient, CSS illustration, or background panel is introduced.
- The header is positioned over the hero at the top edge and has a fully transparent background with no blur or opaque/translucent fill.
- The hero copy, description, and buttons occupy the left side as a transparent overlay. They must not have an opaque or translucent backing panel.
- Copy remains readable by using the naturally bright curtain area already present in `hero-hands-v2.jpg`; the image crop is adjusted rather than adding a synthetic overlay.
- The ring and hand remain visible on the right half of the screen.

### Mobile Hero

- The header remains a transparent overlay above the top of the hero image.
- The image stays edge-to-edge and full width.
- The copy can remain below the image for readability at narrow widths, but `.hero-copy` itself remains transparent and no separate panel treatment is introduced.

### Ritual Cards

- Each ritual image keeps a stable square crop with `width: 100%`, `height: auto`, `aspect-ratio: 1`, and `object-fit: cover`.
- Title, index, English label, and description remain in normal flow below their own image.
- Each article's measured box includes all of its text content before the next card starts.

## Scope

- Modify only `src/styles.css` for the production fix.
- Preserve component markup, copy, image assets, navigation behavior, waitlist behavior, and protected Sites/Worker files.
- Record the durable visual rule in `AGENTS.md`.
- Update browser evidence and `design-qa.md` after implementation.

## Verification Contract

Use the rendered page, not source-text assertions.

- Desktop: header and hero both begin at viewport top; hero media spans `left: 0` to the viewport right edge; header and hero-copy computed backgrounds are transparent; copy and media occupy overlapping screen coordinates.
- Mobile: document width equals viewport width; each image ends before its heading begins; the next card begins after the previous card's description; no card image overlaps text.
- Compare the source hero and revised implementation in one side-by-side image.
- Run `npm test`, `npm run build`, and `npm run test:sites`.
- `design-qa.md` may end with `final result: passed` only after no P0/P1/P2 finding remains.

## Deployment

This fix will be deployed to the existing `elara-ring-landing` Worker and `ring.chiri.space` only after local visual QA passes, because the user previously selected that Cloudflare production target for this prototype.
