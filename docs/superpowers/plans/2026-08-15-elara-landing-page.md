# ELARA One Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, interactive ELARA One concept landing page that faithfully recreates the selected warm editorial reference.

**Architecture:** Start from the bundled React/Vite Product Design prototype. Keep page copy and asset metadata separate from composition, and keep waitlist behavior in a pure module so the conversion path can be developed test-first. Use generated raster assets for every photographic surface and browser-based design QA for visual fidelity.

**Tech Stack:** React 19, Vite 6, JavaScript modules, CSS, Node built-in test runner

## Global Constraints

- Selected visual target: `references/landing-page/elara-morning-ritual.png`.
- Brand and product strings are `ELARA` and `ELARA One`.
- Main line is `听见自己的节律`; supporting English line is `Know your rhythm.`.
- Do not claim diagnosis, treatment, clinical accuracy, regulatory approval, awards, sales, testimonials, exact specifications, price, or launch date.
- The preview submission is local-only and must never imply that data was sent to a real service.
- Do not use the reference image as a page background or crop its embedded imagery into production assets.
- Do not use handcrafted SVG, CSS art, emoji, or placeholder boxes for visible assets.
- All page images live under `public/assets/elara/` and include descriptive alternative text.
- Mobile touch targets are at least 44px and the page must not scroll horizontally.

---

### Task 1: Bootstrap the prototype and establish the waitlist contract

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `vite.config.mjs`
- Create: `src/App.jsx`
- Create: `src/main.jsx`
- Create: `src/styles.css`
- Create: `src/lib/waitlist.js`
- Create: `tests/waitlist.test.mjs`
- Preserve: `references/landing-page/elara-morning-ritual.png`

**Interfaces:**
- Produces: `validateWaitlistEmail(value: unknown): { valid: boolean, email: string, message: string }`
- Produces: `createPreviewConfirmation(email: string): { email: string, message: string }`

- [ ] **Step 1: Bootstrap the bundled web prototype into the workspace and install dependencies**

Run the Product Design bootstrap script against an empty staging directory, copy its files into the workspace without changing `references/`, then run:

```bash
npm install --prefer-offline --no-audit --no-fund
```

- [ ] **Step 2: Add a failing waitlist behavior test**

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  createPreviewConfirmation,
  validateWaitlistEmail,
} from "../src/lib/waitlist.js";

test("rejects an empty preview email with an actionable message", () => {
  assert.deepEqual(validateWaitlistEmail("   "), {
    valid: false,
    email: "",
    message: "请输入邮箱地址。",
  });
});

test("normalizes a plausible preview email", () => {
  assert.deepEqual(validateWaitlistEmail("  HELLO@EXAMPLE.COM "), {
    valid: true,
    email: "hello@example.com",
    message: "",
  });
});

test("creates an explicitly local preview confirmation", () => {
  assert.deepEqual(createPreviewConfirmation("hello@example.com"), {
    email: "hello@example.com",
    message: "已记录在当前预览中。ELARA 正式开放体验时，我们会在接入真实服务后再邀请你确认。",
  });
});
```

- [ ] **Step 3: Run the test and verify RED**

Run: `node --test tests/waitlist.test.mjs`

Expected: FAIL because `src/lib/waitlist.js` does not exist.

- [ ] **Step 4: Implement the minimal pure behavior**

```js
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateWaitlistEmail(value) {
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (!email) return { valid: false, email, message: "请输入邮箱地址。" };
  if (!EMAIL_PATTERN.test(email)) {
    return { valid: false, email, message: "请输入有效的邮箱地址。" };
  }
  return { valid: true, email, message: "" };
}

export function createPreviewConfirmation(email) {
  return {
    email,
    message: "已记录在当前预览中。ELARA 正式开放体验时，我们会在接入真实服务后再邀请你确认。",
  };
}
```

- [ ] **Step 5: Run the waitlist tests and verify GREEN**

Run: `node --test tests/waitlist.test.mjs`

Expected: 3 tests pass.

### Task 2: Generate and install the photographic asset set

**Files:**
- Create: `public/assets/elara/hero-morning.png`
- Create: `public/assets/elara/editorial-portrait.png`
- Create: `public/assets/elara/ritual-sleep.png`
- Create: `public/assets/elara/ritual-energy.png`
- Create: `public/assets/elara/ritual-calm.png`
- Create: `public/assets/elara/daily-insight-device.png`
- Create: `public/assets/elara/ring-finishes.png`
- Create: `src/content.js`

**Interfaces:**
- Produces: `pageContent` with `nav`, `hero`, `rituals`, `insight`, `finishes`, `preview`, and `footer` records.
- Produces: image records with `src`, `alt`, and `position` fields.

- [ ] **Step 1: Generate each raster asset independently from the selected reference's art direction**

Use warm morning light, natural East Asian female subjects, linen/silk/stone textures, realistic champagne-titanium ring proportions, and no embedded brand text or watermark.

- [ ] **Step 2: Inspect each image for subject, crop, material realism, unwanted text, and visual consistency**

Reject assets with malformed hands, wrong ring placement, generic gadget styling, unrelated jewelry, or inconsistent lighting.

- [ ] **Step 3: Save approved assets under stable project paths and define `pageContent`**

```js
export const pageContent = {
  hero: {
    eyebrow: "ELARA One",
    title: "听见自己的节律",
    englishTitle: "Know your rhythm.",
    primaryAction: "预约私享体验",
    secondaryAction: "探索 ELARA One",
    image: {
      src: "/assets/elara/hero-morning.png",
      alt: "晨光中佩戴香槟金 ELARA One 指环的女性",
      position: "72% 45%",
    },
  },
};
```

- [ ] **Step 4: Run `file public/assets/elara/*` and confirm every expected asset is a valid raster image**

Expected: seven readable PNG files with non-zero dimensions.

### Task 3: Build the editorial page and conversion journey

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/styles.css`
- Modify: `src/content.js`
- Modify: `package.json`

**Interfaces:**
- Consumes: `pageContent`, `validateWaitlistEmail`, and `createPreviewConfirmation`.
- Produces: semantic single-page UI with anchor navigation and a functional local-only preview form.

- [ ] **Step 1: Compose semantic page sections in `App.jsx`**

Create `Header`, `Hero`, `EditorialStatement`, `Rituals`, `DailyInsight`, `Finishes`, `PreviewForm`, and `Footer` components. Keep all copy and asset paths in `content.js`.

- [ ] **Step 2: Wire the preview form to the tested behavior**

On submit, call `validateWaitlistEmail`. Render the returned error in a live region, or call `createPreviewConfirmation` and replace the input row with a visible local-preview confirmation. Add a reset action so the success state is reversible.

- [ ] **Step 3: Implement the selected visual system in `styles.css`**

Define exact tokens for porcelain, cocoa, plum, champagne, and hairline borders. Use a 12-column desktop grid, large editorial heading scale, square controls, image focal-position variables, and responsive single-column layouts below 760px.

- [ ] **Step 4: Add interaction and accessibility states**

Implement a skip link, focus-visible outlines, 44px controls, smooth scrolling guarded by reduced-motion preferences, labelled email input, disabled submit state during the local transition, and live regions for errors and success.

- [ ] **Step 5: Add test and build scripts**

```json
{
  "scripts": {
    "test": "node --test tests/waitlist.test.mjs",
    "test:sites": "node --test tests/sites-worker.test.mjs"
  }
}
```

- [ ] **Step 6: Run automated verification**

Run: `npm test && npm run build && npm run test:sites`

Expected: all tests pass and the build exits 0 with Sites artifacts under `dist/`.

### Task 4: Browser verification and design QA

**Files:**
- Create: `design-qa.md`
- Create: `artifacts/elara-desktop.png`
- Create: `artifacts/elara-mobile.png`
- Modify: `src/App.jsx` and `src/styles.css` only when QA finds actionable differences

**Interfaces:**
- Consumes: selected reference and rendered implementation screenshots.
- Produces: a blocking QA report ending in `final result: passed`.

- [ ] **Step 1: Start the local Vite preview on the Product Design verification port**

Run: `npm run dev -- --host 0.0.0.0 --port 4173 --strictPort`

- [ ] **Step 2: Inspect the rendered page in the in-app browser**

Verify navigation, both hero actions, email error, successful local preview state, reset behavior, keyboard focus, and console output.

- [ ] **Step 3: Capture desktop and mobile screenshots**

Use a 1440px desktop viewport for reference comparison and a 390px mobile viewport for overflow and hierarchy checks.

- [ ] **Step 4: Compare the selected reference and desktop capture in one visual input**

Evaluate typography, spacing and layout rhythm, colors and tokens, image quality, and copy. Record P0–P3 findings in `design-qa.md`.

- [ ] **Step 5: Fix all P0/P1/P2 findings and repeat the comparison**

Do not stop after capture alone. Repeat until the report records each earlier fix and ends with `final result: passed`.

- [ ] **Step 6: Run the final verification suite again**

Run: `npm test && npm run build && npm run test:sites`

Expected: all commands exit 0 after the final visual fixes.
