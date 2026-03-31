import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

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

test("ui exposes non-invasive debug snapshot hook", () => {
  const content = fs.readFileSync("src/ui/app.ts", "utf8");
  assert.match(content, /DEBUG_HOOKS/);
  assert.match(content, /getContractSnapshot/);
  assert.match(content, /APP_CONTRACT/);
});
