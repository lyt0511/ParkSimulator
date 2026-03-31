import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

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

test("rules expose six failure reason enum values", () => {
  const content = fs.readFileSync("src/core/rules.ts", "utf8");
  assert.match(content, /FAILURE_REASONS/);
  assert.match(content, /"angle_over_limit"/);
  assert.match(content, /"cross_line"/);
  assert.match(content, /"not_still"/);
  assert.match(content, /"collision"/);
  assert.match(content, /"out_of_bounds"/);
  assert.match(content, /"timeout"/);
});

test("simulator can produce all six failure reasons", () => {
  const content = fs.readFileSync("src/core/simulator.ts", "utf8");
  assert.match(content, /return\s+"collision"/);
  assert.match(content, /return\s+"out_of_bounds"/);
  assert.match(content, /return\s+"cross_line"/);
  assert.match(content, /return\s+"timeout"/);
  assert.match(content, /return\s+"angle_over_limit"/);
  assert.match(content, /return\s+"not_still"/);
});

test("ui exposes visible labels and mapping consistency hooks", () => {
  const content = fs.readFileSync("src/ui/app.ts", "utf8");
  assert.match(content, /FAILURE_REASON_LABELS/);
  assert.match(content, /angle_over_limit/);
  assert.match(content, /cross_line/);
  assert.match(content, /not_still/);
  assert.match(content, /collision/);
  assert.match(content, /out_of_bounds/);
  assert.match(content, /timeout/);
  assert.match(content, /failureReasonLabels/);
});
