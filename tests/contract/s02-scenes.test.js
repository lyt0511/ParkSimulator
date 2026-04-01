import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { SCENARIOS, SCENARIO_SCHEMAS } from "../../dist/scenes/index.js";

test("slice02 mission card exists", () => {
  assert.equal(fs.existsSync("docs/mission/prd-0.3-s02.md"), true);
});

test("slice02 checklist includes schema and initial pose items", () => {
  const content = fs.readFileSync("tests/contract/prd-0.3-cases.md", "utf8");
  assert.match(content, /S02 场景 schema 与固定初始位姿/);
  assert.match(content, /4个场景均存在/);
  assert.match(content, /初始状态字段完整/);
  assert.match(content, /初始速度为0/);
});

test("slice02 exposes exactly four scenarios with valid schemas", () => {
  assert.equal(SCENARIOS.length, 4);

  const unique = new Set(SCENARIOS);
  assert.equal(unique.size, SCENARIOS.length);

  for (const id of SCENARIOS) {
    const schema = SCENARIO_SCHEMAS[id];
    assert.equal(schema.id, id);
    assert.ok(schema.label.length > 0);
    assert.equal(["normal", "narrow"].includes(schema.laneType), true);
    assert.equal(["reverse", "parallel"].includes(schema.parkingType), true);
  }
});

test("slice02 scenario schema includes fixed initial pose and zero speed", () => {
  for (const id of SCENARIOS) {
    const pose = SCENARIO_SCHEMAS[id].initialPose;
    assert.equal(Number.isFinite(pose.x), true);
    assert.equal(Number.isFinite(pose.y), true);
    assert.equal(Number.isFinite(pose.headingDeg), true);
    assert.equal(pose.speed, 0);
  }
});

test("slice02 scenario lane and parking combinations cover 4 fixed scenes", () => {
  const combos = new Set(
    SCENARIOS.map((id) => `${SCENARIO_SCHEMAS[id].laneType}-${SCENARIO_SCHEMAS[id].parkingType}`)
  );

  assert.deepEqual(combos, new Set(["normal-reverse", "narrow-reverse", "normal-parallel", "narrow-parallel"]));
});


