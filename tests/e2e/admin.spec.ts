import { expect, test, type Page } from "@playwright/test";
import sharp from "sharp";
import { adminPassword, origin } from "./settings";

async function enterPassword(page: Page, password: string) {
  await page.getByLabel("كلمة مرور الإدارة").fill(password);
  await page.getByRole("button", { name: "دخول", exact: true }).click();
}

async function signIn(page: Page) {
  await page.goto("/admin");
  await enterPassword(page, adminPassword);
  await expect(page.getByRole("heading", { name: "نظرة عامة" })).toBeVisible();
}

function openEditor(page: Page, name: string) {
  return page.getByRole("navigation", { name: "أقسام لوحة الإدارة" })
    .getByRole("button", { name, exact: true }).click();
}

async function sampleImage(width: number, height: number) {
  return {
    name: "sample.png",
    mimeType: "image/png",
    buffer: await sharp({ create: { width, height, channels: 3, background: "#68865c" } }).png().toBuffer(),
  };
}

test("admin login rejects the wrong password and logout closes the session", async ({ page }) => {
  const saveWithoutSession = () => page.request.put("/admin/api", { headers: { Origin: origin }, data: {} });
  expect((await saveWithoutSession()).status()).toBe(401);

  await page.goto("/admin");
  await enterPassword(page, "wrong-password");
  await expect(page.getByText("كلمة المرور غير صحيحة.")).toBeVisible();
  await enterPassword(page, adminPassword);
  await expect(page.getByRole("heading", { name: "نظرة عامة" })).toBeVisible();

  await page.getByRole("button", { name: "تسجيل الخروج" }).click();
  await expect(page.getByLabel("كلمة مرور الإدارة")).toBeVisible();
  expect((await saveWithoutSession()).status()).toBe(401);
});

test("image upload checks the dimensions and serves a WebP preview", async ({ page }) => {
  await signIn(page);
  await openEditor(page, "الصور والشهادات");

  const heroImage = page.getByLabel("صورة الهيرو", { exact: true });
  await heroImage.setInputFiles(await sampleImage(160, 90));
  await expect(page.getByText("مقاس الصورة 160 × 90. الحد الأدنى 1280 × 650 بكسل.")).toBeVisible();

  await heroImage.setInputFiles(await sampleImage(1920, 1080));
  const preview = page.getByRole("img", { name: "صورة الهيرو", exact: true });
  const mediaPath = /^\/media\/[a-f0-9]{64}\.webp$/;
  await expect(preview).toHaveAttribute("src", mediaPath);
  await expect(preview).toHaveJSProperty("complete", true);
  const asset = await page.request.get((await preview.getAttribute("src"))!);
  expect(asset.ok()).toBe(true);
  expect(asset.headers()["content-type"]).toBe("image/webp");
  expect(await sharp(await asset.body()).metadata()).toMatchObject({ format: "webp", width: 1920, height: 1080 });
});

test("publishing makes a new article public at its own URL", async ({ page }) => {
  const slug = "published-e2e-article";
  const url = "/journal/" + slug;
  const title = "Article published from the dashboard";
  const paragraph = "This text was saved by the publishing test.";
  expect((await page.request.get(url)).status()).toBe(404);

  await signIn(page);
  await openEditor(page, "المقالات");
  await page.getByLabel("رابط السجل الجديد").fill(slug);
  await page.getByRole("button", { name: "إضافة", exact: true }).click();
  await page.getByLabel("عنوان المقال", { exact: true }).fill(title);
  await page.getByLabel("صورة غلاف المقال", { exact: true }).setInputFiles(await sampleImage(1600, 1000));
  await expect(page.getByRole("img", { name: "صورة غلاف المقال", exact: true })).toHaveAttribute("src", /^\/media\//);
  await page.getByRole("button", { name: "إضافة فقرة" }).click();
  await page.getByLabel("عنوان الفقرة 1", { exact: true }).fill("Test section");
  await page.getByLabel("نص الفقرة 1", { exact: true }).fill(paragraph);
  await page.getByLabel("منشور", { exact: true }).check();
  expect((await page.request.get(url)).status()).toBe(404);

  await page.getByRole("button", { name: "نشر التعديلات" }).click();
  await expect(page.getByText("اتنشر المحتوى بنجاح.")).toBeVisible();
  const article = await page.goto(url);
  expect(article?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
  await expect(page.getByText(paragraph)).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", origin + url);
});
