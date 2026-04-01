# PRD 3.0 测试矩阵

更新时间：2026-04-01

## 1. 扫描范围与方法

- 扫描根目录：`ParkSimulator`
- 文件模式：`**/*.test.{js,jsx,ts,tsx,mjs,cjs}`、`**/*.spec.{js,jsx,ts,tsx,mjs,cjs}`、`tests/__tests__/test/e2e/smoke` 目录递归
- 结果：共识别到 6 个测试文件，全部位于 `tests/contract/`

## 2. 分类汇总矩阵

| 测试类型 | 文件数 | 覆盖状态 | 代表文件 | 说明 |
| --- | ---: | --- | --- | --- |
| 单元测试（Unit） | 0 | 未建立独立层 | - | 当前 `test:unit` 脚本实际执行的是契约测试集合，未发现独立 unit 测试文件 |
| 集成测试（Integration） | 0 | 缺失 | - | 未发现 `integration` 或同等命名测试文件 |
| 契约测试（Contract） | 6 | 已建立 | `tests/contract/s02-scenes.test.js` | 当前测试主体，基于文件结构与关键契约字段断言 |
| E2E 测试（End-to-End） | 0 | 缺失 | - | 未发现 playwright/cypress/wdio/e2e 测试文件 |
| Smoke 测试（Smoke） | 1 | 已建立（并入契约） | `tests/contract/contract-smoke.test.js` | 该文件同时属于契约测试与 smoke 冒烟校验 |

## 3. 文件级测试矩阵

| 测试文件 | Unit | Integration | Contract | E2E | Smoke | 主要覆盖内容 |
| --- | --- | --- | --- | --- | --- | --- |
| `tests/contract/contract-smoke.test.js` |  |  | Y |  | Y | 结构存在性、S01 基础骨架检查 |
| `tests/contract/s02-scenes.test.js` |  |  | Y |  |  | 场景 schema、初始位姿与速度约束 |
| `tests/contract/s03-motion-semantics.test.js` |  |  | Y |  |  | 输入归一化、运动语义与规则常量 |
| `tests/contract/s04-settlement.test.js` |  |  | Y |  |  | 成功判定与结算边界条件 |
| `tests/contract/s05-failure-reasons.test.js` |  |  | Y |  |  | 6 类失败原因与 UI 标签映射 |
| `tests/contract/s06-delivery-hardening.test.js` |  |  | Y |  |  | 加固项、调试钩子、交付检查 |

## 4. 执行入口矩阵

| 命令 | 实际行为 | 覆盖范围 |
| --- | --- | --- |
| `npm run test` | 调用 `npm run test:unit -- all` | 执行全部 6 个契约测试文件 |
| `npm run test:unit -- s01..s06` | 调用 `tests/contract/run-unit.js` 按切片执行 | 对应切片的契约测试 |
| `npm run test:unit -- all` | 调用 `tests/contract/run-unit.js` 全量执行 | 全部契约 + smoke |

## 5. 当前缺口与建议

- 缺少独立 unit 测试层：建议对 `src/core/*` 的纯函数建立最小可维护单元测试集。
- 缺少 integration 测试层：建议覆盖 `core + scenes + ui` 的联动路径。
- 缺少独立 E2E 测试层：建议增加至少 1 条关键用户路径（开始-操作-结算）自动化流程。

