import { MOTION_RULES, type FailureReason } from "./rules.js";
import type { ScenarioId } from "../scenes/index.js";

export type Settlement = {
  success: boolean;
  reason?: FailureReason;
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
