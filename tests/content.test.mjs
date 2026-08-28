import assert from "node:assert/strict";
import test from "node:test";
import * as contentModule from "../src/content.js";

const { pageContentByLocale } = contentModule;

const LOCALES = ["en", "zh", "ja"];
const REQUIRED_KEYS = [
  "seo",
  "ui",
  "nav",
  "hero",
  "statement",
  "rituals",
  "insight",
  "finishes",
  "preview",
  "footer",
];

function collectStrings(value, path = "content") {
  if (typeof value === "string") return [{ path, value }];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectStrings(item, `${path}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => collectStrings(child, `${path}.${key}`));
  }
  return [];
}

test("exposes exactly the three supported locale records", () => {
  assert.deepEqual(Object.keys(pageContentByLocale).sort(), [...LOCALES].sort());
  for (const locale of LOCALES) {
    const expectedKeys =
      locale === "zh"
        ? [...REQUIRED_KEYS, "landing"]
        : locale === "ja"
          ? [...REQUIRED_KEYS, "p1"]
          : REQUIRED_KEYS;
    assert.deepEqual(Object.keys(pageContentByLocale[locale]).sort(), [...expectedKeys].sort());
  }
});

test("provides the complete Chinese six-block landing contract", () => {
  const landing = pageContentByLocale.zh.landing;

  assert.deepEqual(Object.keys(landing), [
    "nav",
    "hero",
    "design",
    "technology",
    "daily",
    "trust",
    "purchase",
    "gift",
  ]);
  assert.equal(landing.purchase.price, "¥59,500 起");
  assert.match(landing.design.specs.map((item) => item.value).join(" "), /6 mm/);
  assert.match(landing.design.specs.map((item) => item.value).join(" "), /US 6\+/);
  assert.ok(landing.gift.nfcTitle);

  for (const image of [landing.hero.image, landing.technology.image, landing.trust.image, landing.gift.image]) {
    assert.ok(image.src.startsWith("/assets/elara/"));
    assert.ok(image.alt.trim());
  }
});

test("keeps the Chinese landing content exclusive to the Chinese record", () => {
  assert.equal("landing" in pageContentByLocale.en, false);
  assert.equal("landing" in pageContentByLocale.ja, false);
});

test("provides the Japanese P1 Base Ring content contract", () => {
  const p1 = pageContentByLocale.ja.p1;

  assert.ok(p1, "Japanese P1 content must exist");
  assert.deepEqual(Object.keys(p1), [
    "nav",
    "hero",
    "proof",
    "health",
    "edition",
    "finishes",
    "risk",
    "specs",
    "purchase",
  ]);
  assert.equal(p1.hero.price, "¥34,800（税込）");
  assert.equal(p1.hero.width, "6.0 mm");
  assert.equal(p1.hero.innerRing, "チタン内リング");
  assert.equal(p1.hero.edition, "First Edition｜無料刻印");
  assert.deepEqual(
    p1.finishes.options.map((option) => option.id),
    ["matte-black", "mirror-silver", "matte-silver", "mirror-gold", "mirror-rose-gold"],
  );
  assert.equal(p1.risk.sizeRange, "US 5–12");
  assert.equal(p1.risk.depositPending, true);
  assert.equal(p1.risk.deliveryPending, true);
  assert.match(p1.purchase.localOnlyNote, /ローカル|概念/);
});

test("keeps P1 claims honest and Japanese content independent", () => {
  const p1 = pageContentByLocale.ja.p1;
  const p1Strings = collectStrings(p1).map(({ value }) => value).join(" ");

  assert.doesNotMatch(p1Strings, /世界一|世界最細|No\.?1|臨床|治療|診断/);
  assert.match(p1Strings, /コンセプト|未定|確認中|予定/);
  assert.equal("p1" in pageContentByLocale.en, false);
  assert.equal("p1" in pageContentByLocale.zh, false);
});


test("does not export the legacy standalone pageContent object", () => {
  assert.equal("pageContent" in contentModule, false);
});

test("keeps navigation and section anchors identical across locales", () => {
  const first = pageContentByLocale.en;
  for (const locale of LOCALES.slice(1)) {
    assert.deepEqual(
      pageContentByLocale[locale].nav.map((item) => item.href),
      first.nav.map((item) => item.href),
    );
    assert.deepEqual(
      pageContentByLocale[locale].rituals.items.map((item) => item.index),
      first.rituals.items.map((item) => item.index),
    );
  }
});

test("keeps the same image sources while translating alternative text", () => {
  const imageRecords = (content) => [
    content.hero.image,
    content.statement.image,
    ...content.rituals.items.map((item) => item.image),
    content.insight.image,
    content.finishes.image,
  ];
  const englishImages = imageRecords(pageContentByLocale.en);
  for (const locale of LOCALES) {
    const images = imageRecords(pageContentByLocale[locale]);
    assert.deepEqual(images.map((image) => image.src), englishImages.map((image) => image.src));
    for (const image of images) assert.ok(image.alt.trim(), `${locale} image alt must not be empty`);
  }
});

test("does not contain empty localized strings", () => {
  for (const locale of LOCALES) {
    for (const { path, value } of collectStrings(pageContentByLocale[locale], locale)) {
      assert.ok(value.trim(), `${path} must not be empty`);
    }
  }
});
