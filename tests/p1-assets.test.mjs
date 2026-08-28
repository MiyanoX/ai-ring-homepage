import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { pageContentByLocale } from "../src/content.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("maps P1 Japanese image slots to checked-in assets", () => {
  const p1 = pageContentByLocale.ja.p1;
  const imageSlots = [
    ["hero", p1.hero.image],
    ["proof", p1.proof.image],
    ["health", p1.health.image],
    ["edition", p1.edition.image],
    ["risk", p1.risk.image],
  ];

  for (const [slot, image] of imageSlots) {
    assert.ok(image?.src, `${slot} image slot must exist`);
    assert.ok(image.alt.trim(), `${slot} image needs descriptive alt text`);
    const assetPath = path.join(projectRoot, "public", image.src);
    assert.ok(fs.existsSync(assetPath), `${slot} asset must exist at ${image.src}`);
  }
});

test("P1 Finish asset names stay aligned with the five-option content contract", () => {
  const { options, image } = pageContentByLocale.ja.p1.finishes;

  assert.equal(options.length, 5);
  assert.equal(image.src, "/assets/elara/p1-finishes.png");
  assert.ok(fs.existsSync(path.join(projectRoot, "public", image.src)));
});
