import { SCENARIOS, SCENARIO_SCHEMAS, type ScenarioId } from "../scenes/index.js";
import { SUCCESS_RULES, type FailureReason } from "../core/rules.js";
import {
  SAMPLE_RATE_HZ,
  GAME_PHASES,
  FRAME_DT_SECONDS,
  clampControlValue,
  createRuntimeStateFromScenario,
  shouldAutoSettleByStill,
  settleRuntimeState,
  stepRuntimeState,
  type RuntimeState,
  type RuntimeSettlementInput
} from "../core/simulator.js";

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

export const STEERING_HALF_TURN_STEP = 0.5;

export const UI_CONTROL_LAYOUT = {
  position: "bottom-half",
  steeringGroup: ["left", "right"],
  throttleGroup: ["up", "down"],
  throttleDirection: "vertical"
} as const;

export type SteeringDirection = "left" | "right";
export type ThrottleDirection = "up" | "down";

export type UIState = {
  screen: "menu" | "simulator";
  selectedScenario: ScenarioId | null;
  runtime: RuntimeState | null;
  steering: number;
  throttle: number;
  settlementLabel: string | null;
};

export const INITIAL_UI_STATE: UIState = {
  screen: "menu",
  selectedScenario: null,
  runtime: null,
  steering: 0,
  throttle: 0,
  settlementLabel: null
};

export const DEFAULT_SETTLEMENT_PROBE: RuntimeSettlementInput = {
  coverage: 1,
  angleDeg: 0,
  collision: false,
  outOfBounds: false,
  crossLine: false
};

const buildControlInput = (state: UIState) => ({
  steering: clampControlValue(state.steering),
  throttle: clampControlValue(state.throttle)
});

export const enterScenarioFromMenu = (state: UIState, scenarioId: ScenarioId): UIState => {
  return {
    ...state,
    screen: "simulator",
    selectedScenario: scenarioId,
    runtime: createRuntimeStateFromScenario(scenarioId),
    steering: 0,
    throttle: 0,
    settlementLabel: null
  };
};

export const clickSteeringStep = (state: UIState, direction: SteeringDirection): UIState => {
  const step = direction === "left" ? -STEERING_HALF_TURN_STEP : STEERING_HALF_TURN_STEP;

  return {
    ...state,
    steering: clampControlValue(state.steering + step)
  };
};

export const pressThrottle = (state: UIState, direction: ThrottleDirection): UIState => {
  return {
    ...state,
    throttle: direction === "up" ? 1 : -1
  };
};

export const releaseThrottle = (state: UIState): UIState => {
  return {
    ...state,
    throttle: 0
  };
};

export const deriveVisibleSettlementLabel = (
  settlement: RuntimeState["settlement"]
): string | null => {
  if (!settlement) {
    return null;
  }

  if (settlement.success) {
    return "成功";
  }

  if (settlement.reason) {
    return `失败：${FAILURE_REASON_LABELS[settlement.reason]}`;
  }

  return "失败";
};

const patchRuntime = (state: UIState, runtime: RuntimeState): UIState => {
  return {
    ...state,
    runtime,
    settlementLabel:
      runtime.phase === "settled"
        ? deriveVisibleSettlementLabel(runtime.settlement)
        : state.settlementLabel
  };
};

export const tickUIRuntime = (
  state: UIState,
  probe: RuntimeSettlementInput = DEFAULT_SETTLEMENT_PROBE,
  dtSeconds: number = FRAME_DT_SECONDS
): UIState => {
  if (!state.runtime || state.runtime.phase === "settled") {
    return state;
  }

  let nextRuntime = stepRuntimeState(state.runtime, buildControlInput(state), dtSeconds);

  if (shouldAutoSettleByStill(nextRuntime.stillSeconds)) {
    nextRuntime = settleRuntimeState(nextRuntime, "auto_still", probe);
  }

  return patchRuntime(state, nextRuntime);
};

export const manuallySettleUIRuntime = (
  state: UIState,
  probe: RuntimeSettlementInput = DEFAULT_SETTLEMENT_PROBE
): UIState => {
  if (!state.runtime || state.runtime.phase === "settled") {
    return state;
  }

  const settled = settleRuntimeState(state.runtime, "manual", probe);
  return patchRuntime(state, settled);
};

export const APP_CONTRACT = {
  scenarios: SCENARIOS,
  rules: SUCCESS_RULES,
  sampleRateHz: SAMPLE_RATE_HZ,
  menuItems: MENU_ITEMS,
  phases: GAME_PHASES,
  failureReasonLabels: FAILURE_REASON_LABELS,
  uiControlLayout: UI_CONTROL_LAYOUT,
  steeringHalfTurnStep: STEERING_HALF_TURN_STEP
} as const;

export const DEBUG_HOOKS = {
  getContractSnapshot: () => APP_CONTRACT
} as const;
