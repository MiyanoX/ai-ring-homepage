# ELARA Transparent Hero Overlay and Ritual Overlap Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the ELARA hero a full-width image with a fully transparent floating header and desktop copy/action overlay, and prevent mobile ritual images from covering text.

**Architecture:** Keep the React markup and image assets unchanged. Correct the layout entirely in `src/styles.css`: make the desktop hero a positioned full-bleed canvas, layer the existing copy and header above it without backgrounds, retain a readable mobile image-then-copy flow, and remove the cyclic `height: 100%` sizing from ritual images.

**Tech Stack:** React 19, Vite 6, CSS, in-app Browser geometry checks, Node test runner, Cloudflare Workers Static Assets.

## Global Constraints

- The hero image fills the entire viewport width.
- The header and desktop hero copy/actions float directly above the image with fully transparent backgrounds.
- Do not add opaque or translucent panels, backdrop blur, gradients, replacement image assets, or new component markup.
- Ritual images remain in normal flow and never cover any title, index, English label, or description.
- Preserve all protected Sites/Worker files and all existing copy, behavior, and face-free image assets.
- Deploy only to the existing `elara-ring-landing` Worker and `ring.chiri.space` after local QA passes.

---

### Task 1: Full-Width Transparent Hero Overlay

**Files:**
- Modify: `src/styles.css:93-284`
- Test: rendered geometry at `http://127.0.0.1:4174/`

**Interfaces:**
- Consumes: existing `.site-header`, `.hero`, `.hero-copy`, `.hero-media`, and `hero-hands-v2.jpg` markup.
- Produces: a full-viewport hero layer with transparent overlaid header and desktop copy.

- [ ] **Step 1: Record the failing rendered contract**

Evaluate the live page and confirm the current failure values:

```js
const header = document.querySelector('.site-header').getBoundingClientRect();
const hero = document.querySelector('.hero').getBoundingClientRect();
const copy = document.querySelector('.hero-copy').getBoundingClientRect();
const media = document.querySelector('.hero-media').getBoundingClientRect();
({ header, hero, copy, media });
```

Expected RED evidence: `header.bottom === hero.top === 82`, `media.left > 0`, and `copy.right === media.left`, proving the elements are separate rows/columns rather than overlays.

- [ ] **Step 2: Implement the minimal desktop overlay CSS**

Update the base rules to this structure:

```css
.site-header {
  position: absolute;
  inset: 0 0 auto;
  z-index: 50;
  background: transparent;
  backdrop-filter: none;
}

.hero {
  position: relative;
  display: grid;
  min-height: 100svh;
  overflow: hidden;
}

.hero-copy {
  position: relative;
  z-index: 2;
  width: min(48vw, 650px);
  min-height: 100svh;
  background: transparent;
}

.hero-media {
  position: absolute;
  inset: 0;
  min-height: 100%;
}
```

Keep the existing typography and padding, and adjust only the hero image `object-position` if the ring or bright left curtain no longer align with the source.

- [ ] **Step 3: Preserve the mobile image-then-copy flow**

Inside `@media (max-width: 760px)`, restore normal-flow copy/media positioning while keeping both backgrounds transparent and the header over the image:

```css
.hero {
  display: flex;
  min-height: auto;
  flex-direction: column;
  overflow: visible;
}

.hero-copy {
  position: relative;
  order: 2;
  width: 100%;
  min-height: 0;
  background: transparent;
}

.hero-media {
  position: relative;
  inset: auto;
  order: 1;
  width: 100%;
  min-height: 58svh;
}
```

- [ ] **Step 4: Verify the desktop contract turns green**

At 1280 × 720, verify:

```js
const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');
const copy = document.querySelector('.hero-copy');
const media = document.querySelector('.hero-media');
const h = header.getBoundingClientRect();
const r = hero.getBoundingClientRect();
const c = copy.getBoundingClientRect();
const m = media.getBoundingClientRect();
({
  headerAndHeroShareTop: h.top === r.top,
  mediaIsFullWidth: m.left === 0 && Math.round(m.right) === innerWidth,
  copyOverlapsMedia: c.left < m.right && c.right > m.left,
  headerBackground: getComputedStyle(header).backgroundColor,
  copyBackground: getComputedStyle(copy).backgroundColor,
});
```

Expected GREEN: all three booleans are `true`, and both background colors are `rgba(0, 0, 0, 0)`.

### Task 2: Ritual Card Normal-Flow Sizing

**Files:**
- Modify: `src/styles.css:275-365`
- Test: rendered geometry at a 390 × 844 viewport.

**Interfaces:**
- Consumes: existing `.ritual` article, direct child image, `.ritual-heading`, and `.ritual-copy` markup.
- Produces: self-contained cards whose measured height includes image and all text.

- [ ] **Step 1: Preserve the failing mobile evidence**

Use the first two ritual cards and verify the current RED condition:

```js
const cards = [...document.querySelectorAll('.ritual')];
const firstHeading = cards[0].querySelector('.ritual-heading').getBoundingClientRect();
const secondImage = cards[1].querySelector(':scope > img').getBoundingClientRect();
({ secondImageStartsBeforeFirstHeadingEnds: secondImage.top < firstHeading.bottom });
```

Expected RED: `true` (observed overlap is approximately 40 pixels).

- [ ] **Step 2: Remove cyclic image height sizing**

Remove `.ritual img` from the shared `height: 100%` image selector and set the direct child image explicitly:

```css
.ritual > img {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  overflow: hidden;
  object-fit: cover;
}
```

- [ ] **Step 3: Verify every card is self-contained**

At 390 × 844, verify all cards:

```js
const cards = [...document.querySelectorAll('.ritual')];
cards.map((card, index) => {
  const rect = card.getBoundingClientRect();
  const image = card.querySelector(':scope > img').getBoundingClientRect();
  const heading = card.querySelector('.ritual-heading').getBoundingClientRect();
  const copy = card.querySelector('.ritual-copy').getBoundingClientRect();
  const next = cards[index + 1]?.getBoundingClientRect();
  return {
    imageBeforeHeading: image.bottom <= heading.top,
    cardContainsCopy: rect.bottom >= copy.bottom,
    nextStartsAfterCard: !next || next.top > rect.bottom,
  };
});
```

Expected GREEN: every boolean is `true`, and `document.documentElement.scrollWidth === innerWidth`.

### Task 3: Visual QA, Regression Tests, and Production Release

**Files:**
- Modify: `design-qa.md`
- Create: `artifacts/elara-transparent-hero-after.jpg`
- Create: `artifacts/elara-ritual-flow-after.jpg`
- Create: `artifacts/elara-transparent-hero-comparison.png`

**Interfaces:**
- Consumes: the verified local UI and existing Cloudflare configuration.
- Produces: passing design evidence and a new `ring.chiri.space` deployment version.

- [ ] **Step 1: Capture desktop and mobile evidence in the in-app Browser**

Capture the 1280 × 720 hero, the 390 × 844 ritual-card boundary, and a mobile full-width/overflow check. Confirm no ELARA console errors.

- [ ] **Step 2: Compare source and implementation together**

Place the source hero crop and revised browser hero in one equal-size side-by-side image at `artifacts/elara-transparent-hero-comparison.png`. Inspect header position, full-width image, copy transparency, text hierarchy, and ring crop in the same input.

- [ ] **Step 3: Update the QA report**

Record the original two P1 findings, root causes, fixes, revised screenshots, geometry results, and final visual result in `design-qa.md`. End with exactly `final result: passed` only if no P0/P1/P2 issue remains.

- [ ] **Step 4: Run project verification**

Run in order:

```bash
npm test
npm run build
npm run test:sites
npm run deploy:cloudflare:dry-run
```

Expected: 4 waitlist tests pass, 4 Sites worker tests pass, Vite emits `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`, and Wrangler dry-run exits successfully.

- [ ] **Step 5: Deploy and verify production**

Run `npm run deploy:cloudflare`, read back the latest deployment version, and verify `https://ring.chiri.space/` returns 200 with the revised bundle and hero asset. Keep the verified local preview open in the in-app browser.
