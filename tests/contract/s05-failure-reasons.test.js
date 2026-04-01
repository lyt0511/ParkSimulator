import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { FAILURE_REASONS } from "../../dist/core/rules.js";
import { settleSimulation } from "../../dist/core/simulator.js";
import { FAILURE_REASON_LABELS } from "../../dist/ui/app.js";

test("slice05 mission card exists", () => {
  assert.equal(fs.existsSync("docs/mission/prd-0.3-s05.md"), true);
});

test("slice05 checklist includes six failure reasons", () => {
  const content = fs.readFileSync("tests/contract/prd-0.3-cases.md", "utf8");
  assert.match(content, /S05 6类失败原因可见输出/);
  assert.match(content, /angle_over_limit/);
  assert.match(content, /cross_line/);
  assert.match(content, /not_still/);
  assert.match(content, /collision/);
  assert.match(content, /out_of_bounds/);
  assert.match(content, /timeout/);
});

test("rules and ui mapping both expose six failure reasons", () => {
  assert.deepEqual(FAILURE_REASONS, [
    "angle_over_limit",
    "cross_line",
    "not_still",
    "collision",
    "out_of_bounds",
    "timeout"
  ]);

  for (const reason of FAILURE_REASONS) {
    assert.equal(typeof FAILURE_REASON_LABELS[reason], "string");
    assert.equal(FAILURE_REASON_LABELS[reason].length > 0, true);
  }
});

test("settleSimulation can produce each failure reason", () => {
  const base = {
    trigger: "manual",
    elapsedSeconds: 10,
    stillSeconds: 2,
    coverage: 1,
    angleDeg: 0
  };

  assert.equal(settleSimulation({ ...base, collision: true }).reason, "collision");
  assert.equal(settleSimulation({ ...base, outOfBounds: true }).reason, "out_of_bounds");
  assert.equal(settleSimulation({ ...base, crossLine: true }).reason, "cross_line");
  assert.equal(settleSimulation({ ...base, elapsedSeconds: 120 }).reason, "timeout");
  assert.equal(settleSimulation({ ...base, angleDeg: 9 }).reason, "angle_over_limit");
  assert.equal(settleSimulation({ ...base, stillSeconds: 1 }).reason, "not_still");
});

test("failure reason priority keeps safety signals first", () => {
  const result = settleSimulation({
    trigger: "manual",
    elapsedSeconds: 130,
    stillSeconds: 0,
    coverage: 0,
    angleDeg: 30,
    collision: true,
    outOfBounds: true,
    crossLine: true
  });

  assert.equal(result.reason, "collision");
});



