import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { pageContentByLocale } from "../src/content.js";
import {
  P1_FUNNEL_EVENTS,
  buildP1FunnelEvent,
  getP1ReservationMode,
} from "../src/lib/p1-funnel.js";

test("defines the smallest P1 funnel without carrying personal information", () => {
  assert.deepEqual(P1_FUNNEL_EVENTS, [
    "landing_view",
    "reserve_click",
    "checkout_view",
    "payment_success",
  ]);
  assert.deepEqual(buildP1FunnelEvent("reserve_click", { locale: "ja", surface: "hero" }), {
    name: "reserve_click",
    locale: "ja",
    surface: "hero",
  });
  assert.throws(
    () => buildP1FunnelEvent("reserve_click", { email: "user@example.com" }),
    /personal information/i,
  );
});

test("keeps every localized P1 page local-only while deposit and delivery remain pending", () => {
  for (const locale of ["en", "zh", "ja"]) {
    assert.equal(getP1ReservationMode(pageContentByLocale[locale].p1.risk), "local-only");
  }
  assert.equal(
    getP1ReservationMode({ depositPending: false, deliveryPending: false }),
    "production-ready",
  );
});

test("keeps the shared P1 preview declarative and free of client-side persistence", () => {
  const pageSource = fs.readFileSync(path.join(process.cwd(), "src/JapaneseP1Landing.jsx"), "utf8");
  const previewSource = fs.readFileSync(path.join(process.cwd(), "src/PreviewForm.jsx"), "utf8");

  assert.match(pageSource, /data-funnel-event="landing_view"/);
  assert.doesNotMatch(pageSource, /fetch\s*\(/);
  assert.doesNotMatch(pageSource, /localStorage/);
  assert.doesNotMatch(previewSource, /fetch\s*\(/);
  assert.doesNotMatch(previewSource, /localStorage/);
  for (const locale of ["en", "zh", "ja"]) {
    assert.match(pageContentByLocale[locale].p1.hero.localOnlyNote, /order|订单|注文/i);
  }
});
