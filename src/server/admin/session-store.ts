import "server-only";

import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cmsDirectory } from "../cms/store";

const directory = join(cmsDirectory, "sessions");
const sessionIdPattern = /^(\d{10})\.[A-Za-z0-9_-]{32}$/;

export function activateSession(id: string, now: number) {
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  for (const name of readdirSync(directory)) {
    const match = sessionIdPattern.exec(name);
    if (match && Number(match[1]) <= now) rmSync(join(directory, name), { force: true });
  }
  writeFileSync(join(directory, id), "", { flag: "wx", mode: 0o600 });
}

export function isSessionActive(id: string) {
  return existsSync(join(directory, id));
}

export function deactivateSession(id: string) {
  rmSync(join(directory, id), { force: true });
}
