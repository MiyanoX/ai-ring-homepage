import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { pageContentByLocale } from "../src/content.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["en", "zh", "ja"];

test("maps every localized P1 image slot to checked-in assets", () => {
  for (const locale of LOCALES) {
    const p1 = pageContentByLocale[locale].p1;
    const imageSlots = [
      ["hero", p1.hero.image],
      ["proof", p1.proof.image],
      ["health", p1.health.image],
      ["edition", p1.edition.image],
      ["finishes", p1.finishes.image],
      ["risk", p1.risk.image],
    ];

    for (const [slot, image] of imageSlots) {
      assert.ok(image?.src, `${locale} ${slot} image slot must exist`);
      assert.ok(image.alt.trim(), `${locale} ${slot} image needs descriptive alt text`);
      const assetPath = path.join(projectRoot, "public", image.src);
      assert.ok(fs.existsSync(assetPath), `${locale} ${slot} asset must exist at ${image.src}`);
    }
  }
});

test("P1 finish assets stay aligned with the five-option content contract", () => {
  for (const locale of LOCALES) {
    const { options, image } = pageContentByLocale[locale].p1.finishes;

    assert.equal(options.length, 5, `${locale} must expose five finishes`);
    assert.equal(image.src, "/assets/elara/p1-finishes.png", `${locale} finish image must be shared`);
    assert.ok(fs.existsSync(path.join(projectRoot, "public", image.src)));
  }
});
