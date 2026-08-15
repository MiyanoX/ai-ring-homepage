# ELARA One Multilingual Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add production-shaped Chinese, Japanese, and English page variants to the ELARA One landing-page prototype with stable locale URLs, a visible language switcher, localized metadata, and verified responsive behavior.

**Architecture:** Keep the existing Vite + React single-page composition and move every visible, state, accessibility, and image-alt string into a locale-keyed content map. Add a small pure locale utility for path parsing, path generation, browser-language mapping, and safe preference storage; use explicit locale paths as the source of truth and let the Worker continue serving the SPA shell for HTML routes. Update document metadata from the active locale at runtime while preserving the existing Sites packaging contract.

**Tech Stack:** React 19, Vite 6, JavaScript ES modules, CSS, Node built-in test runner, Cloudflare Worker asset fallback.

## Global Constraints

- Support exactly `en`, `zh`, and `ja`; default locale is `en`.
- Use stable locale paths `/en/`, `/zh/`, and `/ja/`; preserve the current hash during language changes.
- Treat explicit locale paths as authoritative; use `localStorage` key `elara-locale` and browser language only to resolve the root path.
- Do not use IP-based forced redirects.
- Keep page UI and locale logic in `src/`; `index.html` may only receive the default English baseline metadata update.
- Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact in responsibility and behavior.
- Keep the local-only waitlist flow local-only; do not add network submission or persistence.
- Preserve ELARA brand, product positioning, existing photography, editorial layout, concept-safe claims, and no-face photography direction.
- The ELARA hero uses one full-width image; the header and desktop hero copy/action group float directly above that image with fully transparent backgrounds. Do not reserve a separate header row or opaque/translucent left panel.
- Ritual-card images remain in normal flow and must never cover the card index, title, English label, or description.
- Every locale must have the same content shape, section ids, navigation hrefs, and image sources.
- Maintain 44px minimum interactive targets and no horizontal overflow at a 390px viewport.
- The current checkout has no usable Git metadata; do not initialize a repository or run commit/reset operations as part of this work.

---

### Task 1: Add the pure locale URL and preference module

**Files:**
- Create: `src/i18n/locale.js`
- Create: `tests/locale.test.mjs`
- Modify: `package.json:8-15` to include the new unit test in `npm test`

**Interfaces:**
- Produces `SUPPORTED_LOCALES: readonly string[]`, `DEFAULT_LOCALE: "en"`, and `LOCALE_STORAGE_KEY: "elara-locale"`.
- Produces `isSupportedLocale(value): boolean`.
- Produces `getLocaleFromPath(pathname): "en" | "zh" | "ja" | null`.
- Produces `getLocaleFromBrowserLanguage(language): "en" | "zh" | "ja"`.
- Produces `buildLocalePath(locale, hash = ""): string`.
- Produces `readStoredLocale(storage): "en" | "zh" | "ja" | null` and `writeStoredLocale(storage, locale): boolean`.
- Produces `resolveInitialLocale({ pathname, storage, browserLanguage }): "en" | "zh" | "ja"`.

- [ ] **Step 1: Write the failing locale behavior tests**

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  buildLocalePath,
  getLocaleFromBrowserLanguage,
  getLocaleFromPath,
  readStoredLocale,
  resolveInitialLocale,
  writeStoredLocale,
} from "../src/i18n/locale.js";

test("reads supported locales from the first URL path segment", () => {
  assert.equal(getLocaleFromPath("/zh/"), "zh");
  assert.equal(getLocaleFromPath("/ja/#rituals"), "ja");
  assert.equal(getLocaleFromPath("/en/insight"), "en");
  assert.equal(getLocaleFromPath("/"), null);
  assert.equal(getLocaleFromPath("/fr/"), null);
});

test("builds locale paths while preserving the current hash", () => {
  assert.equal(buildLocalePath("ja", "#rituals"), "/ja/#rituals");
  assert.equal(buildLocalePath("zh", "rituals"), "/zh/#rituals");
  assert.equal(buildLocalePath("fr", ""), "/en/");
});

test("maps browser language families to the supported locales", () => {
  assert.equal(getLocaleFromBrowserLanguage("zh-CN"), "zh");
  assert.equal(getLocaleFromBrowserLanguage("ja-JP"), "ja");
  assert.equal(getLocaleFromBrowserLanguage("de-DE"), "en");
});

test("uses an explicit path before stored and browser preferences", () => {
  const storage = new Map([["elara-locale", "zh"]]);
  const adapter = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  };

  assert.equal(
    resolveInitialLocale({
      pathname: "/ja/",
      storage: adapter,
      browserLanguage: "en-US",
    }),
    "ja",
  );
  assert.equal(
    resolveInitialLocale({ pathname: "/", storage: adapter, browserLanguage: "ja-JP" }),
    "zh",
  );
});

test("falls back safely when storage is unavailable", () => {
  const brokenStorage = {
    getItem() {
      throw new Error("storage unavailable");
    },
    setItem() {
      throw new Error("storage unavailable");
    },
  };

  assert.equal(readStoredLocale(brokenStorage), null);
  assert.equal(writeStoredLocale(brokenStorage, "ja"), false);
  assert.equal(
    resolveInitialLocale({ pathname: "/", storage: brokenStorage, browserLanguage: "ja-JP" }),
    "ja",
  );
});
```

- [ ] **Step 2: Run the locale tests and verify the feature is missing**

Run: `node --test tests/locale.test.mjs`

Expected: FAIL because `src/i18n/locale.js` does not exist yet. Confirm the failure is caused by the missing locale module, not by a test syntax error.

- [ ] **Step 3: Implement the minimal pure locale module**

Implement the exported functions with no browser globals. `getLocaleFromPath` must parse only the first non-empty path segment; `buildLocalePath` must normalize invalid locales to `/en/` and normalize a hash to either an empty string or a `#`-prefixed value. Storage helpers must catch both read and write exceptions and return `null`/`false`. `resolveInitialLocale` must use this order: explicit supported path, valid stored locale, browser-language mapping, English default.

- [ ] **Step 4: Run the locale tests and verify they pass**

Run: `node --test tests/locale.test.mjs`

Expected: 5 tests pass with zero failures.

- [ ] **Step 5: Add the locale test to the project test command**

Change the existing `test` script from the single waitlist file to the two currently existing unit files:

```json
"test": "node --test tests/waitlist.test.mjs tests/locale.test.mjs"
```

Do not change `test:sites`.

---

### Task 2: Convert the page content into a complete three-locale contract

**Files:**
- Modify: `src/content.js`
- Create: `tests/content.test.mjs`
- Modify: `package.json:8-15` to add `tests/content.test.mjs` to the `test` script

**Interfaces:**
- Produces `pageContentByLocale.en`, `pageContentByLocale.zh`, and `pageContentByLocale.ja`.
- Each locale produces `seo`, `ui`, `nav`, `hero`, `statement`, `rituals`, `insight`, `finishes`, `preview`, and `footer`.
- `rituals` produces `{ eyebrow, title, items }`, where `items` has the existing three `{ index, title, englishTitle, copy, image }` entries.
- `seo` produces `{ htmlLang, title, description, hreflang }`.
- `ui` produces the cross-component labels and state strings: `skipToContent`, `homeAriaLabel`, `primaryNavLabel`, `previewAriaLabel`, `languageLabel`, `localeOptions`, `headerPreviewAction`, `previewSuccessLabel`, and `localPreviewNote`.

- [ ] **Step 1: Write the failing content contract tests**

```js
import assert from "node:assert/strict";
import test from "node:test";
import { pageContentByLocale } from "../src/content.js";

const LOCALES = ["en", "zh", "ja"];
const REQUIRED_KEYS = [
  "seo",
  "ui",
  "nav",
  "hero",
  "statement",
  "rituals",
  "insight",
  "finishes",
  "preview",
  "footer",
];

function collectStrings(value, path = "content") {
  if (typeof value === "string") return [{ path, value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => collectStrings(item, `${path}[${index}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => collectStrings(child, `${path}.${key}`));
  }
  return [];
}

test("exposes exactly the three supported locale records", () => {
  assert.deepEqual(Object.keys(pageContentByLocale).sort(), LOCALES);
  for (const locale of LOCALES) {
    assert.deepEqual(Object.keys(pageContentByLocale[locale]).sort(), REQUIRED_KEYS.sort());
  }
});

test("keeps navigation and section anchors identical across locales", () => {
  const first = pageContentByLocale.en;
  for (const locale of LOCALES.slice(1)) {
    assert.deepEqual(pageContentByLocale[locale].nav.map((item) => item.href), first.nav.map((item) => item.href));
    assert.deepEqual(
      pageContentByLocale[locale].rituals.items.map((item) => item.index),
      first.rituals.items.map((item) => item.index),
    );
  }
});

test("keeps the same image sources while translating alternative text", () => {
  const imagePaths = (content) => [
    content.hero.image,
    content.statement.image,
    ...content.rituals.items.map((item) => item.image),
    content.insight.image,
    content.finishes.image,
  ];
  const englishImages = imagePaths(pageContentByLocale.en);
  for (const locale of LOCALES) {
    assert.deepEqual(imagePaths(pageContentByLocale[locale]).map((image) => image.src), englishImages.map((image) => image.src));
    for (const image of imagePaths(pageContentByLocale[locale])) {
      assert.ok(image.alt.trim(), `${locale} image alt text must not be empty`);
    }
  }
});

test("does not contain empty localized strings", () => {
  for (const locale of LOCALES) {
    for (const { path, value } of collectStrings(pageContentByLocale[locale], locale)) {
      assert.ok(value.trim(), `${path} must not be empty`);
    }
  }
});
```

- [ ] **Step 2: Run the content contract and verify it fails for the single-locale source**

Run: `node --test tests/content.test.mjs`

Expected: FAIL because the current `src/content.js` exports only `pageContent`, not the required three-locale map.

- [ ] **Step 3: Create the complete locale records**

Move the current Chinese content into `pageContentByLocale.zh`, translate every visible and accessible string into English and Japanese, and keep the existing asset paths and object positions unchanged. Remove the standalone `pageContent` export so consumers cannot accidentally bypass locale selection.

Use these locale-level SEO values:

```js
en: {
  seo: {
    htmlLang: "en",
    hreflang: "en",
    title: "ELARA One | Know your rhythm.",
    description: "A quiet smart ring concept for understanding sleep, energy, and the rhythm of everyday life.",
  },
}
zh: {
  seo: {
    htmlLang: "zh-CN",
    hreflang: "zh-CN",
    title: "ELARA One｜听见自己的节律",
    description: "ELARA One 智能指环概念体验：以安静的方式理解睡眠、能量与日常节律。",
  },
}
ja: {
  seo: {
    htmlLang: "ja",
    hreflang: "ja",
    title: "ELARA One｜自分のリズムに耳を澄ます",
    description: "睡眠、エネルギー、日々のリズムを静かに理解する、ELARA One スマートリングのコンセプト体験。",
  },
}
```

Keep claims concept-safe in all translations and preserve the current local-preview disclosure in each locale.

- [ ] **Step 4: Run the content tests and the existing waitlist tests**

After the content source exists, extend the `test` script to:

```json
"test": "node --test tests/waitlist.test.mjs tests/locale.test.mjs tests/content.test.mjs"
```

Do not add `tests/sites-worker.test.mjs` to `npm test`; keep it behind `npm run test:sites`.

Run: `node --test tests/content.test.mjs tests/waitlist.test.mjs`

Expected: all content and waitlist tests pass.

---

### Task 3: Integrate locale selection, localized rendering, and document metadata

**Files:**
- Modify: `src/App.jsx`
- Modify: `index.html`

**Interfaces:**
- Consumes `pageContentByLocale` from `src/content.js` and all locale helpers from `src/i18n/locale.js`.
- Produces a rendered `App` whose visible and accessible copy comes from the active locale record.
- Produces stable `<a>` language links with `aria-current="page"` and the current hash preserved.
- Produces runtime updates for `html lang`, title, description, canonical, and alternate hreflang links.

- [ ] **Step 1: Add the app integration test seam before changing the component**

Add a pure `getLocaleNavigationLinks({ locale, hash })` helper to `src/i18n/locale.js` only after first adding this failing test to `tests/locale.test.mjs`:

```js
import { getLocaleNavigationLinks } from "../src/i18n/locale.js";

test("creates one active and two inactive locale navigation links", () => {
  assert.deepEqual(getLocaleNavigationLinks({ locale: "zh", hash: "#insight" }), [
    { locale: "en", href: "/en/#insight", current: false },
    { locale: "zh", href: "/zh/#insight", current: true },
    { locale: "ja", href: "/ja/#insight", current: false },
  ]);
});
```

Run: `node --test tests/locale.test.mjs`

Expected: FAIL because the navigation-link helper does not exist yet.

- [ ] **Step 2: Implement the navigation-link helper and rerun the locale tests**

Implement `getLocaleNavigationLinks` by mapping `SUPPORTED_LOCALES` in deterministic `en`, `zh`, `ja` order, using `buildLocalePath` for each href and setting `current` only for the active locale.

Run: `node --test tests/locale.test.mjs`

Expected: all locale tests pass.

- [ ] **Step 3: Replace the single content import with active-locale resolution**

In `App.jsx`, resolve the initial locale only in the browser:

```js
function getInitialAppLocale() {
  const pathname = window.location.pathname;
  const storage = getSafeBrowserStorage();
  const explicitLocale = getLocaleFromPath(pathname);
  const isRootPath = pathname === "/" || pathname === "";
  const locale = resolveInitialLocale({
    pathname,
    storage,
    browserLanguage: window.navigator.language,
  });
  const resolvedLocale = explicitLocale ?? (isRootPath ? locale : DEFAULT_LOCALE);
  const targetPath = buildLocalePath(resolvedLocale, window.location.hash);

  if (window.location.pathname !== targetPath.split("#")[0]) {
    window.history.replaceState({}, "", targetPath);
  }

  return resolvedLocale;
}
```

Add `getSafeBrowserStorage()` in the same module; it must catch an exception from reading `window.localStorage` and return `null`. Normalize `/` according to the locale priority and normalize unsupported non-root app paths to `/en/`. Keep the initial render synchronous so localized content and metadata do not briefly render the wrong language.

- [ ] **Step 4: Thread the locale content object through every page component**

Update `Header`, `Hero`, `EditorialStatement`, `Rituals`, `DailyInsight`, `Finishes`, `PreviewForm`, and `Footer` to receive `content` (and `locale` where needed). Replace all direct `pageContent` reads and hardcoded user-facing strings, including:

- skip-link text;
- wordmark and footer home labels;
- primary navigation aria label;
- rituals section eyebrow and heading;
- preview success label;
- local-preview form note;
- footer note and legal label;
- all image alt text.

Use `content.rituals.items` for the three ritual cards. The language switcher links must use `getLocaleNavigationLinks({ locale, hash: window.location.hash })`, write the selected locale with `writeStoredLocale(window.localStorage, targetLocale)`, and navigate through the generated href.

- [ ] **Step 5: Add the metadata synchronization effect**

Add a small DOM helper in `App.jsx` that upserts one element at a time using stable `data-elara-meta` attributes. On each active locale render:

```js
document.documentElement.lang = content.seo.htmlLang;
document.title = content.seo.title;
```

Set the description, canonical URL for `buildLocalePath(locale)`, alternate links for `/en/`, `/zh/`, `/ja/`, and `x-default` pointing to `/en/`. Use `window.location.origin` for absolute URLs. Remove stale generated alternate links before adding the current set.

- [ ] **Step 6: Update the static HTML baseline to English**

Change `index.html` to `lang="en"`, the English description, and the English title. Leave the root mount and module script unchanged.

- [ ] **Step 7: Run build and unit tests before styling**

Run: `npm test && npm run build`

Expected: the waitlist, locale, and content tests pass; Vite builds successfully; `dist/client/index.html` exists. If the component has a syntax or import error, fix the implementation before adding CSS changes.

---

### Task 4: Add the visible language switcher and preserve the full-width hero contract

**Files:**
- Modify: `src/App.jsx:9-27`
- Modify: `src/styles.css:93-283,636-706`

**Interfaces:**
- Consumes the locale navigation links and native-language labels from `content.ui.localeOptions`.
- Produces desktop language links beside the existing CTA and compact mobile labels that remain keyboard accessible.
- Produces a full-width hero image with transparent header and desktop copy/action overlay; ritual-card image content remains normal flow.

- [ ] **Step 1: Add the header markup using real links and accessible labels**

Render the right side of the header as:

```jsx
<div className="header-tools">
  <nav className="locale-switcher" aria-label={content.ui.languageLabel}>
    {localeLinks.map((link) => (
      <a
        key={link.locale}
        className="locale-link"
        href={link.href}
        aria-current={link.current ? "page" : undefined}
        aria-label={content.ui.localeOptions[link.locale].ariaLabel}
        onClick={() => writeStoredLocale(getSafeBrowserStorage(), link.locale)}
      >
        <span className="locale-name-full">
          {content.ui.localeOptions[link.locale].label}
        </span>
        <span className="locale-name-short" aria-hidden="true">
          {content.ui.localeOptions[link.locale].shortLabel}
        </span>
      </a>
    ))}
  </nav>
  <button className="header-action" type="button" onClick={onPreview}>
    {content.ui.headerPreviewAction}
  </button>
</div>
```

Use `getSafeBrowserStorage()` through the safe helper; do not let a storage exception block navigation.

- [ ] **Step 2: Add desktop switcher styles**

Add `.header-tools` as an end-aligned flex row, `.locale-switcher` as an inline flex row, and `.locale-link` as a minimum 44px inline-flex control. Match existing hairline underline behavior and use the active color appropriate for the image overlay. Set `.locale-name-short { display: none; }` above the mobile breakpoint. Remove the existing opaque/translucent header background, border, and blur from the hero state.

- [ ] **Step 3: Add mobile-safe compact labels**

At `max-width: 760px`, keep `.header-tools` visible, reduce its gap, hide `.locale-name-full`, show `.locale-name-short`, reduce locale-link tracking, and keep `.header-action` `white-space: nowrap`. The short labels must be `中`, `日`, and `EN`, while their full native names remain in `aria-label`.

- [ ] **Step 4: Convert the hero to the current transparent full-width visual contract**

Place the header and hero copy/action group over a single full-width hero image at desktop. Use a positioned hero stage or equivalent structure, a transparent header background, and a readable image-overlay treatment without adding an opaque or translucent left panel. The image must remain the one full-width hero surface. Keep ritual-card images in normal document flow; do not absolutely position them over card text.

- [ ] **Step 5: Run the build and inspect CSS output for the responsive contract**

Run: `npm run build`

Expected: build exits 0 with no CSS parser errors. Browser verification in Task 6 must confirm the 320px minimum body width and 390px mobile viewport remain free of horizontal overflow.

---

### Task 5: Extend automated verification and preserve Sites packaging

**Files:**
- Modify: `package.json:8-15` only if Task 1 did not already update the test command
- Do not modify: `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, `tests/sites-worker.test.mjs`

**Interfaces:**
- `npm test` runs waitlist, locale, and content contract tests.
- `npm run build` leaves `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
- `npm run test:sites` validates static asset passthrough, HTML fallback, non-HTML/non-GET 404 behavior, and Sites files.

- [ ] **Step 1: Run the complete local test command**

Run: `npm test`

Expected: all waitlist, locale, and content tests pass with zero failures.

- [ ] **Step 2: Run the production-shaped build**

Run: `npm run build`

Expected: Vite and Sites preparation both exit 0 and create all three required artifacts.

- [ ] **Step 3: Run the Sites Worker contract tests**

Run: `npm run test:sites`

Expected: all existing Worker and packaging tests pass without changing Worker behavior.

- [ ] **Step 4: Check the changed-file boundary**

Run: `git status --short` only if Git metadata becomes available. In the current checkout, retain the already-established no-Git condition and do not initialize or stage files. Confirm the changed set is limited to the locale source, content source, App, CSS, index baseline, tests, package script, and the approved design/plan documents.

---

### Task 6: Run local browser verification for all three locales

**Files:**
- Create or update: `design-qa.md` only with fresh verification evidence and findings
- Modify: `src/App.jsx` or `src/styles.css` only if a browser finding is actionable and directly related to this feature

**Interfaces:**
- Consumes the built React app and local Vite server.
- Produces fresh desktop/mobile evidence for `/en/`, `/zh/`, and `/ja/`, plus a verified interaction checklist.

- [ ] **Step 1: Start the local server on a dedicated port**

Run: `npm run dev -- --host 0.0.0.0 --port 4175 --strictPort`

Keep the server running during browser checks. Use the browser tool to open `http://127.0.0.1:4175/en/`.

- [ ] **Step 2: Verify the English baseline**

Check that `/en/` renders English page copy, `document.documentElement.lang` is `en`, the title and description are English, the active switcher link is `English`, and the existing preview CTA/error/success/reset interactions still work.

- [ ] **Step 3: Verify the Chinese route and hash-preserving switch**

Open `/zh/#rituals`. Check Chinese copy, `lang="zh-CN"`, localized metadata, active `中文`, and that the rituals section remains the target after switching to Japanese. Confirm the URL becomes `/ja/#rituals`.

- [ ] **Step 4: Verify the Japanese route and switch back**

Check Japanese copy, `lang="ja"`, localized metadata, active `日本語`, and switch to English while preserving the current hash. Confirm `/en/#rituals` renders English at the same section.

- [ ] **Step 5: Verify root and unsupported-path fallback behavior**

Use a clean browser storage state to open `/`; confirm the browser language/default resolution results in a supported locale path and never leaves an unsupported locale page. Open `/fr/`; confirm it normalizes to `/en/` without a console error.

- [ ] **Step 6: Verify mobile layout and accessibility**

At a 390 × 844 viewport, check that the compact language labels and preview CTA remain visible, all controls are keyboard reachable, the selected language has `aria-current="page"`, focus outlines remain visible, and `document.documentElement.scrollWidth` equals `document.documentElement.clientWidth`.

- [ ] **Step 7: Record the final QA result and rerun the complete verification suite**

Record route, metadata, language switching, anchor preservation, form states, responsive overflow, and console results in `design-qa.md`. Then run:

```bash
npm test && npm run build && npm run test:sites
```

Expected: all commands exit 0 and the QA record contains no unresolved P0/P1/P2 issue.

## Plan Self-Review

- Spec coverage: locale paths and priority are covered by Task 1; content parity and translated alt text by Task 2; rendering and metadata by Task 3; switcher layout by Task 4; Sites preservation by Task 5; browser and responsive acceptance by Task 6.
- Placeholder scan: no reserved-marker or underspecified implementation step is used; each test step includes concrete assertions or commands.
- Type consistency: `getLocaleNavigationLinks` returns `{ locale, href, current }`, `buildLocalePath` accepts a locale and optional hash, and `pageContentByLocale[locale]` exposes the exact keys consumed by `App.jsx`.
- Scope: the plan changes only the approved app surface and does not alter Worker behavior, image assets, or unrelated prototype files.
