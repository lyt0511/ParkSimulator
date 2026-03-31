export const SCENARIOS = [
  "normal_reverse_parking",
  "narrow_reverse_parking",
  "normal_parallel_parking",
  "narrow_parallel_parking"
] as const;

export type ScenarioId = (typeof SCENARIOS)[number];

export const SCENARIO_SCHEMA_VERSION = "0.1.0";

export type ScenarioSchema = {
  id: ScenarioId;
  label: string;
  laneType: "normal" | "narrow";
  parkingType: "reverse" | "parallel";
};

export const SCENARIO_SCHEMAS: Record<ScenarioId, ScenarioSchema> = {
  normal_reverse_parking: {
    id: "normal_reverse_parking",
    label: "正常倒车入库",
    laneType: "normal",
    parkingType: "reverse"
  },
  narrow_reverse_parking: {
    id: "narrow_reverse_parking",
    label: "窄路倒车入库",
    laneType: "narrow",
    parkingType: "reverse"
  },
  normal_parallel_parking: {
    id: "normal_parallel_parking",
    label: "正常侧方停车",
    laneType: "normal",
    parkingType: "parallel"
  },
  narrow_parallel_parking: {
    id: "narrow_parallel_parking",
    label: "窄路侧方停车",
    laneType: "narrow",
    parkingType: "parallel"
  }
};
