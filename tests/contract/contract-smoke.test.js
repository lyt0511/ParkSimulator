import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

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

test("simulator exposes game state shell", () => {
  const content = fs.readFileSync("src/core/simulator.ts", "utf8");
  assert.match(content, /GAME_PHASES/);
  assert.match(content, /GameState/);
  assert.match(content, /INITIAL_GAME_STATE/);
});

test("scenes exposes schema shell", () => {
  const content = fs.readFileSync("src/scenes/index.ts", "utf8");
  assert.match(content, /SCENARIO_SCHEMA_VERSION/);
  assert.match(content, /ScenarioSchema/);
  assert.match(content, /SCENARIO_SCHEMAS/);
});

test("ui exposes menu shell", () => {
  const content = fs.readFileSync("src/ui/app.ts", "utf8");
  assert.match(content, /MENU_ITEMS/);
  assert.match(content, /INITIAL_UI_STATE/);
});
