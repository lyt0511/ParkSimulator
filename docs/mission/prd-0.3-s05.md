# 任务卡 Slice 05 - 6 类失败原因可见输出

## Goal

- 打通 `angle_over_limit`、`cross_line`、`not_still`、`collision`、`out_of_bounds`、`timeout` 到前端可见输出，保证标签一致且可测试。

## Context

- 需求规格：`docs/specs/prd-0.3.md`
- 总计划：`docs/plans/prd-0.3-plan.md`
- 相关文件：`src/core/rules.ts` `src/core/simulator.ts` `src/ui/app.ts` `tests/contract/*` `package.json`
- 仓库规则：`AGENTS.md`

## Constraints

- 不允许修改：`src/auth/**`, `src/infra/**`
- 不允许新增生产依赖
- 不允许无关重构
- 保持公开接口兼容

## Done when

- 行为：
  - 6 类失败原因均可被核心结算逻辑触发并输出稳定标签
  - 前端可见层存在 6 类失败原因标签映射，且与核心枚举一致
  - 手动/自动结算下失败主因可见且不出现未知标签
- 测试通过：`npm run test:unit -- s05 && npm run build`
