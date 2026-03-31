# 任务卡 Slice 04 - 成功判定与结算机制

## Goal

- 实现成功三条件与混合结算机制（手动结束 / 静止自动结束），并输出稳定的结算结果。

## Context

- 需求规格：`docs/specs/prd-0.3.md`
- 总计划：`docs/plans/prd-0.3-plan.md`
- 相关文件：`src/core/rules.ts` `src/core/simulator.ts` `tests/contract/*` `package.json`
- 仓库规则：`AGENTS.md`

## Constraints

- 不允许修改：`src/auth/**`, `src/infra/**`
- 不允许新增生产依赖
- 不允许无关重构
- 保持公开接口兼容

## Done when

- 行为：
  - 成功判定同时满足：在线覆盖率 `100%`、角度 `<= 8` 度、静止时长 `>= 2` 秒
  - 支持手动结束结算与静止 2 秒自动结算
  - 边界值（8 度、2 秒）判定行为稳定且可复现
  - 结算结果可区分成功与失败主因标签
- 测试通过：`npm run test:unit -- s04 && npm run build`
