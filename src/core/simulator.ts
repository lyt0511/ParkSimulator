import type { FailureReason } from "./rules.js";
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
