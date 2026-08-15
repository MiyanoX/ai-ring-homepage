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
    const expectedKeys = locale === "zh" ? [...REQUIRED_KEYS, "landing"] : REQUIRED_KEYS;
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
