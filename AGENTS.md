# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

ELARA photography should avoid visible faces. Prefer hand-only or hand-and-forearm compositions, keep the ring clearly readable, and exclude faces, heads, and reflected faces unless the user explicitly asks otherwise.

The ELARA hero uses one full-width image. The header and desktop hero copy/action group must float directly above that image with fully transparent backgrounds; do not reserve a separate header row or opaque/translucent left panel. Ritual-card images must remain in normal flow and never cover their title, index, English label, or description.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable Chinese landing direction

- The Chinese page is the primary redesign surface. Keep the English and Japanese landing experiences unchanged unless explicitly requested.
- The Chinese narrative follows six blocks: desire-led hero, ring-first design, quiet technology, daily understanding, credible people and validation, then purchase plus a separate Gift path.
- The technology chapter is the brand differentiator: explain that advanced sensing adapts to the wearer instead of asking the wearer to adapt to technology. Use quiet, sparse PPG/vibration references rather than a circuit-board showcase.
- Public copy may show the supplied design targets `6 mm`, `US 6+`, titanium inner ring, and `¥59,500 起` as concept/target information. Do not publish a `世界最细` claim until claim clearance is complete.
- Trust content should introduce specific roles and responsibilities (including the supplied Tokyo University female-health-design participation) and mark names, credentials, validation results, and final specifications as pending disclosure when evidence is not yet available.
- Purchase UI must show Standard / design options, finishes, engraving, and a distinct Gift entry with an NFC message-card path. The prototype purchase/waitlist flow remains local-only and must not imply a live order or reservation service.
