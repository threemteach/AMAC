import { expect, test } from "@playwright/test";

test("public pages and admin send browser protection headers", async ({ page }) => {
  for (const path of ["/", "/ar/products", "/admin"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    const headers = response?.headers();
    expect(headers).toMatchObject({
      "x-frame-options": "DENY",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      "permissions-policy": "camera=(), microphone=(), geolocation=()",
      "strict-transport-security": "max-age=31536000",
    });
    const policy = headers?.["content-security-policy"] ?? "";
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toContain("object-src 'none'");
    expect(policy).not.toContain("'unsafe-eval'");
    if (path === "/admin") {
      const scriptPolicy = policy.split("; ").find((directive) => directive.startsWith("script-src "));
      expect(scriptPolicy).toContain("'strict-dynamic'");
      expect(scriptPolicy).not.toContain("'unsafe-inline'");
      const nonce = scriptPolicy?.match(/'nonce-([^']+)'/)?.[1];
      expect(nonce).toBeTruthy();
      const renderedNonces = await page.locator("script").evaluateAll((scripts) =>
        scripts.filter((script) => script instanceof HTMLScriptElement).map((script) => script.nonce),
      );
      expect(renderedNonces).toContain(nonce);
      const nextResponse = await page.reload();
      expect(nextResponse?.headers()["content-security-policy"]).not.toContain(`'nonce-${nonce}'`);
    }
  }
});
