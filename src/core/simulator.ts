import {
  MOTION_RULES,
  SETTLEMENT_RULES,
  SUCCESS_RULES,
  type FailureReason
} from "./rules.js";
import { SCENARIO_SCHEMAS, type ScenarioId } from "../scenes/index.js";

export const SETTLEMENT_TRIGGERS = ["manual", "auto_still"] as const;

export type SettlementTrigger = (typeof SETTLEMENT_TRIGGERS)[number];

export type Settlement = {
  success: boolean;
  reason?: FailureReason;
  trigger?: SettlementTrigger;
};

export type SuccessCriteriaInput = {
  coverage: number;
  angleDeg: number;
  stillSeconds: number;
};

export type SettlementContext = SuccessCriteriaInput & {
  trigger: SettlementTrigger;
  elapsedSeconds: number;
  collision?: boolean;
  outOfBounds?: boolean;
  crossLine?: boolean;
};

export type ControlInput = {
  steering: number;
  throttle: number;
};

export const CONTROL_RANGE = {
  min: -1,
  max: 1
} as const;

export const SAMPLE_RATE_HZ = 20;
export const FRAME_DT_SECONDS = 1 / SAMPLE_RATE_HZ;
export const STILL_SPEED_EPSILON = 0.001;

export const GAME_PHASES = ["menu", "running", "settled"] as const;

export type GamePhase = (typeof GAME_PHASES)[number];

export type GameState = {
  phase: GamePhase;
  tick: number;
  selectedScenario: ScenarioId | null;
  settlement: Settlement | null;
};

export const INITIAL_GAME_STATE: GameState = {
  phase: "menu",
  tick: 0,
  selectedScenario: null,
  settlement: null
};

export type VehicleState = {
  x: number;
  y: number;
  headingDeg: number;
  speed: number;
};

export const INITIAL_VEHICLE_STATE: VehicleState = {
  x: 0,
  y: 0,
  headingDeg: 0,
  speed: 0
};

export type RuntimeState = {
  phase: "running" | "settled";
  tick: number;
  selectedScenario: ScenarioId;
  vehicle: VehicleState;
  elapsedSeconds: number;
  stillSeconds: number;
  settlement: Settlement | null;
};

export type RuntimeStepFlags = {
  collision?: boolean;
  outOfBounds?: boolean;
  crossLine?: boolean;
};

export type RuntimeSettlementProbe = {
  coverage: number;
  angleDeg: number;
};

export type RuntimeSettlementInput = RuntimeSettlementProbe & RuntimeStepFlags;

export const clampControlValue = (value: number): number => {
  if (value < CONTROL_RANGE.min) {
    return CONTROL_RANGE.min;
  }

  if (value > CONTROL_RANGE.max) {
    return CONTROL_RANGE.max;
  }

  return value;
};

export const normalizeControlInput = (input: ControlInput): ControlInput => ({
  steering: clampControlValue(input.steering),
  throttle: clampControlValue(input.throttle)
});

export const stepVehicleState = (
  state: VehicleState,
  input: ControlInput,
  dtSeconds: number = FRAME_DT_SECONDS
): VehicleState => {
  const normalized = normalizeControlInput(input);

  const accelDelta = normalized.throttle * MOTION_RULES.accelPerSecond * dtSeconds;
  const unclampedSpeed = state.speed + accelDelta;
  const nextSpeed = Math.min(Math.max(unclampedSpeed, -MOTION_RULES.maxSpeed), MOTION_RULES.maxSpeed);

  const headingDelta =
    normalized.steering *
    MOTION_RULES.steeringRateDegPerSecond *
    dtSeconds *
    (Math.abs(nextSpeed) > 0 ? 1 : 0);

  const nextHeadingDeg = state.headingDeg + headingDelta;
  const headingRad = (nextHeadingDeg * Math.PI) / 180;
  const distance = nextSpeed * dtSeconds;

  return {
    x: state.x + Math.cos(headingRad) * distance,
    y: state.y + Math.sin(headingRad) * distance,
    headingDeg: nextHeadingDeg,
    speed: nextSpeed
  };
};

export const runDeterministicSequence = (
  initialState: VehicleState,
  inputs: readonly ControlInput[],
  dtSeconds: number = FRAME_DT_SECONDS
): VehicleState => {
  return inputs.reduce((currentState, input) => {
    return stepVehicleState(currentState, input, dtSeconds);
  }, initialState);
};

export const createRuntimeStateFromScenario = (scenarioId: ScenarioId): RuntimeState => {
  const initialPose = SCENARIO_SCHEMAS[scenarioId].initialPose;

  return {
    phase: "running",
    tick: 0,
    selectedScenario: scenarioId,
    vehicle: {
      x: initialPose.x,
      y: initialPose.y,
      headingDeg: initialPose.headingDeg,
      speed: initialPose.speed
    },
    elapsedSeconds: 0,
    stillSeconds: 0,
    settlement: null
  };
};

export const stepRuntimeState = (
  state: RuntimeState,
  input: ControlInput,
  dtSeconds: number = FRAME_DT_SECONDS
): RuntimeState => {
  if (state.phase === "settled") {
    return state;
  }

  const nextVehicle = stepVehicleState(state.vehicle, input, dtSeconds);
  const nextElapsedSeconds = state.elapsedSeconds + dtSeconds;
  const nextStillSeconds =
    Math.abs(nextVehicle.speed) <= STILL_SPEED_EPSILON ? state.stillSeconds + dtSeconds : 0;

  return {
    ...state,
    tick: state.tick + 1,
    vehicle: nextVehicle,
    elapsedSeconds: nextElapsedSeconds,
    stillSeconds: nextStillSeconds
  };
};

export const evaluateSuccessCriteria = ({
  coverage,
  angleDeg,
  stillSeconds
}: SuccessCriteriaInput): boolean => {
  return (
    coverage >= SUCCESS_RULES.withinSlotCoverage &&
    angleDeg <= SUCCESS_RULES.maxAngleDeg &&
    stillSeconds >= SUCCESS_RULES.stillSeconds
  );
};

export const shouldAutoSettleByStill = (stillSeconds: number): boolean => {
  return stillSeconds >= SETTLEMENT_RULES.autoStillSeconds;
};

export const isTimedOut = (elapsedSeconds: number): boolean => {
  return elapsedSeconds >= SETTLEMENT_RULES.timeoutSeconds;
};

const deriveFailureReason = (context: SettlementContext): FailureReason | null => {
  if (context.collision) {
    return "collision";
  }

  if (context.outOfBounds) {
    return "out_of_bounds";
  }

  if (context.crossLine || context.coverage < SUCCESS_RULES.withinSlotCoverage) {
    return "cross_line";
  }

  if (isTimedOut(context.elapsedSeconds)) {
    return "timeout";
  }

  if (context.angleDeg > SUCCESS_RULES.maxAngleDeg) {
    return "angle_over_limit";
  }

  if (context.stillSeconds < SUCCESS_RULES.stillSeconds) {
    return "not_still";
  }

  return null;
};

export const settleSimulation = (context: SettlementContext): Settlement => {
  const reason = deriveFailureReason(context);

  if (reason) {
    return {
      success: false,
      reason,
      trigger: context.trigger
    };
  }

  if (evaluateSuccessCriteria(context)) {
    return {
      success: true,
      trigger: context.trigger
    };
  }

  return {
    success: false,
    reason: "not_still",
    trigger: context.trigger
  };
};

export const settleRuntimeState = (
  state: RuntimeState,
  trigger: SettlementTrigger,
  probe: RuntimeSettlementInput
): RuntimeState => {
  if (state.phase === "settled") {
    return state;
  }

  const settlement = settleSimulation({
    trigger,
    elapsedSeconds: state.elapsedSeconds,
    stillSeconds: state.stillSeconds,
    coverage: probe.coverage,
    angleDeg: probe.angleDeg,
    collision: probe.collision,
    outOfBounds: probe.outOfBounds,
    crossLine: probe.crossLine
  });

  return {
    ...state,
    phase: "settled",
    settlement
  };
};
