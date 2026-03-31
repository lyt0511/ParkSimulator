export const SCENARIOS = [
  "normal_reverse_parking",
  "narrow_reverse_parking",
  "normal_parallel_parking",
  "narrow_parallel_parking"
] as const;

export type ScenarioId = (typeof SCENARIOS)[number];

export const SCENARIO_SCHEMA_VERSION = "0.2.0";

export type InitialPose = {
  x: number;
  y: number;
  headingDeg: number;
  speed: number;
};

export type ScenarioSchema = {
  id: ScenarioId;
  label: string;
  laneType: "normal" | "narrow";
  parkingType: "reverse" | "parallel";
  initialPose: InitialPose;
};

export const SCENARIO_SCHEMAS: Record<ScenarioId, ScenarioSchema> = {
  normal_reverse_parking: {
    id: "normal_reverse_parking",
    label: "正常倒车入库",
    laneType: "normal",
    parkingType: "reverse",
    initialPose: {
      x: 0,
      y: 0,
      headingDeg: 0,
      speed: 0
    }
  },
  narrow_reverse_parking: {
    id: "narrow_reverse_parking",
    label: "窄路倒车入库",
    laneType: "narrow",
    parkingType: "reverse",
    initialPose: {
      x: 1.5,
      y: 0,
      headingDeg: 0,
      speed: 0
    }
  },
  normal_parallel_parking: {
    id: "normal_parallel_parking",
    label: "正常侧方停车",
    laneType: "normal",
    parkingType: "parallel",
    initialPose: {
      x: 0,
      y: -2,
      headingDeg: 0,
      speed: 0
    }
  },
  narrow_parallel_parking: {
    id: "narrow_parallel_parking",
    label: "窄路侧方停车",
    laneType: "narrow",
    parkingType: "parallel",
    initialPose: {
      x: 1.5,
      y: -2,
      headingDeg: 0,
      speed: 0
    }
  }
};
