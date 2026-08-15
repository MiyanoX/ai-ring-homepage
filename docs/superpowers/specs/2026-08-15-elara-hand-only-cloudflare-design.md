# ELARA Hand-Only Photography and Cloudflare Release Design

## Objective

Update the approved ELARA One landing page so its lifestyle photography is led by hands and never shows a face, then publish the verified build to the `miyanochiri` Cloudflare account at `https://ring.chiri.space`.

## Visual Direction

- Preserve the selected warm-morning editorial mock as the source of truth for grid, hierarchy, density, typography, palette, and section order.
- Replace the five face-containing assets: hero, editorial statement, sleep, energy, and calm.
- Each replacement shows only hands or hands with a small amount of wrist, forearm, sleeve, bedding, or tabletop context.
- Faces, heads, facial fragments, and reflected faces are prohibited.
- The champagne-gold ELARA One ring remains clearly visible on a natural ring finger. Hands must have realistic anatomy and skin texture.
- Preserve the existing visual vocabulary: warm indirect morning light, porcelain and oat neutrals, champagne metal, linen, pale stone, restrained urban tailoring, and quiet-luxury editorial photography.
- Keep the phone insight still life and three-finish product still life unchanged.

## Asset Slots

1. Hero: 3:2 landscape, close editorial crop of a hand adjusting a linen cuff near a sunlit window; the ring is the focal point and the right side remains compositionally dense.
2. Statement: 4:3 landscape, hands resting on a pale stone or linen surface in a quiet morning ritual; no upper body or head.
3. Sleep: 1:1, relaxed ring-wearing hand resting on ivory linen bedding.
4. Energy: 1:1, ring-wearing hand holding a minimal takeaway cup against soft urban architecture; frame ends below the shoulder.
5. Calm: 1:1, ring-wearing hands loosely holding a warm ceramic cup beside a window; no torso above the collarbone and no head.

## Integration

- Generate project-bound assets with the built-in ImageGen editing workflow, using each existing source PNG as the edit target and the selected mock as art-direction reference.
- Save new files non-destructively under `public/assets/elara/` with `-hands-v2` filenames.
- Keep the original generated PNG sources under `references/landing-page/source-assets/`.
- Update `src/content.js` paths and alt text only; do not alter page layout, copy, navigation, form behavior, or Sites packaging files.
- Optimize the final web assets to high-quality JPG after visual approval.

## Cloudflare Release

- Use Workers Static Assets with the existing `worker/index.js` SPA fallback and `dist/client` build.
- Add `wrangler.jsonc` with a current compatibility date, `ASSETS` binding, Worker name `elara-ring-landing`, and a Custom Domain route for `ring.chiri.space`.
- Resolve the authenticated account read-only and proceed only when the account named `miyanochiri` and the `chiri.space` zone are available.
- A pre-existing incompatible DNS record or domain binding is a release blocker; do not delete or overwrite an unrelated record without a fresh explicit decision.

## Verification

- Browser QA at 1440 × 960 and 390 × 844 confirms no visible faces, no horizontal overflow, correct crops, readable ring placement, and intact interactions.
- Compare the updated page and approved visual reference in one side-by-side QA board.
- Run `npm test`, `npm run build`, and `npm run test:sites` before deployment.
- Run Wrangler dry-run before the production deploy.
- After deployment, verify HTTPS status, title, key Chinese copy, custom-domain routing, representative asset responses, SPA fallback, and a non-HTML missing API/write route.

## Scope Boundary

- No medical claims, product specification changes, waitlist backend, analytics, or unrelated Cloudflare resources.
- No deployment to an account other than `miyanochiri`.
