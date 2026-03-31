import type { FailureReason } from "./rules.js";

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
