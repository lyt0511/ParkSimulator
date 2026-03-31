import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("slice04 mission card exists", () => {
  assert.equal(fs.existsSync("docs/mission/prd-0.3-s04.md"), true);
});

test("slice04 checklist includes settlement items", () => {
  const content = fs.readFileSync("tests/contract/prd-0.3-cases.md", "utf8");
  assert.match(content, /S04 成功判定与结算机制/);
  assert.match(content, /8度角边界判定成功/);
  assert.match(content, /静止2秒边界判定成功/);
  assert.match(content, /手动结束与自动结束均可触发/);
});

test("rules expose settlement constants", () => {
  const content = fs.readFileSync("src/core/rules.ts", "utf8");
  assert.match(content, /SUCCESS_RULES/);
  assert.match(content, /maxAngleDeg:\s*8/);
  assert.match(content, /stillSeconds:\s*2/);
  assert.match(content, /SETTLEMENT_RULES/);
  assert.match(content, /timeoutSeconds:\s*120/);
});

test("simulator exposes settlement and success evaluators", () => {
  const content = fs.readFileSync("src/core/simulator.ts", "utf8");
  assert.match(content, /SETTLEMENT_TRIGGERS/);
  assert.match(content, /evaluateSuccessCriteria/);
  assert.match(content, /shouldAutoSettleByStill/);
  assert.match(content, /settleSimulation/);
});

test("simulator settlement handles boundary comparators inclusively", () => {
  const content = fs.readFileSync("src/core/simulator.ts", "utf8");
  assert.match(content, /angleDeg\s*<=\s*SUCCESS_RULES\.maxAngleDeg/);
  assert.match(content, /stillSeconds\s*>=\s*SUCCESS_RULES\.stillSeconds/);
  assert.match(content, /elapsedSeconds\s*>=\s*SETTLEMENT_RULES\.timeoutSeconds/);
});
