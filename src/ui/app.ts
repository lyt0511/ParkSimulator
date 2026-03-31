import { SCENARIOS } from "../scenes/index.js";
import { SUCCESS_RULES } from "../core/rules.js";
import { SAMPLE_RATE_HZ } from "../core/simulator.js";

export const APP_CONTRACT = {
  scenarios: SCENARIOS,
  rules: SUCCESS_RULES,
  sampleRateHz: SAMPLE_RATE_HZ
} as const;
