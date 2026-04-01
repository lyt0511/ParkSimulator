import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { MOTION_RULES } from "../../dist/core/rules.js";
import {
  CONTROL_RANGE,
  FRAME_DT_SECONDS,
  INITIAL_VEHICLE_STATE,
  clampControlValue,
  normalizeControlInput,
  runDeterministicSequence,
  stepVehicleState
} from "../../dist/core/simulator.js";

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

test("control clamping and normalization obey [-1, 1]", () => {
  assert.equal(CONTROL_RANGE.min, -1);
  assert.equal(CONTROL_RANGE.max, 1);
  assert.equal(clampControlValue(-5), -1);
  assert.equal(clampControlValue(5), 1);

  const normalized = normalizeControlInput({ steering: 3.2, throttle: -9 });
  assert.deepEqual(normalized, { steering: 1, throttle: -1 });
});

test("step semantics: throttle changes speed and position, sample frame fixed", () => {
  assert.equal(FRAME_DT_SECONDS, 1 / 20);

  const moved = stepVehicleState(INITIAL_VEHICLE_STATE, { steering: 0, throttle: 1 }, 1);
  assert.equal(moved.speed, MOTION_RULES.accelPerSecond);
  assert.equal(moved.headingDeg, 0);
  assert.equal(moved.x > 0, true);
});

test("steering only affects heading while moving and sequence is deterministic", () => {
  const stillSteer = stepVehicleState(INITIAL_VEHICLE_STATE, { steering: 1, throttle: 0 }, 1);
  assert.equal(stillSteer.headingDeg, 0);

  const sequence = [
    { steering: 0, throttle: 1 },
    { steering: 1, throttle: 0.5 },
    { steering: -1, throttle: 0.3 }
  ];

  const run1 = runDeterministicSequence(INITIAL_VEHICLE_STATE, sequence);
  const run2 = runDeterministicSequence(INITIAL_VEHICLE_STATE, sequence);
  assert.deepEqual(run1, run2);
});


