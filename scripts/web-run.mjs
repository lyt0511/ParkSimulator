import { cpSync, existsSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: "inherit", shell: process.platform === "win32" });
  if ((result.status ?? 1) !== 0) {
    process.exit(result.status ?? 1);
  }
};

run("npm", ["run", "web:build"]);

if (!existsSync("dist")) {
  mkdirSync("dist", { recursive: true });
}

cpSync("public/index.html", "dist/index.html");

run("node", ["scripts/serve-static.mjs"]);
