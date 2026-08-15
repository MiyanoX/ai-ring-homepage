# Task 1: Add the pure locale URL and preference module

This is the first implementation task for the ELARA One Chinese/Japanese/English landing page. Read this brief first; it is the exact task contract.

## Files

- Create `src/i18n/locale.js`.
- Create `tests/locale.test.mjs`.
- Modify the `test` script in `package.json` to include `tests/locale.test.mjs` and the future `tests/content.test.mjs`; do not change `test:sites`.

## Interfaces

Export:

- `SUPPORTED_LOCALES` containing `en`, `zh`, `ja` in deterministic order.
- `DEFAULT_LOCALE` equal to `en`.
- `LOCALE_STORAGE_KEY` equal to `elara-locale`.
- `isSupportedLocale(value): boolean`.
- `getLocaleFromPath(pathname): "en" | "zh" | "ja" | null`.
- `getLocaleFromBrowserLanguage(language): "en" | "zh" | "ja"`.
- `buildLocalePath(locale, hash = ""): string`.
- `readStoredLocale(storage): "en" | "zh" | "ja" | null`.
- `writeStoredLocale(storage, locale): boolean`.
- `resolveInitialLocale({ pathname, storage, browserLanguage }): "en" | "zh" | "ja"`.

## Required behavior

- Parse only the first non-empty pathname segment. `/zh/`, `/ja/#rituals`, and `/en/insight` resolve to their locale; `/` and `/fr/` return `null`.
- Generate `/ja/#rituals` from `("ja", "#rituals")`, normalize `"rituals"` to `#rituals`, and normalize unsupported locales to `/en/`.
- Map `zh-*` browser languages to `zh`, `ja-*` to `ja`, and every other value to `en`.
- Locale resolution order is explicit supported path, valid stored preference, browser language, then English.
- Storage helpers catch read and write exceptions and return `null`/`false` without throwing.
- The module must not access browser globals.

## Tests to write before implementation

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
    resolveInitialLocale({ pathname: "/ja/", storage: adapter, browserLanguage: "en-US" }),
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

## Process and report

Follow red-green-refactor: write the tests, run `node --test tests/locale.test.mjs` and confirm the missing module causes the red result, implement the smallest module, rerun and confirm five tests pass. Do not initialize Git, create commits, or change unrelated files. Write a report to `.superpowers/sdd/2026-08-15-elara-multilingual/task-1-report.md` containing changed files, red/green commands and output summaries, self-review, and any concerns. Return only status, changed files, test summary, and concerns in the agent response.

## Governing project constraints

- The product supports exactly `en`, `zh`, and `ja`; default is `en`.
- Explicit locale paths are authoritative; `localStorage` key is `elara-locale` and browser language only assists the root path.
- Do not use IP-based redirects.
- Do not initialize Git or perform commit/reset operations in this checkout.
- Preserve the existing Sites files and current ELARA visual/product constraints; this task has no visual write scope.
