# 任务卡 Slice 07 - 联动内核闭环（场景初始化 -> 控制车辆 -> 进入判定）

## Goal
- 在不依赖 UI 的前提下，打通场景初始化、输入控制、车辆状态推进、结算判定的运行时闭环。
- 保持现有公开接口兼容，仅补充最小运行时编排能力，服务后续 UI 接入。
- 本切片内完成同功能测试验收，不拆分到独立验收切片。

## Context
- 需求规格：`docs/specs/prd-0.3.md`
- 总计划：`docs/plans/prd-0.3-plan-v0.2.md`
- 相关文件：`src/core/*`、`src/scenes/*`、`tests/contract/*`、`package.json`
- 仓库规则：`AGENTS.md`

## Constraints
- 不允许修改：`src/auth/**`、`src/infra/**`
- 不允许新增生产依赖
- 不允许无关重构
- 保持公开接口兼容

## Done when
- 4 个场景可正确注入固定初始位姿，形成运行态初始状态。
- 输入“方向 + 前进/后退”可驱动车辆状态推进（位置、朝向、速度变化）。
- 运行态可进入判定环节并返回结算结果（`success/failure + failure reason`）。
- 通过验证：`npm run lint && npm run test:unit -- s07 && npm run build`

## 执行说明
- 先写/更新测试，再改实现。
- 仅做联动闭环所需最小改动，不扩展业务范围。
- 最终输出改动文件、测试结果、剩余风险、建议 commit message。
