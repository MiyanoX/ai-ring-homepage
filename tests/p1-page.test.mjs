import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appSource = fs.readFileSync(path.join(projectRoot, "src/App.jsx"), "utf8");
const rendererSource = fs.readFileSync(path.join(projectRoot, "src/JapaneseP1Landing.jsx"), "utf8");

test("routes every supported locale through the shared P1 renderer", () => {
  assert.match(appSource, /import\s+\{\s*P1Landing\s*\}\s+from\s+"\.\/JapaneseP1Landing\.jsx"/);
  assert.match(appSource, /<P1Landing[\s\S]*content=\{content\}/);
  assert.doesNotMatch(appSource, /ChineseLanding/);
  assert.doesNotMatch(appSource, /locale === "ja"\s*\?|locale === "zh"\s*\?/);
});

test("shared P1 renderer owns the purchase decision sections and localized states", () => {
  assert.match(rendererSource, /export function P1Landing/);

  for (const id of ["proof", "health", "edition", "finishes", "risk", "specs", "purchase"]) {
    assert.match(rendererSource, new RegExp(`id=\\"${id}\\"`), `${id} section must be addressable`);
  }

  assert.match(rendererSource, /className="p1-page"/);
  assert.match(rendererSource, /<PreviewForm[\s\S]*variant="p1"/);
  assert.doesNotMatch(rendererSource, /P1 Base Ring の要点|対応サイズ|予約金|お届け|を刻印（無料）|無料刻印を追加できます/);
});
