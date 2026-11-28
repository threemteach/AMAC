import { expect, test } from "@playwright/test";

const catalogCases = [
  { locale: "en", query: "strawberreis", vegetables: "Vegetables" },
  { locale: "ar", query: "الفراوله", vegetables: "الخضروات" },
  { locale: "fr", query: "fraises", vegetables: "Légumes" },
  { locale: "de", query: "Erdbeeren", vegetables: "Gemüse" },
  { locale: "it", query: "fragole", vegetables: "Verdura" },
  { locale: "ru", query: "клубника", vegetables: "Овощи" },
  { locale: "es", query: "fresas", vegetables: "Verduras" },
];

for (const { locale, query, vegetables } of catalogCases) {
  test(`catalog search and category reset work in ${locale}`, async ({ page }) => {
    const catalogPath = (locale === "en" ? "" : "/" + locale) + "/products";
    await page.goto(catalogPath + "?category=fruits");
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");

    const search = page.getByRole("search").getByRole("combobox");
    const results = page.locator("#collection");
    const products = results.locator("[data-product]");
    await expect(products).toHaveCount(2);
    await search.fill(query);
    await expect(search).toHaveAttribute("aria-expanded", "true");
    await expect(products).toHaveCount(1);
    await expect(products.first()).toHaveAttribute("data-product", "strawberries");
    await search.press("ArrowDown");
    await expect(page.getByRole("option", { selected: true })).toBeVisible();
    await search.press("Enter");
    await expect(results).toBeFocused();
    await expect(search).toHaveAttribute("aria-expanded", "false");

    await results.getByRole("button", { name: vegetables, exact: true }).click();
    await expect(page).toHaveURL(catalogPath + "?category=vegetables");
    await expect(search).toHaveValue("");
    await expect(products).toHaveCount(2);
    await expect(results.locator('[data-product="broccoli"]')).toBeVisible();
  });
}

test("the language picker keeps the product path when changing language", async ({ page }) => {
  await page.goto("/products/strawberries");
  await page.locator('summary[aria-label="Choose a language"]').click();
  await page.getByRole("link", { name: "العربية", exact: true }).click();
  await expect(page).toHaveURL("/ar/products/strawberries");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("فراولة مجمّدة");
});

test("the English country picker finds Egypt by its Arabic name", async ({ page }) => {
  await page.goto("/contact?type=general");
  const country = page.getByRole("combobox", { name: "Country" });
  await country.fill("مصر");
  await page.getByRole("option", { name: /^Egypt\b/ }).click();
  await expect(country).toHaveValue("Egypt");
});
