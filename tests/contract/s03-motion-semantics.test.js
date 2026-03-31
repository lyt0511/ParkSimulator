import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("slice03 mission card exists", () => {
  assert.equal(fs.existsSync("docs/mission/prd-0.3-s03.md"), true);
});

test("slice03 checklist includes motion semantic items", () => {
  const content = fs.readFileSync("tests/contract/prd-0.3-cases.md", "utf8");
  assert.match(content, /S03 车辆运动与方向盘语义/);
  assert.match(content, /输入范围限制为\[-1,1\]/);
  assert.match(content, /采样频率为20Hz/);
  assert.match(content, /确定性/);
});

test("simulator defines normalized control input contract", () => {
  const content = fs.readFileSync("src/core/simulator.ts", "utf8");
  assert.match(content, /normalizeControlInput/);
  assert.match(content, /clampControlValue/);
  assert.match(content, /CONTROL_RANGE/);
});

test("simulator defines frame and state stepping semantics", () => {
  const content = fs.readFileSync("src/core/simulator.ts", "utf8");
  assert.match(content, /FRAME_DT_SECONDS/);
  assert.match(content, /VehicleState/);
  assert.match(content, /stepVehicleState/);
  assert.match(content, /runDeterministicSequence/);
});

test("rules expose motion semantic constants", () => {
  const content = fs.readFileSync("src/core/rules.ts", "utf8");
  assert.match(content, /MOTION_RULES/);
  assert.match(content, /maxSpeed/);
  assert.match(content, /accelPerSecond/);
  assert.match(content, /steeringRateDegPerSecond/);
});
