# ELARA One 中文六区块 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with review checkpoints. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Chinese `/zh/` ELARA One landing page around six purchase-narrative blocks, update the concept price to `¥59,500 起`, and add missing hand-only technology, trust, and Gift imagery without changing English or Japanese pages.

**Architecture:** Keep the existing locale shell and legacy `en`/`ja` component tree. Add a Chinese-only `ChineseLanding` component with a dedicated `landing` content model, local React state for Standard/Design and Gift preview interactions, and `zh-*` CSS names. Extract the existing local-only preview form into a shared component so both legacy and Chinese pages retain the same validation contract.

**Tech Stack:** React 19, Vite 6, plain CSS, Node built-in test runner, existing local raster assets, ImageGen-generated JPG assets.

## Global Constraints

- The Chinese page is the primary redesign surface; keep English and Japanese landing experiences unchanged.
- The Chinese narrative follows six blocks: desire-led hero, ring-first design, quiet technology, daily understanding, credible people and validation, then purchase plus a separate Gift path.
- The technology chapter must use sparse PPG/vibration references and explain that technology adapts to the wearer; it must not become a circuit-board showcase.
- Public copy may show `6 mm`, `US 6+`, titanium inner ring, and `¥59,500 起` as concept/target information; do not publish `世界最细` until claim clearance.
- ELARA photography must show hands or forearms only, with no faces, heads, or reflected faces, and the ring must remain readable.
- The prototype purchase/waitlist and Gift flows remain local-only; no network, payment, order, email, or persistence behavior is added.
- Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact.
- Before handoff, `npm run build` must emit `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

---

### Task 1: Add missing hand-only imagery and Chinese content contract

**Files:**
- Create: `public/assets/elara/technology-hands.jpg`
- Create: `public/assets/elara/trust-prototype-hands.jpg`
- Create: `public/assets/elara/gift-nfc-hands.jpg`
- Modify: `src/content.js`
- Test: `tests/content.test.mjs`

**Interfaces:**
- Produces `pageContentByLocale.zh.landing` with `nav`, `hero`, `design`, `technology`, `daily`, `trust`, `purchase`, and `gift` records.
- Each new image record exposes `{ src, position, alt }` and uses a `/assets/elara/*.jpg` path.
- `purchase.price` is the exact display string `¥59,500 起`; `purchase.priceNote` marks it as a concept/reference price.

- [ ] **Step 1: Generate the missing visual assets**

Use the image generation workflow to create three editorial JPGs:

1. `technology-hands.jpg`: macro hand-and-forearm composition, champagne smart ring clearly visible, subtle deep-plum ambient light, a small abstract sensor glow reflected on the metal, no face/head/body, no readable text, premium Japanese industrial-editorial mood.
2. `trust-prototype-hands.jpg`: two pairs of hands arranging a ring prototype, calipers, a neutral notebook, and a pale sample surface on a worktable, only hands/forearms visible, no faces/reflections, no logos or fabricated credentials.
3. `gift-nfc-hands.jpg`: hands placing the ring and a small cream NFC message card into a warm ivory gift box, ring clearly visible, no face/head/body, no readable text, quiet luxury gift mood.

Save the final assets at the exact paths above and inspect each image before wiring it into content.

- [ ] **Step 2: Add the failing content assertions**

Extend `tests/content.test.mjs` with the following contract checks:

```js
test("provides the complete Chinese six-block landing contract", () => {
  const landing = pageContentByLocale.zh.landing;
  assert.deepEqual(Object.keys(landing), [
    "hero",
    "design",
    "technology",
    "daily",
    "trust",
    "purchase",
    "gift",
  ]);
  assert.equal(landing.purchase.price, "¥59,500 起");
  assert.match(landing.design.specs.map((item) => item.value).join(" "), /6 mm/);
  assert.match(landing.design.specs.map((item) => item.value).join(" "), /US 6\+/);
  assert.ok(landing.gift.nfcTitle);
  for (const image of [
    landing.hero.image,
    landing.technology.image,
    landing.trust.image,
    landing.gift.image,
  ]) {
    assert.match(image.src, /^\/assets\/elara\/.+\.jpg$/);
    assert.ok(image.alt.trim());
  }
});

test("does not add Chinese landing content to English or Japanese records", () => {
  assert.equal("landing" in pageContentByLocale.en, false);
  assert.equal("landing" in pageContentByLocale.ja, false);
});
```

Run: `node --test tests/content.test.mjs`

Expected: the new Chinese contract test fails because `landing` does not exist yet; the existing tests continue to pass.

- [ ] **Step 3: Add the minimal Chinese content model**

Add only a `landing` property to the existing `zh` record. Keep its existing `seo`, `ui`, `nav`, `hero`, `statement`, `rituals`, `insight`, `finishes`, `preview`, and `footer` keys so the current content contract remains valid for legacy components. Use these required values:

```js
landing: {
  nav: [ /* Chinese anchor labels for the six-block page */ ],
  hero: { /* desire copy + HERO_IMAGE */ },
  design: {
    specs: [
      { label: "目标宽度", value: "6 mm" },
      { label: "建议尺码", value: "US 6+" },
      { label: "内圈", value: "钛合金" },
      { label: "佩戴感", value: "日常穿搭不违和" },
    ],
    productLines: ["Standard 素圈", "Design 设计款"],
    price: "¥59,500 起",
    priceNote: "概念参考售价 · 最终规格与价格以量产信息为准",
  },
  technology: { /* core statement + three quiet capability cards + generated image */ },
  daily: { /* stress, cycle, activity, sleep cards + daily note + app image */ },
  trust: { /* three responsibility cards + generated prototype image */ },
  purchase: { /* options, finishes, engraving, price and local-only CTA labels */ },
  gift: { /* NFC message-card path + generated gift image + disclosure copy */ },
}
```

Use source-faithful, non-medical language. Keep `世界最细`, No.1, medical efficacy, clinical accuracy, and invented names out of all rendered strings.

- [ ] **Step 4: Run the content test again**

Run: `node --test tests/content.test.mjs`

Expected: PASS, including the existing three-locale and image-alt checks.

---

### Task 2: Extract the preview form without changing legacy behavior

**Files:**
- Create: `src/PreviewForm.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`
- Test: `tests/waitlist.test.mjs`

**Interfaces:**
- Produces `PreviewForm({ content, inputRef, variant = "default" })`.
- `variant="zh"` adds the `zh-preview` class and uses the existing `content.preview` validation messages; `variant="default"` preserves current markup/classes and English/Japanese visual behavior.

- [ ] **Step 1: Move the current `PreviewForm` function verbatim**

Move the existing form component and its `useEffect`, `useRef`, and `useState` behavior from `src/App.jsx` to `src/PreviewForm.jsx`. Export it by name. Preserve the exact `validateWaitlistEmail` call, local-only timer, error `aria-live`, success `role="status"`, reset behavior, and `content.preview` field names.

- [ ] **Step 2: Add only the variant class**

Set the root class to:

```jsx
className={`preview${variant === "zh" ? " zh-preview" : ""}`}
```

Do not change the default variant's DOM shape or text. Import `PreviewForm` in `src/App.jsx` and delete the old in-file definition.

- [ ] **Step 3: Run existing form tests**

Run: `node --test tests/waitlist.test.mjs`

Expected: PASS with no test changes required; this confirms extraction did not alter the pure validation contract.

---

### Task 3: Build the Chinese six-block component and route branch

**Files:**
- Create: `src/ChineseLanding.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- `ChineseLanding({ content, onPreview, previewInputRef })` owns the Chinese header, six blocks, local product selection, Gift disclosure, local-only preview form, and Chinese footer.
- It renders `main#main-content.zh-page` with exactly one `h1` and section IDs `design`, `technology`, `daily`, `trust`, `buy`, and `preview`.

- [ ] **Step 1: Add the route-level branch before editing legacy markup**

In `App`, preserve the current `Header`, legacy section order, `PreviewForm` default variant, and `Footer` for `en`/`ja`. For `zh`, render only:

```jsx
<ChineseLanding
  content={content}
  onPreview={focusPreview}
  previewInputRef={previewInputRef}
/>
```

The outer `.site-page` and skip link remain shared. Do not modify the locale resolver, canonical links, or alternate-link logic.

- [ ] **Step 2: Implement the transparent Chinese header and hero**

Use a `header.zh-header` over the full-width `hero` image. Include the wordmark, anchor links from `content.landing`, language links, and a `预约体验` action. Hero copy must be transparent over the image, and the image must use the existing hand-only hero asset with the ring visible.

- [ ] **Step 3: Implement the design block**

Render `Standard 素圈` and `Design 设计款` as selectable buttons. Show `6 mm` as the visual lead metric and render all four design spec chips. Use `ring-finishes.jpg` for the ring/finish visual. Mark price/spec content as concept/reference content in visible small copy.

- [ ] **Step 4: Implement the quiet technology block**

Render the core statement, generated `technology-hands.jpg`, and three sparse capability cards for PPG, vibration, and the 6 mm enclosure. Add a CSS ring-stack visual that is decorative but labelled via adjacent text; do not show fabricated circuit diagrams or numeric performance claims.

- [ ] **Step 5: Implement the daily-understanding block**

Render `daily-insight-device.jpg` and four cards for `压力`, `月经 / 身体周期`, `活动`, and `睡眠`. Include one daily note in the content model and use observational language such as `留意`, `理解`, and `趋势`.

- [ ] **Step 6: Implement the trust block**

Render the generated prototype image plus three responsibility cards. The Tokyo University participation must be phrased as role/context, not a blanket endorsement. Include a visible disclosure line for names, credentials, validation results, and final specs that are not public yet.

- [ ] **Step 7: Implement purchase, Gift, and preview actions**

Render the selected product line, finish buttons, engraving state, `¥59,500 起`, and a local-only CTA. Add a Gift disclosure button with `aria-expanded` and `aria-controls`; when opened, show the four-step NFC card path and `gift-nfc-hands.jpg`. Render `<PreviewForm variant="zh" />` after the purchase content so the CTA can scroll to `#preview` and focus the email field.

- [ ] **Step 8: Run a production build for JSX/type smoke**

Run: `npm run build`

Expected: Vite completes and emits the required Sites files. This is a smoke check before CSS refinement; visual verification happens in Task 5.

---

### Task 4: Add scoped responsive visual system

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- All new rules are scoped to `.zh-page`, `.zh-header`, `.zh-preview`, or their descendants.
- Legacy selectors used by English/Japanese remain unchanged except for the extracted form's class interpolation.

- [ ] **Step 1: Add Chinese tokens and base layout**

Add `--zh-ink`, `--zh-cream`, `--zh-plum`, `--zh-lilac`, `--zh-gold`, and `--zh-line` under `:root`. Build sections with warm cream space, sharp editorial type, hairline rules, and no generic card-shadow treatment.

- [ ] **Step 2: Style the hero as a single full-width canvas**

Set `.zh-hero` to position relative with `.zh-hero-media` covering the full viewport; `.zh-header` and `.zh-hero-copy` stay transparent and layer above the image on desktop. On mobile, keep the image first and copy in normal flow; do not use an opaque copy panel.

- [ ] **Step 3: Style the six content blocks**

Use a split editorial layout for design, a dark full-bleed technology chapter, an app-plus-cards daily chapter, a trust grid, and a two-column buy/Gift block. Keep card images in normal flow and ensure titles/indices/descriptions occupy their own measured space.

- [ ] **Step 4: Add interaction and reduced-motion states**

Style selected product buttons, finish buttons, Gift disclosure, CTA hover/focus, and `@media (prefers-reduced-motion: reduce)` to remove transforms/scroll transitions for the new page.

- [ ] **Step 5: Add mobile rules**

At `max-width: 760px`, stack all blocks, preserve 44px minimum touch targets, keep the tech visual visible without horizontal overflow, make the purchase controls full-width, and keep Gift content expanded below its trigger.

---

### Task 5: Browser QA, regression tests, and handoff evidence

**Files:**
- Modify: `design-qa.md`
- Test: `tests/content.test.mjs`, `tests/waitlist.test.mjs`, `tests/sites-worker.test.mjs`

- [ ] **Step 1: Run unit and packaging tests**

Run:

```bash
npm test
npm run build
npm run test:sites
```

Expected: all tests pass; `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json` exist after build.

- [ ] **Step 2: Start the local server and open the preview**

Run the project dev server from the workspace and open the local preview in the available browser. Use the browser at desktop width around 1440px and mobile width 390px.

- [ ] **Step 3: Verify the Chinese desktop experience**

Check `/zh/` for: transparent header over one full-width Hero, six block order, readable ring, `6 mm`, `US 6+`, `钛合金`, `¥59,500 起`, technology statement, four daily cards, trust disclosure, Standard/Design selection, finishes, engraving, Gift disclosure, and NFC card path.

- [ ] **Step 4: Verify mobile geometry and interactions**

Check no horizontal overflow; hero image/copy do not overlap; tech and Gift sections remain readable; product selection updates visible state; Gift disclosure opens and closes; header CTA scrolls to `#preview` and focuses the email input; form error/success/reset remain local-only.

- [ ] **Step 5: Verify non-Chinese regressions**

Open `/en/` and `/ja/` and confirm the legacy page still renders, the locale switcher works, the old nav anchors work, and the default preview form retains its existing appearance and behavior.

- [ ] **Step 6: Update `design-qa.md` with evidence**

Record the tested viewport sizes, generated asset paths, section geometry, interaction states, build/test results, and any remaining P3 polish only. Do not write `final result: passed` if a P0/P1/P2 issue remains.

## Plan self-review

- The price change is covered in content assertions, the component contract, visible purchase UI, and browser checks.
- Missing technology, trust, and Gift visuals are covered by an explicit asset-generation step and exact paths.
- English/Japanese isolation is covered by the route branch, content test, scoped CSS requirement, and browser regression check.
- Claims boundaries are repeated in content, component instructions, and QA checks; `世界最细` is never a rendered string.
- Sites-protected files are explicitly excluded and validated by the existing packaging test.
- No placeholder steps remain; the workspace has no `.git` metadata, so commit commands are intentionally omitted from this plan.
