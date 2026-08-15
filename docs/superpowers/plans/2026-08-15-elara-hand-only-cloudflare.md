# ELARA Hand-Only Photography and Cloudflare Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every face-containing ELARA lifestyle asset with hand-only editorial photography and publish the verified landing page to `https://ring.chiri.space` on the `miyanochiri` Cloudflare account.

**Architecture:** Keep the existing React/Vite UI and Worker SPA fallback unchanged. Integrate five new versioned JPG assets through `src/content.js`, then deploy `dist/server/index.js` with `dist/client` as a Workers Static Assets binding and a Wrangler Custom Domain route.

**Tech Stack:** React 19, Vite 6, Node test runner, built-in ImageGen, Cloudflare Workers Static Assets, Wrangler 4.

## Global Constraints

- Never show a face, head, facial fragment, or reflected face in ELARA lifestyle photography.
- Prefer hands and forearms; keep the champagne-gold ring clearly visible with realistic anatomy.
- Preserve the approved warm-morning layout, palette, typography, copy, hierarchy, interaction behavior, and Sites packaging files.
- Deploy only to the Cloudflare account named `miyanochiri` and bind only `ring.chiri.space`.
- Do not delete or replace an unrelated DNS record, route, Worker, or Pages project.

---

### Task 1: Generate and Integrate Hand-Only Assets

**Files:**
- Create: `public/assets/elara/hero-hands-v2.jpg`
- Create: `public/assets/elara/editorial-hands-v2.jpg`
- Create: `public/assets/elara/ritual-sleep-hands-v2.jpg`
- Create: `public/assets/elara/ritual-energy-hands-v2.jpg`
- Create: `public/assets/elara/ritual-calm-hands-v2.jpg`
- Modify: `src/content.js`
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: existing image slot aspect ratios and `pageContent` image records.
- Produces: five face-free asset URLs consumed by the existing React components.

- [ ] Inspect each source image with `view_image` and label it as an edit target.
- [ ] Issue one built-in ImageGen edit per distinct asset, preserving lighting, material palette, crop purpose, and ring design while removing every face/head.
- [ ] Save each accepted result non-destructively in the five exact `-hands-v2.jpg` paths.
- [ ] Update only the five `src` values and their alt text in `src/content.js`.
- [ ] Confirm `rg -n "hero-morning|editorial-portrait|ritual-(sleep|energy|calm)\.jpg" src` returns no active old asset references.

### Task 2: Browser Visual and Interaction QA

**Files:**
- Modify: `design-qa.md`
- Create: `artifacts/elara-hands-desktop.jpg`
- Create: `artifacts/elara-hands-mobile.jpg`
- Create: `artifacts/elara-hands-comparison.png`

**Interfaces:**
- Consumes: local Vite URL and the five updated asset records.
- Produces: browser evidence and a passing `design-qa.md`.

- [ ] Start or reuse the local Vite server and open it in the in-app browser.
- [ ] Capture the default page at 1440 × 960 and 390 × 844.
- [ ] Check all five revised slots for zero visible faces, natural hands, clear ring placement, correct crops, and no responsive overflow.
- [ ] Re-run header navigation, preview focus, invalid email, success, and reset checks; confirm no ELARA console errors.
- [ ] Put the approved reference and updated browser capture into `artifacts/elara-hands-comparison.png` and inspect them together.
- [ ] Update `design-qa.md` with the new evidence and end it with `final result: passed` only when no P0/P1/P2 findings remain.

### Task 3: Add Cloudflare Worker Deployment Configuration

**Files:**
- Create: `wrangler.jsonc`
- Modify: `package.json`
- Modify: `package-lock.json`
- Test: `tests/sites-worker.test.mjs`

**Interfaces:**
- Consumes: `dist/server/index.js`, `dist/client`, and the existing `ASSETS` worker binding.
- Produces: a Wrangler 4 deployment for Worker `elara-ring-landing` and Custom Domain `ring.chiri.space`.

- [ ] Install `wrangler@latest` as a dev dependency and verify `npx wrangler --version` reports 4.x or later.
- [ ] Add `wrangler.jsonc` with `name`, `main`, current `compatibility_date`, `assets.directory`, `assets.binding`, and `routes: [{ "pattern": "ring.chiri.space", "custom_domain": true }]`.
- [ ] Add `deploy:cloudflare` and `deploy:cloudflare:dry-run` scripts that build first and invoke Wrangler.
- [ ] Run `npm test`, `npm run build`, and `npm run test:sites` in that order.
- [ ] Run `npm run deploy:cloudflare:dry-run` and require a successful asset and Worker bundle report.

### Task 4: Resolve Account, Deploy, and Verify Production

**Files:**
- Modify only if required after readback: `wrangler.jsonc`

**Interfaces:**
- Consumes: authenticated Wrangler account context and the tested production bundle.
- Produces: live `https://ring.chiri.space` serving the ELARA landing page.

- [ ] Run `npx wrangler whoami`; continue only after identifying the account named `miyanochiri`.
- [ ] Use read-only Cloudflare/DNS checks to confirm the `chiri.space` zone is available and `ring.chiri.space` has no incompatible existing record or binding.
- [ ] Run the production deploy in a TTY, selecting `miyanochiri` if Wrangler prompts for an account.
- [ ] Read back the Worker deployment and Custom Domain binding.
- [ ] Verify final HTTPS status, page title, `听见自己的节律`, hero asset response, SPA fallback, and method/API 404 behavior against `https://ring.chiri.space`.
- [ ] Keep the verified local preview open and report the production URL, deployment evidence, and any residual propagation caveat.
