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
  "p1",
];

const P1_KEYS = [
  "nav",
  "hero",
  "proof",
  "health",
  "edition",
  "finishes",
  "risk",
  "specs",
  "purchase",
];

const P1_FINISH_IDS = [
  "matte-black",
  "mirror-silver",
  "matte-silver",
  "mirror-gold",
  "mirror-rose-gold",
];

const P1_NAV_HREFS = ["#proof", "#health", "#edition", "#finishes", "#purchase"];

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
    assert.deepEqual(Object.keys(pageContentByLocale[locale]).sort(), [...REQUIRED_KEYS].sort());
  }
});

test("provides the same localized P1 Base Ring contract for every locale", () => {
  for (const locale of LOCALES) {
    const p1 = pageContentByLocale[locale].p1;
    const p1Strings = collectStrings(p1).map(({ value }) => value).join(" ");

    assert.ok(p1, `${locale} P1 content must exist`);
    assert.deepEqual(Object.keys(p1), P1_KEYS);
    assert.deepEqual(p1.nav.map((item) => item.href), P1_NAV_HREFS);
    assert.equal(p1.hero.width, "6.0 mm");
    assert.match(p1.hero.innerRing, /Titanium|titanium|钛|チタン/);
    assert.match(p1.hero.price, /¥34,800/);
    assert.match(p1.hero.edition, /First Edition/);
    assert.deepEqual(p1.finishes.options.map((option) => option.id), P1_FINISH_IDS);
    assert.equal(p1.risk.sizeRange, "US 5–12");
    assert.equal(p1.risk.depositPending, true);
    assert.equal(p1.risk.deliveryPending, true);
    assert.match(p1.purchase.localOnlyNote, /local|概念|ローカル|本地/i);
    assert.doesNotMatch(p1Strings, /world's thinnest|世界最細|世界最薄|No\.?1|clinical|临床|臨床|medical effect|医疗效果|治療|診断/i);
  }
});

test("keeps P1 content localized while retaining shared facts", () => {
  for (const locale of LOCALES) {
    assert.ok(pageContentByLocale[locale].p1, `${locale} P1 content must exist before checking localization`);
  }

  assert.match(pageContentByLocale.en.p1.hero.title, /ring/i);
  assert.match(pageContentByLocale.zh.p1.hero.title, /指环|戒指/);
  assert.match(pageContentByLocale.ja.p1.hero.title, /リング/);
  assert.notEqual(pageContentByLocale.en.p1.hero.title, pageContentByLocale.zh.p1.hero.title);
  assert.notEqual(pageContentByLocale.zh.p1.hero.title, pageContentByLocale.ja.p1.hero.title);
});

test("does not expose the retired Chinese landing contract", () => {
  assert.equal("landing" in pageContentByLocale.zh, false);
});


test("does not export the legacy standalone pageContent object", () => {
  assert.equal("pageContent" in contentModule, false);
});

test("keeps navigation and section anchors identical across locales", () => {
  const first = pageContentByLocale.en.p1;
  assert.ok(first, "English P1 content must exist before comparing navigation");

  for (const locale of LOCALES.slice(1)) {
    assert.ok(pageContentByLocale[locale].p1, `${locale} P1 content must exist before comparing navigation`);
    assert.deepEqual(
      pageContentByLocale[locale].p1.nav.map((item) => item.href),
      first.nav.map((item) => item.href),
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

test("keeps the P1 image slots shared while translating alternative text", () => {
  const imageRecords = (p1) => [
    p1.hero.image,
    p1.proof.image,
    p1.health.image,
    p1.edition.image,
    p1.finishes.image,
    p1.risk.image,
  ];
  const japaneseImages = imageRecords(pageContentByLocale.ja.p1);
  assert.ok(japaneseImages.every(Boolean), "Japanese P1 image slots must exist before comparison");

  for (const locale of LOCALES) {
    assert.ok(pageContentByLocale[locale].p1, `${locale} P1 content must exist before image comparison`);
    const images = imageRecords(pageContentByLocale[locale].p1);
    assert.deepEqual(images.map((image) => image.src), japaneseImages.map((image) => image.src));
    for (const image of images) assert.ok(image.alt.trim(), `${locale} P1 image alt must not be empty`);
  }
});

test("does not contain empty localized strings", () => {
  for (const locale of LOCALES) {
    for (const { path, value } of collectStrings(pageContentByLocale[locale], locale)) {
      assert.ok(value.trim(), `${path} must not be empty`);
    }
  }
});
