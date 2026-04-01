import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { SETTLEMENT_RULES, SUCCESS_RULES } from "../../dist/core/rules.js";
import {
  SETTLEMENT_TRIGGERS,
  evaluateSuccessCriteria,
  isTimedOut,
  settleSimulation,
  shouldAutoSettleByStill
} from "../../dist/core/simulator.js";

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

test("rules and triggers expose settlement constants", () => {
  assert.deepEqual(SETTLEMENT_TRIGGERS, ["manual", "auto_still"]);
  assert.equal(SUCCESS_RULES.maxAngleDeg, 8);
  assert.equal(SUCCESS_RULES.stillSeconds, 2);
  assert.equal(SETTLEMENT_RULES.timeoutSeconds, 120);
});

test("success and timeout boundaries are inclusive", () => {
  assert.equal(
    evaluateSuccessCriteria({ coverage: 1, angleDeg: SUCCESS_RULES.maxAngleDeg, stillSeconds: 2 }),
    true
  );
  assert.equal(shouldAutoSettleByStill(2), true);
  assert.equal(isTimedOut(120), true);
});

test("settlement returns expected result for success and not_still failure", () => {
  const success = settleSimulation({
    trigger: "manual",
    coverage: 1,
    angleDeg: 5,
    stillSeconds: 2,
    elapsedSeconds: 10
  });

  assert.deepEqual(success, { success: true, trigger: "manual" });

  const notStill = settleSimulation({
    trigger: "auto_still",
    coverage: 1,
    angleDeg: 2,
    stillSeconds: 1.9,
    elapsedSeconds: 10
  });

  assert.deepEqual(notStill, { success: false, reason: "not_still", trigger: "auto_still" });
});


