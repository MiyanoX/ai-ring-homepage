# ELARA One multilingual implementation — Design QA

## Comparison target

- Source visual truth: references/landing-page/elara-morning-ritual.png
- Source/implementation combined comparison: artifacts/elara-transparent-hero-comparison.png
- Current desktop implementation: artifacts/browser-en-desktop-1280x720.png
- Current mobile implementation: artifacts/browser-ja-mobile-390x844.png
- Current mobile ritual-flow implementation: artifacts/browser-ja-ritual-cards-390x844.png

The source is the selected ELARA landing-page visual target. The implementation intentionally uses the approved hand-only photography direction; the source contains a visible face, while the current implementation does not.

## Normalization

- Source: 864 × 1821 pixels, full-page PNG.
- Combined comparison: 1728 × 486 pixels; the source hero crop is 864 × 486 and the implementation hero capture is normalized to the same 864 × 486 comparison half.
- Desktop implementation: 1280 × 720 CSS pixels, 1280 × 720 screenshot pixels, device scale 1.
- Mobile implementation: 390 × 844 CSS pixels, 390 × 844 screenshot pixels, device scale 1.
- Mobile ritual-flow capture: 390 × 844 CSS pixels, 390 × 844 screenshot pixels, device scale 1, scrolled to the ritual-card region.

## States and browser evidence

- /en/ and /ja/ retain the legacy page composition. `/zh/` renders the dedicated six-block Chinese landing with the expected html[lang], title, description, canonical URL, four alternate links (en, zh-CN, ja, x-default), and one active language link.
- / followed the stored/browser locale preference; unsupported /fr/ normalized to /en/.
- Switching from /zh/#rituals to Japanese preserved /ja/#rituals and rendered Japanese content.
- Invalid email and valid local-preview submission were exercised in all three locales. Error messages, success messages, and reset controls were localized; reset returned focus to the email field. No network submission or persistence occurs.
- Desktop geometry at 1280 × 720: header and hero start at y=0; header position is absolute; header and hero-copy backgrounds are transparent; hero media is absolute and spans the viewport.
- Mobile geometry at 390 × 844: hero media spans 390 px with no horizontal overflow; full and short locale labels switch at the responsive breakpoint; all ritual images remain before their heading and copy in normal flow.
- Browser console check: no error, warning, or warn entries.

## Required fidelity surfaces

- Fonts and typography: the editorial serif headline, restrained sans-serif body/UI hierarchy, localized wrapping, and responsive scale are preserved. Chinese and Japanese headings wrap naturally without horizontal overflow. A self-hosted serif remains optional P3 polish for identical cross-platform rendering.
- Spacing and layout: the full-bleed hero, floating header, transparent copy/action group, section rhythm, and mobile ritual-card spacing match the selected composition. The mobile ritual capture shows the first image ending before its index/title/label/copy.
- Colors and visual tokens: warm porcelain, champagne, muted plum, dark espresso text, and the transparent image-overlay treatment remain consistent with the source direction. The active locale underline and preview/error states use the existing token system.
- Image quality and asset fidelity: the implementation uses the provided ELARA raster assets, preserves the readable ring crop, and uses hand-only photography without face or reflected-face artifacts. No CSS/inline-SVG substitute replaces the visual assets.
- Copy and content: English, Simplified Chinese, and Japanese content records are complete and non-empty. The legacy content contract remains shared; Chinese additionally exposes the dedicated `landing` contract for design, technology, daily understanding, trust, purchase, and Gift/NFC content.
- Icons and controls: the existing wordmark, links, buttons, skip link, locale links, focus behavior, and semantic labels remain implemented without placeholder icon substitutes.
- Accessibility and responsiveness: semantic navigation/form landmarks, localized ARIA labels, aria-current, aria-invalid, live status regions, focus transfer on reset, keyboard-reachable links/buttons, 390 px no-overflow behavior, and desktop/mobile locale label changes were checked.

## Findings

- No actionable P0, P1, or P2 visual, localization, interaction, accessibility, or responsive findings remain.
- P3 follow-up only: self-host the selected serif font if exact cross-platform typography becomes a release requirement.

## Comparison history

- Pass 1: identified the separate header row, split desktop hero columns, and mobile ritual-image overlap against the source target.
- Pass 2: changed the hero to one full-width image with transparent absolute header/copy layers and restored ritual images to normal flow.
- Pass 3: corrected the mobile hero media slot so it fully covers its intended viewport.
- Pass 4: verified the normalized source/implementation comparison, desktop/mobile geometry, ritual flow, and interaction states.
- Pass 5: added the trilingual route/content/metadata/switcher/form acceptance checks and captured fresh English desktop, Japanese mobile, and Japanese ritual-flow screenshots.
- Pass 6–8: the multilingual shell, route metadata, localized form states, and Sites artifacts were revalidated after review-agent cleanup.
- Pass 9: implemented the approved Chinese-only six-block landing: desire-led hero, ring-first design, quiet technology, daily understanding, role-based trust, and purchase plus Gift/NFC path. Added three hand-only generated images for technology, prototype validation, and gifting; kept `世界最细` out of public copy and marked concept/final-spec boundaries.
- Pass 10: final browser replay at 1440 × 960 and 390 × 844 confirmed the Chinese shell, ¥59,500 起 price, six section anchors, no horizontal overflow, Standard/Design and finish selection, Gift disclosure with four NFC steps, and local preview CTA behavior.

## Implementation checklist

- [x] /en/, /zh/, and /ja/ routes render localized content.
- [x] Root preference and unsupported-route fallback are safe.
- [x] Metadata and hreflang links are localized and complete.
- [x] Language switcher preserves section hashes and exposes active state.
- [x] Invalid, success, and reset preview states are localized.
- [x] Header and desktop hero copy float over one full-width transparent hero image.
- [x] Mobile hero has no horizontal overflow.
- [x] Ritual images do not cover title, index, English label, or description.
- [x] Chinese `/zh/` six-block narrative is rendered independently from the legacy English/Japanese tree.
- [x] Chinese design targets, ¥59,500 起 concept price, Standard/Design options, finishes, engraving, and Gift/NFC path are visible and locally interactive.
- [x] Technology, prototype-validation, and Gift visuals use hand-only generated assets with descriptive alternative text.
- [x] Browser console has no errors or warnings.
- [x] npm test: 17 passed, 0 failed.
- [x] npm run build: passed and emitted Sites artifacts.
- [x] npm run test:sites: 4 passed, 0 failed.

final result: passed
