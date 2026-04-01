# ParkSimulator

> A deterministic parking simulator prototype for novice driver practice and validation.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Specifications and Plans](#specifications-and-plans)
- [Development Workflow](#development-workflow)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Overview

ParkSimulator is a TypeScript-based parking simulator prototype.
It focuses on deterministic simulation and testable contracts for the following workflow:

1. Select a parking scenario.
2. Control steering and throttle.
3. Settle and receive a visible result (`success` / `failure`) with failure reason labels.

Current scope is based on `docs/specs/prd-0.3.md` and implementation slices `S01-S08`.

## Features

- 4 fixed scenarios:
  - normal reverse parking
  - narrow reverse parking
  - normal parallel parking
  - narrow parallel parking
- Deterministic control semantics:
  - steering in `[-1, 1]`
  - throttle in `[-1, 1]`
  - simulation tick at `20Hz`
- Settlement rules:
  - manual settle
  - auto settle when still for `2s`
- Visible failure reasons:
  - `angle_over_limit`
  - `cross_line`
  - `not_still`
  - `collision`
  - `out_of_bounds`
  - `timeout`
- Browser demo UI:
  - scene select
  - left/right discrete steering
  - up/down press-and-hold throttle

## Tech Stack

- Node.js (recommended: `>=22`)
- TypeScript `5.9`
- Native Node test runner (`node --test`)

No production runtime dependency is introduced at this stage.

## Project Structure

```text
.
├─ docs/
│  ├─ specs/        # PRD documents
│  ├─ plans/        # slice plans
│  ├─ mission/      # per-slice mission cards
│  └─ workflow/     # workflow guidelines
├─ src/
│  ├─ core/         # simulation rules and runtime logic
│  ├─ scenes/       # scenario schema and fixed initial poses
│  └─ ui/           # UI state contract and browser entry
├─ tests/contract/  # slice contract/unit tests
├─ public/          # browser static entry
└─ scripts/         # local static server and web run scripts
```

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run checks

```bash
npm run lint
npm run test
npm run build
```

### 3. Run browser demo

```bash
npm run web:run
```

Then open: `http://localhost:5173`

## Available Scripts

- `npm run lint`
  - Type check with `tsc --noEmit`
- `npm run test`
  - Run all slice unit/contract tests
- `npm run test:unit -- <scope>`
  - Run scoped tests (`s01`...`s08`, `all`)
- `npm run build`
  - Project type check build gate
- `npm run web:build`
  - Emit browser-consumable JS to `dist/`
- `npm run web:serve`
  - Serve static files (default `dist/`, port `5173`)
- `npm run web:run`
  - Build web assets and start local server

## Testing

### Run all tests

```bash
npm run test
```

### Run specific slice

```bash
npm run test:unit -- s04
```

Current test strategy is contract-first and slice-based, with deterministic assertions for core simulation behavior.

## Specifications and Plans

- PRD: `docs/specs/prd-0.3.md`
- Fixed plan baseline: `docs/plans/prd-0.3-plan.md`
- Extended plan (S07-S08): `docs/plans/prd-0.3-plan-v0.2.md`
- Contract checklist: `tests/contract/prd-0.3-cases.md`

## Development Workflow

Main process is defined in:

- `docs/workflow/mission_workflow.md`

Repository collaboration constraints are defined in:

- `AGENTS.md`
- `~/.codex/AGENTS.md` (local agent working agreement)

## Roadmap

- Stabilize browser interaction timing consistency across devices.
- Increase behavioral test depth for end-to-end UI simulation loop.
- Improve scenario geometry and boundary modeling.

## Contributing

1. Create a feature branch from `main`.
2. Follow mission workflow and slice constraints.
3. Ensure checks pass before submitting changes:
   - `npm run lint`
   - `npm run test`
   - `npm run build`
4. Open a PR with scope, risk, and test evidence.

## License

No license file is provided yet.
If this project is planned for open-source distribution, add a `LICENSE` file (for example MIT) before publishing.
