# 任务卡 Slice 03 - 车辆运动与方向盘语义

## Goal

- 定义方向盘与前进/后退油门输入语义，以及状态更新语义，为后续成功判定与结算提供稳定运动基础。

## Context

- 需求规格：`docs/specs/prd-0.3.md`
- 总计划：`docs/plans/prd-0.3-plan.md`
- 相关文件：`src/core/simulator.ts` `src/core/rules.ts` `tests/contract/*` `package.json`
- 仓库规则：`AGENTS.md`

## Constraints

- 不允许修改：`src/auth/**`, `src/infra/**`
- 不允许新增生产依赖
- 不允许无关重构
- 保持公开接口兼容

## Done when

- 行为：
  - 输入范围固定为 `[-1, 1]` 并有统一归一化处理
  - 采样频率固定为 `20Hz`，并可推导单帧时长
  - 同一输入序列下状态推进结果保持确定性
  - 方向盘影响朝向、油门影响速度与位移的语义可复用
- 测试通过：`npm run test:unit -- s03 && npm run build`
