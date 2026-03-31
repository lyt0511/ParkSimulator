# 任务卡 Slice 01 - 顶层骨架

## Goal

- 实现原型工程的顶层骨架，覆盖菜单入口、游戏状态壳、场景 schema 壳、输入常量与测试脚本骨架。

## Context

- 需求规格：`docs/specs/prd-0.3.md`
- 总计划：`docs/plans/prd-0.3-plan.md`
- 相关文件：`src/...` `tests/...` `package.json`
- 仓库规则：`AGENTS.md`

## Constraints

- 不允许修改：`src/auth/**`, `src/infra/**`
- 不允许新增生产依赖
- 不允许无关重构
- 保持公开接口兼容

## Done when

- 行为：
  - 菜单入口骨架存在并可引用场景列表
  - 游戏状态壳存在（含初始状态）
  - 场景 schema 壳存在（含版本与映射）
  - 输入常量存在并可用于后续切片
  - 测试脚本骨架可按 scope 执行
- 测试通过：`npm run test:unit -- s01 && npm run build`
