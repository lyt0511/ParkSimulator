import { SCENARIOS, SCENARIO_SCHEMAS } from "../scenes/index.js";
import { SUCCESS_RULES } from "../core/rules.js";
import { SAMPLE_RATE_HZ, GAME_PHASES } from "../core/simulator.js";

export const MENU_ITEMS = SCENARIOS.map((id) => ({
  id,
  label: SCENARIO_SCHEMAS[id].label
}));

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
  phases: GAME_PHASES
} as const;
