# ELARA Multilingual P1 Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the English and Simplified Chinese Homepage routes render the same localized P1 Base Ring purchase-validation experience already used by Japanese.

**Architecture:** Keep one `pageContentByLocale[locale].p1` contract per supported locale and make the existing P1 renderer locale-agnostic. The App will send every supported locale through that renderer, while localized content owns all visible copy, accessibility labels, and state text. The legacy Chinese six-block route and its stale primary content will be removed from the reachable application path.

**Tech Stack:** React 19, Vite 6, JavaScript ES modules, Node built-in test runner, Vite preview, tracked Sites build artifacts.

**Spec:** GitHub Issue #17 — `feat: 英文与中文 Homepage 对齐日文 P1 Base Ring 最新版`

## Global Constraints

- All three locales use the P1 product contract: `6.0 mm` target width, Titanium inner ring / 钛内圈 / チタン内リング, `¥34,800（税込）` concept price, US 5–12, five equal-price finishes, First Edition free inner engraving, and sizing after Sizing Kit.
- The page remains local-only: no email, selected finish, engraving, payment, order, reservation, or analytics data is sent or persisted.
- Pending deposit, refund, delivery, operator, health-feature, engraving, and final-spec details remain visibly marked as concept/pending.
- Do not add world-thinnest, No.1, clinical, medical-effect, certification, or whole-ring-titanium claims.
- Preserve `/en/`, `/zh/`, `/ja/`, hash preservation, locale switching, `html[lang]`, title/description, canonical, alternate hreflang, and x-default behavior.
- Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact.
- Build output must include `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

---

### Task 1: Establish the P1 multilingual regression contract

**Files:**
- Modify: `tests/content.test.mjs`
- Create: `tests/p1-page.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: the current `pageContentByLocale` records and `App.jsx` source.
- Produces: failing tests that require every locale to expose the same P1 content shape and route through one shared renderer.

- [x] **Step 1: Replace the locale-specific content expectations**

Update `tests/content.test.mjs` so the supported locales all require `p1`, test `p1.nav` anchors and indices across locales, and assert the shared facts (price, width, inner-ring wording, US 5–12, five finish IDs, pending deposit/delivery, and local-only copy) for `en`, `zh`, and `ja`. Remove assertions that make the old Chinese `landing` contract mandatory.

- [x] **Step 2: Add the shared page-source regression test**

Create `tests/p1-page.test.mjs` that reads `src/App.jsx` and `src/JapaneseP1Landing.jsx`, then asserts that App imports and renders `P1Landing`, all supported locales reach that renderer, the seven P1 section IDs exist, `PreviewForm` uses the generic `p1` variant, and the renderer contains no hard-coded Japanese visible labels.

- [x] **Step 3: Run the focused tests and verify RED**

Run:

```bash
node --test tests/content.test.mjs tests/p1-page.test.mjs
```

Expected result: the current implementation fails because `en` and `zh` do not expose `p1`, App still has separate legacy branches, and the renderer still contains Japanese-only labels.

- [x] **Step 4: Register the new test file**

Replace `tests/japanese-page.test.mjs` with `tests/p1-page.test.mjs` in the `npm test` script so the full suite executes the shared P1 page contract.

### Task 2: Add localized P1 content for English and Simplified Chinese

**Files:**
- Modify: `src/content.js`
- Test: `tests/content.test.mjs`

**Interfaces:**
- Consumes: the Japanese P1 content contract and the existing shared image constants.
- Produces: `pageContentByLocale.en.p1`, `pageContentByLocale.zh.p1`, and localized nested labels in `pageContentByLocale.ja.p1`.

- [x] **Step 1: Add the English P1 record**

Add English `p1` content with the same nav anchors, section order, facts, five finish IDs, Sizing Kit/risk boundaries, FAQ, purchase summary, and local-only disclosure as Japanese. Translate every visible string, alt text, Hero fact label, risk flag label, and engraving status prefix/suffix into English.

- [x] **Step 2: Add the Simplified Chinese P1 record**

Add Simplified Chinese `p1` content with the same product facts and interaction contract. Use concise natural Chinese for the Hero, proof, quiet technology, First Edition, finish selection, sizing/delivery, specs/FAQ, purchase summary, alt text, ARIA labels, and engraving state. Keep all pending/概念 boundaries visible.

- [x] **Step 3: Move Japanese-only renderer labels into the Japanese contract**

Add the localized Hero fact labels, risk flag labels, and engraving status strings to `pageContentByLocale.ja.p1` without changing its P1 facts or section structure.

- [x] **Step 4: Remove stale Chinese primary content**

Delete the unused `zh.landing` record so the old `¥59,500 起`, Standard/Design, and Gift primary path cannot be selected or rendered by the application.

- [x] **Step 5: Run the content contract and verify GREEN**

Run:

```bash
node --test tests/content.test.mjs
```

Expected result: all locale content assertions pass, including localized non-empty strings and shared image-source checks.

### Task 3: Generalize the shared P1 renderer and route all locales

**Files:**
- Modify: `src/JapaneseP1Landing.jsx`
- Modify: `src/App.jsx`
- Modify: `src/PreviewForm.jsx`
- Modify: `src/styles.css`
- Delete: `src/ChineseLanding.jsx`
- Test: `tests/p1-page.test.mjs`

**Interfaces:**
- Consumes: the three locale `p1` records from Task 2.
- Produces: one exported `P1Landing` component that renders every supported locale with identical structure and localized labels.

- [x] **Step 1: Rename the exported renderer without changing the layout**

Change the existing exported function to `P1Landing`, keep the current P1 section/component anatomy and CSS classes, and remove the Japanese-specific export name from the application path.

- [x] **Step 2: Replace hard-coded Japanese UI strings with content fields**

Read Hero fact labels from `p1.hero.factLabels`, risk labels from `p1.risk.flagLabels`, and engraving status from `p1.purchase.engravingStatus`. Keep stable symbols, event names, IDs, and component class names unchanged.

- [x] **Step 3: Route every supported locale to P1**

Update `src/App.jsx` to import `P1Landing` and render it for `en`, `zh`, and `ja`. Remove the legacy English component tree and the `ChineseLanding` import/path. Keep metadata effects, locale storage, hash state, and focus behavior intact.

- [x] **Step 4: Generalize the PreviewForm variant**

Change the P1 styling condition and call site from `ja-p1` to `p1`; do not alter local validation, timeout, reset focus, or no-network behavior.

- [x] **Step 5: Remove the unreachable Chinese renderer**

Delete `src/ChineseLanding.jsx` after App no longer imports it. Keep the shared assets and protected worker/Sites files untouched.

- [x] **Step 6: Run the page tests and verify GREEN**

Run:

```bash
node --test tests/p1-page.test.mjs
```

Expected result: App has one P1 route, the shared renderer exposes all seven IDs, no Japanese visible strings remain in the renderer, and the generic preview variant is present.

### Task 4: Full automated verification and Sites build

**Files:**
- Generated: `dist/client/index.html`, `dist/client/assets/index-*.js`, `dist/client/assets/index-*.css`, `dist/server/index.js`, `dist/.openai/hosting.json`
- Test: all existing tests

**Interfaces:**
- Consumes: the completed shared renderer and content contract.
- Produces: fresh local test/build evidence with no production deployment.

- [x] **Step 1: Run the full test suite**

Run `npm test`; record the exact passing test count and any failure output.

- [x] **Step 2: Validate source syntax through the production build**

Run `node --check src/content.js`; the JSX sources are syntax-checked by the successful Vite production transform in `npm run build` because Node's `--check` does not parse JSX modules.

- [x] **Step 3: Build the application**

Run `npm run build`; verify all three Sites handoff files exist and inspect `git status` for generated output changes.

- [x] **Step 4: Run the Sites contract tests**

Run `npm run test:sites`; record the exact passing count.

- [x] **Step 5: Check patch hygiene**

Run `git diff --check` and confirm protected files are unchanged except for expected build output references.

### Task 5: Browser QA for all locales and Issue closeout evidence

**Files:**
- Modify: `design-qa.md`
- Replace: `artifacts/qa-en-desktop-1440x960.png`, `artifacts/qa-en-mobile-390x844.png`, `artifacts/qa-zh-desktop-1440x960.png`, `artifacts/qa-zh-mobile-390x844.png`, `artifacts/qa-ja-desktop-1440x960.png`, `artifacts/qa-ja-mobile-390x844.png`
- Test: local Vite preview in the in-app browser

**Interfaces:**
- Consumes: the built app and localized route metadata.
- Produces: desktop/mobile screenshots and an evidence-backed Issue update; no production deploy.

- [x] **Step 1: Start the local preview and inspect each route**

Use the local preview at `http://127.0.0.1:5173/` and inspect `/en/`, `/zh/`, and `/ja/` at 1440×960 and 390×844. Confirm the full-width hero, transparent floating header/copy, readable ring, same P1 section order, and no console error/warn entries.

- [x] **Step 2: Exercise shared interactions**

For each locale, exercise Hero/header CTA focus, finish selection, engraving input, first FAQ expansion, invalid/valid/reset PreviewForm states, locale switching with a preserved hash, and the mobile Sticky CTA. Confirm no network request or persisted selection is created.

- [x] **Step 3: Capture and review screenshots**

Replace all three locale desktop/mobile QA captures, visually inspect them, and confirm `document.scrollWidth` equals viewport width at 390 px with no actionable text clipping; the fixed sticky CTA remains within its intentional bottom overlay.

- [x] **Step 4: Update the QA record**

Update `design-qa.md` so the current verification section states that all three locales use the shared P1 page and removes claims that English/Chinese retain the legacy compositions.

- [x] **Step 5: Re-run verification after documentation/build updates**

Run `npm test`, `npm run build`, `npm run test:sites`, and `git diff --check` again after the final source/docs/artifact changes.

- [x] **Step 6: Write the final Issue #17 update**

Record changed paths, test/build/Sites/browser evidence, commit and PR status, deployment as not executed, and remaining product/legal/local-only risks. Ask the user once whether to perform the complete release closeout (merge main, commit/push, branch cleanup, deploy).
