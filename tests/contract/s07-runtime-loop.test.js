import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("slice07 mission card exists", () => {
  assert.equal(fs.existsSync("docs/mission/prd-0.3-s07.md"), true);
});

test("slice07 checklist includes runtime loop items", () => {
  const content = fs.readFileSync("tests/contract/prd-0.3-cases.md", "utf8");
  assert.match(content, /S07 联动内核闭环/);
  assert.match(content, /4个场景可正确注入固定初始位姿/);
  assert.match(content, /输入控制可驱动车辆状态推进/);
  assert.match(content, /状态可进入判定并返回结算结果/);
});

test("unit runner supports s07 scope", () => {
  const content = fs.readFileSync("tests/contract/run-unit.js", "utf8");
  assert.match(content, /s07/);
  assert.match(content, /s07-runtime-loop\.test\.js/);
});

test("simulator exposes runtime loop APIs for scenario->control->settlement", () => {
  const content = fs.readFileSync("src/core/simulator.ts", "utf8");
  assert.match(content, /createRuntimeStateFromScenario/);
  assert.match(content, /stepRuntimeState/);
  assert.match(content, /settleRuntimeState/);
  assert.match(content, /SCENARIO_SCHEMAS/);
  assert.match(content, /initialPose/);
  assert.match(content, /stepVehicleState/);
  assert.match(content, /settleSimulation/);
});
