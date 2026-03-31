import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const mustExist = [
  "src/core/simulator.ts",
  "src/core/rules.ts",
  "src/scenes/index.ts",
  "src/ui/app.ts",
  "tests/contract/prd-0.3-cases.md",
  "spec/prd-0.3.md"
];

test("scheme B structure exists", () => {
  for (const p of mustExist) {
    assert.equal(fs.existsSync(p), true, `missing: ${p}`);
  }
});

test("contract checklist includes normal/boundary/failure", () => {
  const content = fs.readFileSync("tests/contract/prd-0.3-cases.md", "utf8");
  assert.match(content, /正常路径/);
  assert.match(content, /边界路径/);
  assert.match(content, /失败路径/);
});
