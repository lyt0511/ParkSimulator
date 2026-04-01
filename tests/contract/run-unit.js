import { spawnSync } from "node:child_process";

const scope = process.argv[2] ?? "s01";

const scopeToFiles = {
  s01: ["tests/contract/contract-smoke.test.js"],
  s02: ["tests/contract/s02-scenes.test.js"],
  s03: ["tests/contract/s03-motion-semantics.test.js"],
  s04: ["tests/contract/s04-settlement.test.js"],
  s05: ["tests/contract/s05-failure-reasons.test.js"],
  s06: ["tests/contract/s06-delivery-hardening.test.js"],
  s07: ["tests/contract/s07-runtime-loop.test.js"],
  all: [
    "tests/contract/contract-smoke.test.js",
    "tests/contract/s02-scenes.test.js",
    "tests/contract/s03-motion-semantics.test.js",
    "tests/contract/s04-settlement.test.js",
    "tests/contract/s05-failure-reasons.test.js",
    "tests/contract/s06-delivery-hardening.test.js",
    "tests/contract/s07-runtime-loop.test.js"
  ]
};

const files = scopeToFiles[scope];

if (!files) {
  console.error(`Unknown unit test scope: ${scope}`);
  process.exit(1);
}

const result = spawnSync(
  process.execPath,
  ["--test", "--experimental-test-isolation=none", ...files],
  { stdio: "inherit" }
);

process.exit(result.status ?? 1);
