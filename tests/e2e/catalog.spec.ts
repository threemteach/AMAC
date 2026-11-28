import { expect, test } from "@playwright/test";

test("catalog combines category, cut and size filters and can reset them", async ({ page }) => {
  await page.goto("/products");
  const collection = page.locator("#collection");
  const cards = collection.locator("[data-product]");
  const cut = collection.getByLabel("Cut");
  const size = collection.getByLabel("Size");
  await expect(cards).toHaveCount(4);

  await collection.getByRole("button", { name: "Fruits", exact: true }).click();
  await expect(cards).toHaveCount(2);
  await cut.selectOption({ label: "Diced" });
  await size.selectOption("25");
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toHaveAttribute("data-product", "strawberries");

  await collection.getByRole("button", { name: "Vegetables", exact: true }).click();
  await expect(cards).toHaveCount(0);
  await expect(collection.getByText("No products match your search.")).toBeVisible();
  await collection.getByRole("button", { name: "Reset filters" }).click();
  await expect(cut).toHaveValue("");
  await expect(size).toHaveValue("");
  await expect(cards).toHaveCount(4);
});
