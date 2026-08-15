# Task 4: Add the visible language switcher and preserve the full-width hero contract

This task is the visual implementation step. Read this brief first — it includes the current governing `AGENTS.md` requirements and the selected visual reference contract.

## Files and scope

- Modify only `src/App.jsx` and `src/styles.css`.
- Do not modify content data, locale utilities, tests, index, waitlist helpers, Worker files, scripts, or image assets.
- Use the already-present `getLocaleNavigationLinks`, `writeStoredLocale`, and `content.ui.localeOptions` contracts from Tasks 1–3.

## Visual source and governing constraints

The selected visual source is `references/landing-page/elara-morning-ritual.png`; the current hand-only hero asset is `public/assets/elara/hero-hands-v2.jpg`. The reference uses a single full-width hero image, dark editorial copy over the light left side of the image, transparent navigation, and no opaque left content panel.

The current `AGENTS.md` is authoritative:

- The ELARA hero uses one full-width image.
- The header and desktop hero copy/action group must float directly above that image with fully transparent backgrounds.
- Do not reserve a separate header row or opaque/translucent left panel.
- Ritual-card images remain in normal document flow and never cover their title, index, English label, or description.
- Preserve hand-only/forearm photography and keep the ring readable.

## App markup contract

Restructure the current App composition so the header and hero share a wrapper:

```jsx
<div className="hero-stage">
  <Header ... />
  <Hero ... />
</div>
<main id="main-content">
  ...
</main>
```

Update `Header` so its existing center section nav remains separate from a right-side tools group:

```jsx
<header className="site-header">
  <a className="wordmark" ...>ELARA</a>
  <nav className="site-nav" ...>...</nav>
  <div className="header-tools">
    <nav className="locale-switcher" aria-label={content.ui.languageLabel}>
      {localeLinks.map(({ locale: targetLocale, href, current }) => {
        const option = content.ui.localeOptions[targetLocale];
        return (
          <a
            key={targetLocale}
            className="locale-link"
            href={href}
            aria-current={current ? "page" : undefined}
            aria-label={option.ariaLabel}
            onClick={() => onLocaleSelect(targetLocale)}
          >
            <span className="locale-name-full">{option.label}</span>
            <span className="locale-name-short" aria-hidden="true">
              {option.shortLabel}
            </span>
          </a>
        );
      })}
    </nav>
    <button className="header-action" ...>
      {content.ui.headerPreviewAction}
    </button>
  </div>
</header>
```

Keep real anchor navigation, `aria-current="page"`, localized aria labels, current-hash preservation, and the safe preference write. Do not add a router or a dropdown for the three supported languages.

## CSS contract

Add or update these layout boundaries:

```css
.hero-stage {
  position: relative;
  min-height: 100svh;
}

.site-header {
  position: absolute;
  inset: 0 0 auto;
  z-index: 10;
  background: transparent;
  border-bottom: 0;
  backdrop-filter: none;
}

.header-tools,
.locale-switcher {
  display: flex;
  align-items: center;
}

.hero {
  position: relative;
  display: block;
  min-height: 100svh;
  overflow: hidden;
}

.hero-media {
  position: absolute;
  inset: 0;
  z-index: 0;
  min-height: 100%;
}

.hero-copy {
  position: relative;
  z-index: 2;
  min-height: 100svh;
  justify-content: center;
}
```

Use a transparent image-overlay treatment only as needed for legibility; it must be a gradient over the image, not a separate opaque/translucent panel behind the copy. Keep the image full-bleed and use the existing editorial colors/type. Remove the old header translucency/blur and split-hero grid behavior. Do not leave media-query grid rules that reintroduce a side-by-side hero.

Add `.locale-link` as an inline-flex control with a minimum 44px height, visible underline/active state consistent with the existing link treatment, and no rounded pill treatment. Show `.locale-name-full` on desktop and only `.locale-name-short` (`EN`, `中`, `日`) on mobile. Keep the full native label in `aria-label`.

At `max-width: 980px`, hide only the section nav as the existing compact behavior does; keep the language switcher and preview CTA available. At `max-width: 760px`, keep the header overlay, compact the tools, show short labels, and retain a full-width hero image with copy over it. Ensure no horizontal overflow at 390px.

Keep ritual-card image elements in normal flow with their existing grid/flex structure. Do not use absolute positioning on `.ritual > img`, `.ritual-heading`, or `.ritual-copy`; their text must remain below/alongside the image and readable.

## Verification and report

Before implementation, run the existing unit suite as the baseline. After the markup/CSS changes, run:

```bash
npm test
npm run build
```

Write the full report to `.superpowers/sdd/2026-08-15-elara-multilingual/task-4-report.md`, including baseline/final commands, changed files, responsive/overlay self-review, and concerns. Do not initialize Git or create commits. Return only status, changed files, one-line tests, and concerns.

## Governing project constraints

- Exactly `en`, `zh`, and `ja`; preserve the existing locale-link semantics.
- Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` untouched.
- Preserve ELARA brand, concept-safe copy, existing assets, no-face photography, and the Sites build output contract.
