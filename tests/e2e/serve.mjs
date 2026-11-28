import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const port = process.argv[2];
const resultsDirectory = resolve("test-results");
mkdirSync(resultsDirectory, { recursive: true });
const env = {
  ...process.env,
  AMAC_E2E: "1",
  AMAC_CONTENT_DIR: mkdtempSync(resolve(resultsDirectory, "cms-")),
  AMAC_GENERAL_EMAIL: "general@example.test",
  AMAC_EXPORT_EMAIL: "export@example.test",
};

function runNext(args) {
  return new Promise((resolveExit, reject) => {
    const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", ...args], { env, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => resolveExit(code ?? 1));
  });
}

// Next writes this file in the project root even with a separate build directory.
const declarations = "next-env.d.ts";
const previousDeclarations = existsSync(declarations) ? readFileSync(declarations, "utf8") : undefined;
let buildExit;
try {
  buildExit = await runNext(["build"]);
} finally {
  const current = existsSync(declarations) ? readFileSync(declarations, "utf8") : "";
  if (current.includes('import "./.next-e2e/types/routes.d.ts"') && current !== previousDeclarations) {
    if (previousDeclarations === undefined) rmSync(declarations, { force: true });
    else writeFileSync(declarations, previousDeclarations);
  }
}
process.exitCode = buildExit || await runNext(["start", "--hostname", "127.0.0.1", "--port", port]);
