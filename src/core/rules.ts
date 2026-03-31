export const SUCCESS_RULES = {
  withinSlotCoverage: 1.0,
  maxAngleDeg: 8,
  stillSeconds: 2
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
