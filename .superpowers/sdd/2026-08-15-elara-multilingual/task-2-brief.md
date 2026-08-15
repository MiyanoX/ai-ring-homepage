# Task 2: Convert the page content into a complete three-locale contract

This task follows the completed pure locale module. Read this brief first — it is the exact content and test contract for the second implementation task.

## Files and scope

- Modify only `src/content.js`.
- Create only `tests/content.test.mjs`.
- Modify `package.json` only to extend the existing explicit `test` script with `tests/content.test.mjs` after that test file exists.
- Do not modify `src/App.jsx`, `src/styles.css`, `index.html`, Worker files, image files, or locale utility files.

## Required export and structure

Replace the current standalone `pageContent` export with:

```js
export const pageContentByLocale = {
  en: { ... },
  zh: { ... },
  ja: { ... },
};
```

Each locale record must have exactly these top-level keys:

```text
seo, ui, nav, hero, statement, rituals, insight, finishes, preview, footer
```

`rituals` must be `{ eyebrow, title, items }`, with three items carrying the existing `index`, `title`, `englishTitle`, `copy`, and `image` fields. All other existing image `src`, `position`, and visual asset structure must remain unchanged.

`seo` must be `{ htmlLang, title, description, hreflang }` with exactly:

```js
en: {
  htmlLang: "en",
  hreflang: "en",
  title: "ELARA One | Know your rhythm.",
  description: "A quiet smart ring concept for understanding sleep, energy, and the rhythm of everyday life.",
}
zh: {
  htmlLang: "zh-CN",
  hreflang: "zh-CN",
  title: "ELARA One｜听见自己的节律",
  description: "ELARA One 智能指环概念体验：以安静的方式理解睡眠、能量与日常节律。",
}
ja: {
  htmlLang: "ja",
  hreflang: "ja",
  title: "ELARA One｜自分のリズムに耳を澄ます",
  description: "睡眠、エネルギー、日々のリズムを静かに理解する、ELARA One スマートリングのコンセプト体験。",
}
```

`ui` must include these keys:

```text
skipToContent, homeAriaLabel, primaryNavLabel, previewAriaLabel,
languageLabel, localeOptions, headerPreviewAction,
previewSuccessLabel, localPreviewNote
```

`localeOptions` must provide `en`, `zh`, and `ja` entries, each with `label`, `shortLabel`, and `ariaLabel`. Full labels are `English`, `中文`, and `日本語`; short labels are `EN`, `中`, and `日` respectively. The aria labels must be localized and describe the target language.

`nav` remains an array with the existing three section hrefs (`#rituals`, `#insight`, `#finishes`) and translated labels. Put the header preview CTA in `ui.headerPreviewAction`; do not add `previewAction` to the nav array.

## Translation and content constraints

- Translate every visible string, status string, accessibility label, form hint/error/success string, footer string, and image alt text into all three locales.
- Keep the Chinese wording semantically equivalent to the current page.
- Write natural Japanese and English, not mixed-language fallbacks.
- Preserve concept-safe language. Do not add medical diagnosis/treatment claims, clinical accuracy, regulatory approval, awards, sales, price, launch date, or unsupported specifications.
- Keep the local preview disclosure explicit in every locale: the form does not send or save email data.
- Keep all section ids and nav hrefs identical across locales.
- Use the same image `src` values and focal `position` values across locales; localize `alt` only.

## Tests to write before the content implementation

Create `tests/content.test.mjs` with these assertions:

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
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectStrings(item, `${path}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => collectStrings(child, `${path}.${key}`));
  }
  return [];
}

test("exposes exactly the three supported locale records", () => {
  assert.deepEqual(Object.keys(pageContentByLocale).sort(), LOCALES);
  for (const locale of LOCALES) {
    assert.deepEqual(Object.keys(pageContentByLocale[locale]).sort(), [...REQUIRED_KEYS].sort());
  }
});

test("keeps navigation and section anchors identical across locales", () => {
  const first = pageContentByLocale.en;
  for (const locale of LOCALES.slice(1)) {
    assert.deepEqual(
      pageContentByLocale[locale].nav.map((item) => item.href),
      first.nav.map((item) => item.href),
    );
    assert.deepEqual(
      pageContentByLocale[locale].rituals.items.map((item) => item.index),
      first.rituals.items.map((item) => item.index),
    );
  }
});

test("keeps the same image sources while translating alternative text", () => {
  const imageRecords = (content) => [
    content.hero.image,
    content.statement.image,
    ...content.rituals.items.map((item) => item.image),
    content.insight.image,
    content.finishes.image,
  ];
  const englishImages = imageRecords(pageContentByLocale.en);
  for (const locale of LOCALES) {
    const images = imageRecords(pageContentByLocale[locale]);
    assert.deepEqual(images.map((image) => image.src), englishImages.map((image) => image.src));
    for (const image of images) assert.ok(image.alt.trim(), `${locale} image alt must not be empty`);
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

## Process and report

Follow red-green-refactor: write `tests/content.test.mjs`, run it and confirm it fails because the current source lacks `pageContentByLocale`, then implement the content map, run the content and waitlist tests, and finally extend `npm test` explicitly to include `tests/content.test.mjs`. Do not use a wildcard that includes `tests/sites-worker.test.mjs`. Write a full report to `.superpowers/sdd/2026-08-15-elara-multilingual/task-2-report.md` containing red/green commands, changed files, translation/content self-review, and concerns. Return only status, changed files, one-line test summary, and concerns.

## Governing project constraints

- Supported locales are exactly `en`, `zh`, and `ja`.
- Preserve existing ELARA visual/product constraints, image assets, no-face photography direction, and concept-safe claims.
- Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` untouched.
- Do not initialize Git, create commits, or modify unrelated files in this checkout.
