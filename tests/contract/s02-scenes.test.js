import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const scenesFile = "src/scenes/index.ts";

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

test("slice02 exposes four scenarios", () => {
  const content = fs.readFileSync(scenesFile, "utf8");
  assert.match(content, /normal_reverse_parking/);
  assert.match(content, /narrow_reverse_parking/);
  assert.match(content, /normal_parallel_parking/);
  assert.match(content, /narrow_parallel_parking/);
});

test("slice02 scenario schema includes fixed initial pose", () => {
  const content = fs.readFileSync(scenesFile, "utf8");
  assert.match(content, /initialPose/);
  assert.match(content, /x:\s*-?\d+(\.\d+)?/);
  assert.match(content, /y:\s*-?\d+(\.\d+)?/);
  assert.match(content, /headingDeg:\s*-?\d+(\.\d+)?/);
  assert.match(content, /speed:\s*0/);
});

test("slice02 all scenario initial speeds are zero", () => {
  const content = fs.readFileSync(scenesFile, "utf8");
  const speedMatches = content.match(/speed:\s*0/g) ?? [];
  assert.equal(speedMatches.length, 4, "expected 4 initial speed definitions with 0");
});
