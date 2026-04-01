# 任务卡 Slice 08 - UI 交互闭环（选场景 + 控车 + 反馈判定）

## Goal
- 通过 UI 设计与 UI 交互完成可操作闭环：选择场景、控制车辆方向与前进/后退、反馈判定结果。
- 保持核心判定语义不变，仅补充 UI 所需最小接口适配与状态编排。
- 本切片内完成同功能测试验收，不拆分到独立验收切片。

## Context
- 需求规格：`docs/specs/prd-0.3.md`
- 总计划：`docs/plans/prd-0.3-plan-v0.2.md`
- 相关文件：`src/ui/*`、`src/core/*`、`tests/contract/*`、`package.json`
- 仓库规则：`AGENTS.md`

## Constraints
- 不允许修改：`src/auth/**`、`src/infra/**`
- 不允许新增生产依赖
- 不允许无关重构
- 保持公开接口兼容

## Done when
- UI 可选择 4 个场景并进入运行态。
- UI 控制区满足固定布局语义：`左/右` 单击离散步进；`上/下` 按下持续、松开停止。
- 手动结束或自动结束后，UI 可见结算结果与失败主因标签。
- 通过验证：`npm run lint && npm run test:unit -- s08 && npm run build`

## 执行说明
- 先写/更新测试，再改实现。
- 仅做 UI 交互闭环所需最小改动，不扩展业务范围。
- 最终输出改动文件、测试结果、剩余风险、建议 commit message。
