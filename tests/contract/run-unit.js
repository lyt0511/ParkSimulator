import { spawnSync } from "node:child_process";

const scope = process.argv[2] ?? "s01";

const scopeToFiles = {
  s01: ["tests/contract/contract-smoke.test.js"],
  all: ["tests/contract/contract-smoke.test.js"]
};

const files = scopeToFiles[scope];

if (!files) {
  console.error(`Unknown unit test scope: ${scope}`);
  process.exit(1);
}

const result = spawnSync(process.execPath, ["--test", ...files], {
  stdio: "inherit"
});

process.exit(result.status ?? 1);
