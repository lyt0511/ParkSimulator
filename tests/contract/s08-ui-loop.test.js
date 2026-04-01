import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("slice08 mission card exists", () => {
  assert.equal(fs.existsSync("docs/mission/prd-0.3-s08.md"), true);
});

test("slice08 checklist includes ui loop items", () => {
  const content = fs.readFileSync("tests/contract/prd-0.3-cases.md", "utf8");
  assert.match(content, /S08 UI 交互闭环/);
  assert.match(content, /4个场景并进入运行态/);
  assert.match(content, /左\/右.*单击离散步进/);
  assert.match(content, /上\/下.*按下持续生效，松开停止持续输入/);
  assert.match(content, /结算结果与失败主因标签/);
});

test("unit runner supports s08 scope", () => {
  const content = fs.readFileSync("tests/contract/run-unit.js", "utf8");
  assert.match(content, /s08/);
  assert.match(content, /s08-ui-loop\.test\.js/);
});

test("ui exposes interaction loop apis", () => {
  const content = fs.readFileSync("src/ui/app.ts", "utf8");
  assert.match(content, /UI_CONTROL_LAYOUT/);
  assert.match(content, /STEERING_HALF_TURN_STEP/);
  assert.match(content, /enterScenarioFromMenu/);
  assert.match(content, /clickSteeringStep/);
  assert.match(content, /pressThrottle/);
  assert.match(content, /releaseThrottle/);
  assert.match(content, /tickUIRuntime/);
  assert.match(content, /manuallySettleUIRuntime/);
  assert.match(content, /deriveVisibleSettlementLabel/);
});

test("ui uses core runtime api for scenario-control-settlement loop", () => {
  const content = fs.readFileSync("src/ui/app.ts", "utf8");
  assert.match(content, /createRuntimeStateFromScenario/);
  assert.match(content, /stepRuntimeState/);
  assert.match(content, /shouldAutoSettleByStill/);
  assert.match(content, /settleRuntimeState/);
});

test("browser entry and local web scripts exist", () => {
  const packageContent = fs.readFileSync("package.json", "utf8");
  assert.match(packageContent, /"web:build"/);
  assert.match(packageContent, /"web:serve"/);
  assert.match(packageContent, /"web:run"/);

  const browserContent = fs.readFileSync("src/ui/browser.ts", "utf8");
  assert.match(browserContent, /setInterval/);
  assert.match(browserContent, /pressThrottle/);
  assert.match(browserContent, /releaseThrottle/);
  assert.match(browserContent, /enterScenarioFromMenu/);

  assert.equal(fs.existsSync("public/index.html"), true);
  assert.equal(fs.existsSync("scripts/serve-static.mjs"), true);
  assert.equal(fs.existsSync("scripts/web-run.mjs"), true);
});
