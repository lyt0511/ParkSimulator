export const SUCCESS_RULES = {
  withinSlotCoverage: 1.0,
  maxAngleDeg: 8,
  stillSeconds: 2
} as const;

export const SETTLEMENT_RULES = {
  timeoutSeconds: 120,
  autoStillSeconds: SUCCESS_RULES.stillSeconds
} as const;

export const MOTION_RULES = {
  maxSpeed: 8,
  accelPerSecond: 4,
  steeringRateDegPerSecond: 60
} as const;

export const FAILURE_REASONS = [
  "angle_over_limit",
  "cross_line",
  "not_still",
  "collision",
  "out_of_bounds",
  "timeout"
] as const;

export type FailureReason = (typeof FAILURE_REASONS)[number];
