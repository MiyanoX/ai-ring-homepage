# ELARA One Landing Page Design

## Objective

Build a responsive Chinese-first landing page for the conceptual ELARA One smart ring. The page should persuade urban women aged 25–40 that ELARA is intelligent jewelry for everyday self-awareness, not a fitness tracker worn on the finger.

The selected visual target is `references/landing-page/elara-morning-ritual.png` (the first displayed ideation result).

## Brand

- Working brand: `ELARA`
- Product: `ELARA One`
- English line: `Know your rhythm.`
- Chinese line: `听见自己的节律`
- Positioning: quiet intelligent jewelry for sleep, energy, stress rhythm, and personal-cycle awareness
- Voice: calm, perceptive, feminine without being sweet, premium without being distant
- Commercial status: concept only; trademark and domain availability have not been verified

## Visual Direction

The implementation should preserve the selected reference's warm editorial tone:

- porcelain ivory base
- champagne titanium product accents
- smoked-plum primary action color
- dark-cocoa typography
- high-contrast editorial serif headings with a restrained sans-serif body face
- square corners, hairline rules, restrained shadows, and generous whitespace
- natural East Asian female lifestyle photography with visible skin texture and quiet morning light
- product imagery should feel like jewelry photography, not a hardware render catalogue

## Page Structure

1. Minimal sticky navigation with the ELARA wordmark, section links, and a private-preview action.
2. Split hero with `ELARA One`, `听见自己的节律`, supporting copy, two actions, and a close-up lifestyle image.
3. Editorial statement introducing the idea of making room to hear oneself.
4. Three-part day rhythm: sleep, energy, and calm, each represented by a distinct lifestyle image.
5. Daily-insight section with a photographed device and a single humane recommendation rather than a dense dashboard.
6. Craft and finishes section presenting champagne gold, moon silver, and deep plum as jewelry objects.
7. Private-preview conversion section with an email form and privacy reassurance.
8. Minimal footer with concept-product and health-information boundaries.

## Interaction Contract

- Navigation links scroll to their corresponding page sections.
- The primary hero and navigation actions focus the private-preview form.
- The preview form validates a non-empty email with a plausible address shape.
- Successful submission is local-only and changes the visible form state to a confirmation message; it does not call an API or claim a real reservation.
- Buttons, links, and form controls expose hover, focus-visible, active, disabled, error, and success states.
- Motion is subtle and disabled when `prefers-reduced-motion` is set.

## Content Boundaries

- Use concept language such as `帮助理解`, `观察趋势`, and `每日洞察`.
- Do not claim diagnosis, treatment, clinical accuracy, regulatory approval, awards, sales, or customer testimonials.
- Do not invent exact battery life, weight, sensor precision, prices, or launch dates.
- State that ELARA One is a concept product and is not a medical device.
- Use competitor research only as structural inspiration; do not reproduce competitor copy or identity.

## Responsive Behavior

- Desktop target: faithful to the reference at 1440px viewport width.
- Tablet: maintain editorial asymmetry while reducing large heading sizes and image spans.
- Mobile: convert split sections to a single column, retain visual hierarchy, keep touch targets at least 44px, and avoid horizontal scrolling.
- Images use deliberate focal positioning and do not stretch.

## Accessibility

- Semantic landmarks and heading order.
- Descriptive alternative text for all product and lifestyle images.
- Visible keyboard focus and functional skip link.
- Labels and live regions for form errors and success.
- Sufficient contrast for body copy, actions, and hairline borders.

## Implementation Shape

- React 19 and Vite 6 using the bundled Product Design prototype template.
- `src/App.jsx` owns page composition only.
- `src/content.js` owns stable page content and asset metadata.
- `src/lib/waitlist.js` owns pure form validation and submission-state helpers.
- `src/styles.css` owns tokens, layout, responsive rules, and interaction states.
- Raster assets live under `public/assets/elara/` and are generated individually for their consuming sections.
- Node's built-in test runner covers the waitlist behavior; Vite build and browser design QA cover integration and visual fidelity.

## Acceptance Criteria

- The full conversion path works without a backend.
- The page is visually faithful to the selected reference rather than using it as a background image.
- Every reference-implied photograph is represented by a purpose-made asset; no placeholder boxes or CSS illustrations remain.
- Desktop and mobile views have no horizontal overflow.
- Automated tests, Sites worker test, and production build pass.
- `design-qa.md` exists and ends with `final result: passed` before handoff.
