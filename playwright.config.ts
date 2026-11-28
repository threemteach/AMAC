import { defineConfig, devices } from "@playwright/test";
import { adminPassword, port, origin } from "./tests/e2e/settings";

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    ...devices["Desktop Chrome"],
    baseURL: origin,
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  webServer: {
    command: `node tests/e2e/serve.mjs ${port}`,
    url: origin + "/admin",
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      AMAC_ADMIN_PASSWORD: adminPassword,
      AMAC_SITE_URL: origin,
    },
  },
});
