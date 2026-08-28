import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appSource = fs.readFileSync(path.join(projectRoot, "src/App.jsx"), "utf8");
const pagePath = path.join(projectRoot, "src/JapaneseP1Landing.jsx");

test("routes Japanese locale to the dedicated P1 page", () => {
  assert.match(appSource, /import\s+\{\s*JapaneseP1Landing\s*\}\s+from\s+"\.\/JapaneseP1Landing\.jsx"/);
  assert.match(appSource, /locale === "ja"\s*\?/);
  assert.match(appSource, /<JapaneseP1Landing[\s\S]*content=\{content\}/);
  assert.match(appSource, /locale === "zh"\s*\?/);
});

test("P1 page owns the seven purchase-decision sections and local preview", () => {
  assert.equal(fs.existsSync(pagePath), true);
  const source = fs.readFileSync(pagePath, "utf8");

  for (const id of ["proof", "health", "edition", "finishes", "risk", "specs", "purchase"]) {
    assert.match(source, new RegExp(`id=\\"${id}\\"`), `${id} section must be addressable`);
  }
  assert.match(source, /className=\"p1-page\"/);
  assert.match(source, /<PreviewForm[\s\S]*variant=\"ja-p1\"/);
  assert.match(source, /localOnlyNote|localOnly/);
});
