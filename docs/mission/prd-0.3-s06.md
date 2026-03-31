# 任务卡 Slice 06 - 测试加固、调试钩子与交付整理

## Goal
- 在不扩展功能范围的前提下，补齐 PRD-0.3 的合同测试加固项。
- 提供最小调试钩子，便于前端与测试快速核对契约快照。
- 整理交付清单，确保 DoD 项可勾选、可复现。

## Context
- 需求规格：`docs/specs/prd-0.3.md`
- 总计划：`docs/plans/prd-0.3-plan.md`
- 相关文件：`src/ui/app.ts`、`tests/contract/*`、`package.json`
- 仓库规则：`AGENTS.md`

## Constraints
- 不允许修改：`src/auth/**`、`src/infra/**`
- 不允许新增生产依赖
- 不允许无关重构
- 保持公开接口兼容

## Done when
- 合同测试补齐 S06 清单、调试钩子与交付范围校验。
- 调试钩子仅用于可观测性，不引入新业务行为。
- 通过验证：`npm run lint && npm run test:unit -- all && npm run build`

## 执行说明
- 先写/更新测试，再改实现。
- 若测试暴露缺口，仅做最小实现改动并保持接口兼容。
- 最终输出改动文件、测试结果、剩余风险、建议 commit message。
