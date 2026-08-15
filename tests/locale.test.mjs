import assert from "node:assert/strict";
import test from "node:test";
import {
  buildLocalePath,
  getLocaleFromBrowserLanguage,
  getLocaleNavigationLinks,
  getLocaleFromPath,
  readStoredLocale,
  resolveInitialLocale,
  writeStoredLocale,
} from "../src/i18n/locale.js";

test("reads supported locales from the first URL path segment", () => {
  assert.equal(getLocaleFromPath("/zh/"), "zh");
  assert.equal(getLocaleFromPath("/ja/#rituals"), "ja");
  assert.equal(getLocaleFromPath("/en/insight"), "en");
  assert.equal(getLocaleFromPath("/"), null);
  assert.equal(getLocaleFromPath("/fr/"), null);
});

test("builds locale paths while preserving the current hash", () => {
  assert.equal(buildLocalePath("ja", "#rituals"), "/ja/#rituals");
  assert.equal(buildLocalePath("zh", "rituals"), "/zh/#rituals");
  assert.equal(buildLocalePath("fr", ""), "/en/");
});

test("creates one active and two inactive locale navigation links", () => {
  assert.deepEqual(getLocaleNavigationLinks({ locale: "zh", hash: "#insight" }), [
    { locale: "en", href: "/en/#insight", current: false },
    { locale: "zh", href: "/zh/#insight", current: true },
    { locale: "ja", href: "/ja/#insight", current: false },
  ]);
});

test("maps browser language families to the supported locales", () => {
  assert.equal(getLocaleFromBrowserLanguage("zh-CN"), "zh");
  assert.equal(getLocaleFromBrowserLanguage("ja-JP"), "ja");
  assert.equal(getLocaleFromBrowserLanguage("de-DE"), "en");
});

test("uses an explicit path before stored and browser preferences", () => {
  const storage = new Map([["elara-locale", "zh"]]);
  const adapter = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  };

  assert.equal(
    resolveInitialLocale({ pathname: "/ja/", storage: adapter, browserLanguage: "en-US" }),
    "ja",
  );
  assert.equal(
    resolveInitialLocale({ pathname: "/", storage: adapter, browserLanguage: "ja-JP" }),
    "zh",
  );
});

test("falls back safely when storage is unavailable", () => {
  const brokenStorage = {
    getItem() {
      throw new Error("storage unavailable");
    },
    setItem() {
      throw new Error("storage unavailable");
    },
  };

  assert.equal(readStoredLocale(brokenStorage), null);
  assert.equal(writeStoredLocale(brokenStorage, "ja"), false);
  assert.equal(
    resolveInitialLocale({ pathname: "/", storage: brokenStorage, browserLanguage: "ja-JP" }),
    "ja",
  );
});
