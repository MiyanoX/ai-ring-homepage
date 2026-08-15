# Task 3: Integrate locale selection, localized rendering, and document metadata

This task resolves the approved transitional break from Task 2 by migrating App from the removed `pageContent` export to `pageContentByLocale`. Read this brief first — it is the exact integration contract.

## Files and scope

- Modify `src/i18n/locale.js` to add the tested navigation-link helper.
- Modify `tests/locale.test.mjs` to cover the navigation-link helper.
- Modify `src/App.jsx` for locale resolution, localized rendering, language links, form status strings, and metadata.
- Modify `index.html` only for the default English `lang`, title, and description.
- Do not modify `src/styles.css`, `src/content.js`, `src/lib/waitlist.js`, Worker files, scripts, or image assets.

## Existing contracts to consume

- `SUPPORTED_LOCALES` is `en`, `zh`, `ja` in that order.
- `DEFAULT_LOCALE` is `en`.
- `pageContentByLocale[locale]` contains `seo`, `ui`, `nav`, `hero`, `statement`, `rituals`, `insight`, `finishes`, `preview`, and `footer`.
- `preview` includes `emptyEmailError`, `invalidEmailError`, and `confirmationMessage` for localized UI strings.
- `ui` includes `skipToContent`, `homeAriaLabel`, `primaryNavLabel`, `previewAriaLabel`, `languageLabel`, `localeOptions`, `headerPreviewAction`, `previewSuccessLabel`, and `localPreviewNote`.

## New locale utility interface

Add:

```js
getLocaleNavigationLinks({ locale, hash }): Array<{
  locale: "en" | "zh" | "ja",
  href: string,
  current: boolean,
}>
```

It must map `SUPPORTED_LOCALES` in `en`, `zh`, `ja` order, call `buildLocalePath` for each href, preserve the provided hash, and set `current` only for the active locale.

## Test-first steps

Before changing App, add this test to `tests/locale.test.mjs` and import the helper:

```js
test("creates one active and two inactive locale navigation links", () => {
  assert.deepEqual(getLocaleNavigationLinks({ locale: "zh", hash: "#insight" }), [
    { locale: "en", href: "/en/#insight", current: false },
    { locale: "zh", href: "/zh/#insight", current: true },
    { locale: "ja", href: "/ja/#insight", current: false },
  ]);
});
```

Run `node --test tests/locale.test.mjs` and confirm the new test fails because the helper is absent. Implement the helper, rerun, and confirm all locale tests pass before changing App.

## Initial locale behavior

Add browser-only helpers in `src/App.jsx`:

```js
function getSafeBrowserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getInitialAppLocale() {
  const pathname = window.location.pathname;
  const explicitLocale = getLocaleFromPath(pathname);
  const isRootPath = pathname === "/" || pathname === "";
  const resolved = resolveInitialLocale({
    pathname,
    storage: getSafeBrowserStorage(),
    browserLanguage: window.navigator.language,
  });
  const locale = explicitLocale ?? (isRootPath ? resolved : DEFAULT_LOCALE);
  const targetPath = buildLocalePath(locale, window.location.hash);

  if (window.location.pathname !== targetPath.split("#")[0]) {
    window.history.replaceState({}, "", targetPath);
  }

  return locale;
}
```

If the code needs to run without `window`, use `DEFAULT_LOCALE` without accessing browser globals. Explicit `/en/`, `/zh/`, and `/ja/` paths always win. Root `/` uses stored preference, then browser language, then English. Unsupported non-root paths normalize to `/en/` and never use a stored non-English preference.

## App rendering contract

Replace the `pageContent` import with `pageContentByLocale` and pass the active `content` record into every existing component: `Header`, `Hero`, `EditorialStatement`, `Rituals`, `DailyInsight`, `Finishes`, `PreviewForm`, and `Footer`.

Remove every direct `pageContent` read and every user-facing hardcoded string in `App.jsx`. All of these must come from locale content:

- skip-link text;
- wordmark and footer home aria labels;
- primary navigation aria label;
- language switcher label and native-language link labels;
- header preview CTA;
- rituals eyebrow/title and ritual item fields;
- preview success label and confirmation message;
- empty/invalid email messages;
- local-preview form note;
- footer note/legal text;
- all image alt text.

The current waitlist helper still returns Chinese messages for its pure contract. In the UI, use its `valid` and normalized `email` results, but display `content.preview.emptyEmailError`, `content.preview.invalidEmailError`, and `content.preview.confirmationMessage` so the rendered form is localized.

The Header language links must be real anchors with:

- `href` from `getLocaleNavigationLinks({ locale, hash: window.location.hash })`;
- `aria-current="page"` only on the active locale;
- full labels from `content.ui.localeOptions[locale].label`;
- `shortLabel` spans available for the Task 4 mobile CSS;
- localized `aria-label` from the locale record;
- safe `writeStoredLocale(getSafeBrowserStorage(), targetLocale)` on click.

Keep the existing anchor hrefs and section ids unchanged. Do not add a router dependency.

## Metadata contract

Add a React effect that updates from `content.seo` on every locale render:

```js
document.documentElement.lang = content.seo.htmlLang;
document.title = content.seo.title;
```

Upsert `meta[name="description"]`, one `link[rel="canonical"]`, and generated alternate links using stable `data-elara-meta` attributes. Canonical and alternate URLs must be absolute URLs from `window.location.origin`:

- current locale path for canonical;
- `/en/`, `/zh/`, `/ja/` for `hreflang="en"`, `hreflang="zh-CN"`, `hreflang="ja"`;
- `/en/` for `hreflang="x-default"`.

Remove stale generated alternate links before adding the current set. Do not touch the app mount or module script in `index.html`.

## Test, report, and scope

After the helper and App changes, run:

```bash
node --test tests/locale.test.mjs
npm test
npm run build
```

The build must pass now that App consumes the locale map. Write the full report to `.superpowers/sdd/2026-08-15-elara-multilingual/task-3-report.md` with red/green evidence, changed files, metadata/rendering self-review, and concerns. Do not initialize Git or create commits. Return only status, changed files, one-line tests, and concerns.

## Governing project constraints

- Exactly `en`, `zh`, and `ja`; English is the default.
- Explicit locale paths are authoritative; no IP redirects.
- Preserve the current ELARA product claims, image assets, no-face photography direction, and Sites files.
- New AGENTS.md visual contract is handled in Task 4; this task must not edit CSS.
