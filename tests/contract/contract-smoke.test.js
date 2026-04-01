import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  GAME_PHASES,
  INITIAL_GAME_STATE,
  SAMPLE_RATE_HZ
} from "../../dist/core/simulator.js";
import { SUCCESS_RULES } from "../../dist/core/rules.js";
import { SCENARIOS, SCENARIO_SCHEMAS } from "../../dist/scenes/index.js";
import { APP_CONTRACT, DEBUG_HOOKS, INITIAL_UI_STATE, MENU_ITEMS } from "../../dist/ui/app.js";

const mustExist = [
  "src/core/simulator.ts",
  "src/core/rules.ts",
  "src/scenes/index.ts",
  "src/ui/app.ts",
  "tests/contract/prd-0.3-cases.md",
  "docs/specs/prd-0.3.md",
  "docs/mission/prd-0.3-s01.md"
];

test("slice01 structure exists", () => {
  for (const p of mustExist) {
    assert.equal(fs.existsSync(p), true, `missing: ${p}`);
  }
});

test("slice01 checklist includes skeleton items", () => {
  const content = fs.readFileSync("tests/contract/prd-0.3-cases.md", "utf8");
  assert.match(content, /S01 骨架/);
  assert.match(content, /菜单入口骨架/);
  assert.match(content, /游戏状态壳/);
  assert.match(content, /场景 schema 壳/);
  assert.match(content, /输入常量/);
});

test("simulator exposes game state shell runtime values", () => {
  assert.deepEqual(GAME_PHASES, ["menu", "running", "settled"]);
  assert.deepEqual(INITIAL_GAME_STATE, {
    phase: "menu",
    tick: 0,
    selectedScenario: null,
    settlement: null
  });
});

test("ui menu shell maps scenarios to labels", () => {
  assert.equal(INITIAL_UI_STATE.screen, "menu");
  assert.equal(INITIAL_UI_STATE.selectedScenario, null);
  assert.equal(MENU_ITEMS.length, SCENARIOS.length);

  for (const menu of MENU_ITEMS) {
    assert.equal(SCENARIOS.includes(menu.id), true);
    assert.equal(menu.label, SCENARIO_SCHEMAS[menu.id].label);
  }
});

test("app contract and debug hook snapshot remain consistent", () => {
  assert.deepEqual(APP_CONTRACT.scenarios, SCENARIOS);
  assert.equal(APP_CONTRACT.sampleRateHz, SAMPLE_RATE_HZ);
  assert.deepEqual(APP_CONTRACT.rules, SUCCESS_RULES);
  assert.strictEqual(DEBUG_HOOKS.getContractSnapshot(), APP_CONTRACT);
});


