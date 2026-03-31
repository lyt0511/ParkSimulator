import { SCENARIOS, SCENARIO_SCHEMAS } from "../scenes/index.js";
import { SUCCESS_RULES, type FailureReason } from "../core/rules.js";
import { SAMPLE_RATE_HZ, GAME_PHASES } from "../core/simulator.js";

export const MENU_ITEMS = SCENARIOS.map((id) => ({
  id,
  label: SCENARIO_SCHEMAS[id].label
}));

export const FAILURE_REASON_LABELS: Record<FailureReason, string> = {
  angle_over_limit: "角度超限",
  cross_line: "越线",
  not_still: "未静止",
  collision: "碰撞",
  out_of_bounds: "出界",
  timeout: "超时"
};

export type UIState = {
  screen: "menu" | "simulator";
  selectedScenario: (typeof SCENARIOS)[number] | null;
};

export const INITIAL_UI_STATE: UIState = {
  screen: "menu",
  selectedScenario: null
};

export const APP_CONTRACT = {
  scenarios: SCENARIOS,
  rules: SUCCESS_RULES,
  sampleRateHz: SAMPLE_RATE_HZ,
  menuItems: MENU_ITEMS,
  phases: GAME_PHASES,
  failureReasonLabels: FAILURE_REASON_LABELS
} as const;

export const DEBUG_HOOKS = {
  getContractSnapshot: () => APP_CONTRACT
} as const;
