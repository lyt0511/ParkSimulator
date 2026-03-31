export const SCENARIOS = [
  "normal_reverse_parking",
  "narrow_reverse_parking",
  "normal_parallel_parking",
  "narrow_parallel_parking"
] as const;

export type ScenarioId = (typeof SCENARIOS)[number];
