import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { FRAME_DT_SECONDS } from "../../dist/core/simulator.js";
import {
  APP_CONTRACT,
  DEBUG_HOOKS,
  INITIAL_UI_STATE,
  enterScenarioFromMenu,
  tickUIRuntime
} from "../../dist/ui/app.js";
import { SCENARIOS } from "../../dist/scenes/index.js";

test("slice06 mission card exists", () => {
  assert.equal(fs.existsSync("docs/mission/prd-0.3-s06.md"), true);
});

test("slice06 checklist includes hardening and debug hook items", () => {
  const content = fs.readFileSync("tests/contract/prd-0.3-cases.md", "utf8");
  assert.match(content, /S06 测试加固、调试钩子与交付整理/);
  assert.match(content, /smoke 校验可执行/);
  assert.match(content, /调试钩子可导出契约快照/);
  assert.match(content, /DoD 条目可勾选、可复现/);
});

test("unit runner supports s06 scope", () => {
  const content = fs.readFileSync("tests/contract/run-unit.js", "utf8");
  assert.match(content, /s06/);
  assert.match(content, /s06-delivery-hardening\.test\.js/);
});

test("debug hook exposes stable contract snapshot", () => {
  const snapshot = DEBUG_HOOKS.getContractSnapshot();

  assert.strictEqual(snapshot, APP_CONTRACT);
  assert.deepEqual(snapshot.scenarios, SCENARIOS);
  assert.equal(snapshot.sampleRateHz, 20);
  assert.ok("failureReasonLabels" in snapshot);
});

test("debug hook is non-invasive to runtime state", () => {
  const scenario = SCENARIOS[0];
  const running = enterScenarioFromMenu(INITIAL_UI_STATE, scenario);
  const before = DEBUG_HOOKS.getContractSnapshot();

  const advanced = tickUIRuntime(running, undefined, FRAME_DT_SECONDS);
  const after = DEBUG_HOOKS.getContractSnapshot();

  assert.strictEqual(before, after);
  assert.equal(advanced.runtime?.tick, 1);
  assert.equal(INITIAL_UI_STATE.runtime, null);
});


