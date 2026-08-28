import assert from "node:assert/strict";
import test from "node:test";

import { pageContentByLocale } from "../src/content.js";
import { buildP1PurchaseSummary, getP1FinishOption } from "../src/lib/p1-product.js";

const p1 = pageContentByLocale.ja.p1;

test("resolves only the five P1 Base Ring finishes", () => {
  assert.equal(getP1FinishOption(p1.finishes.options, "mirror-gold").name, "ミラーゴールド");
  assert.equal(getP1FinishOption(p1.finishes.options, "design"), null);
});

test("builds a truthful purchase summary without requiring a final size", () => {
  assert.deepEqual(
    buildP1PurchaseSummary({ p1, selectedFinish: "mirror-rose-gold", engraving: "  Aki  " }),
    {
      productName: "ELARA One · Base Ring",
      finish: "ミラーローズゴールド",
      price: "¥34,800（税込）",
      sizeRange: "US 5–12",
      sizeStatus: "Sizing Kit 後に確定",
      engraving: "Aki",
      engravingIncluded: true,
    },
  );
});
