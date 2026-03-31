# 任务卡 Slice 02 - 场景 schema 与固定初始位姿

## Goal

- 锁定 4 个场景及固定初始状态，为后续运动与判定提供稳定输入基线。

## Context

- 需求规格：`docs/specs/prd-0.3.md`
- 总计划：`docs/plans/prd-0.3-plan.md`
- 相关文件：`src/scenes/index.ts` `tests/contract/*` `package.json`
- 仓库规则：`AGENTS.md`

## Constraints

- 不允许修改：`src/auth/**`, `src/infra/**`
- 不允许新增生产依赖
- 不允许无关重构
- 保持公开接口兼容

## Done when

- 行为：
  - 4 个场景定义齐全且可枚举
  - 每个场景具备固定初始位姿字段
  - 每个场景初始速度固定为 `0`
- 测试通过：`npm run test:unit -- s02 && npm run build`
