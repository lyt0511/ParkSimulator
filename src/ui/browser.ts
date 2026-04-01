import {
  INITIAL_UI_STATE,
  MENU_ITEMS,
  clickSteeringStep,
  enterScenarioFromMenu,
  manuallySettleUIRuntime,
  pressThrottle,
  releaseThrottle,
  tickUIRuntime
} from "./app.js";

const scenarioEl = document.querySelector<HTMLSelectElement>("#scenario");
const startEl = document.querySelector<HTMLButtonElement>("#start");
const leftEl = document.querySelector<HTMLButtonElement>("#left");
const rightEl = document.querySelector<HTMLButtonElement>("#right");
const upEl = document.querySelector<HTMLButtonElement>("#up");
const downEl = document.querySelector<HTMLButtonElement>("#down");
const manualSettleEl = document.querySelector<HTMLButtonElement>("#manual-settle");
const stateEl = document.querySelector<HTMLElement>("#state");

if (
  !scenarioEl ||
  !startEl ||
  !leftEl ||
  !rightEl ||
  !upEl ||
  !downEl ||
  !manualSettleEl ||
  !stateEl
) {
  throw new Error("Missing required DOM nodes for browser UI");
}

let uiState = INITIAL_UI_STATE;

for (const item of MENU_ITEMS) {
  const option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.label;
  scenarioEl.append(option);
}

const render = () => {
  stateEl.textContent = JSON.stringify(
    {
      screen: uiState.screen,
      selectedScenario: uiState.selectedScenario,
      steering: uiState.steering,
      throttle: uiState.throttle,
      settlementLabel: uiState.settlementLabel,
      runtime: uiState.runtime
        ? {
            phase: uiState.runtime.phase,
            tick: uiState.runtime.tick,
            elapsedSeconds: Number(uiState.runtime.elapsedSeconds.toFixed(2)),
            stillSeconds: Number(uiState.runtime.stillSeconds.toFixed(2)),
            vehicle: {
              x: Number(uiState.runtime.vehicle.x.toFixed(2)),
              y: Number(uiState.runtime.vehicle.y.toFixed(2)),
              headingDeg: Number(uiState.runtime.vehicle.headingDeg.toFixed(2)),
              speed: Number(uiState.runtime.vehicle.speed.toFixed(2))
            },
            settlement: uiState.runtime.settlement
          }
        : null
    },
    null,
    2
  );
};

startEl.addEventListener("click", () => {
  uiState = enterScenarioFromMenu(uiState, scenarioEl.value as (typeof MENU_ITEMS)[number]["id"]);
  render();
});

leftEl.addEventListener("click", () => {
  uiState = clickSteeringStep(uiState, "left");
  render();
});

rightEl.addEventListener("click", () => {
  uiState = clickSteeringStep(uiState, "right");
  render();
});

const bindThrottle = (el: HTMLButtonElement, direction: "up" | "down") => {
  const press = () => {
    uiState = pressThrottle(uiState, direction);
    render();
  };

  const release = () => {
    uiState = releaseThrottle(uiState);
    render();
  };

  el.addEventListener("mousedown", press);
  el.addEventListener("touchstart", press, { passive: true });
  el.addEventListener("mouseup", release);
  el.addEventListener("mouseleave", release);
  el.addEventListener("touchend", release);
  el.addEventListener("touchcancel", release);
};

bindThrottle(upEl, "up");
bindThrottle(downEl, "down");

manualSettleEl.addEventListener("click", () => {
  uiState = manuallySettleUIRuntime(uiState);
  render();
});

window.addEventListener("blur", () => {
  uiState = releaseThrottle(uiState);
  render();
});

setInterval(() => {
  uiState = tickUIRuntime(uiState);
  render();
}, 50);

render();
