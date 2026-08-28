import assert from "node:assert/strict";
import test from "node:test";

import { pageContentByLocale } from "../src/content.js";
import { buildP1ReservationState } from "../src/lib/p1-risk.js";

const risk = pageContentByLocale.ja.p1.risk;

test("keeps the P1 reservation flow blocked while money and delivery terms are pending", () => {
  assert.deepEqual(buildP1ReservationState(risk), {
    sizeRange: "US 5–12",
    steps: risk.steps,
    deposit: {
      label: "予約金：最終確認中（候補 ¥3,000）",
      pending: true,
    },
    delivery: {
      label: "お届け時期：生産計画の確認後にご案内",
      pending: true,
    },
    canReserve: false,
  });
});

test("exposes the trust and privacy disclosures needed before a production reservation", () => {
  assert.match(risk.operator, /運営主体/);
  assert.match(risk.privacy, /メール|保存|個人/);
  assert.match(risk.productionGate, /確定|確認/);
});
