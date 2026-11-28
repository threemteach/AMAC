import { expect, test } from "@playwright/test";

test("changing the catalog category clears search and keeps cut and size on product pages", async ({ page }) => {
  await page.goto("/products");
  const collection = page.locator("#collection");
  const cards = collection.locator("[data-product]");
  const search = page.getByRole("combobox", { name: "Explore our fruit and vegetable products" });
  await expect(collection.getByLabel("Cut")).toHaveCount(0);
  await expect(collection.getByLabel("Size")).toHaveCount(0);
  await expect(cards).toHaveCount(4);

  await collection.getByRole("button", { name: "Fruits", exact: true }).click();
  await expect(cards).toHaveCount(2);
  await search.fill("strawberries");
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toHaveAttribute("data-product", "strawberries");

  await search.fill("unlikely product");
  await expect(cards).toHaveCount(0);
  await expect(collection.getByText("No products match your search.")).toBeVisible();
  await expect(collection.getByRole("button", { name: "Reset filters" })).toHaveCount(0);
  await collection.getByRole("button", { name: "Vegetables", exact: true }).click();
  await expect(search).toHaveValue("");
  await expect(cards).toHaveCount(2);
  await collection.getByRole("button", { name: "All products", exact: true }).click();
  await expect(cards).toHaveCount(4);
  await collection.getByRole("link", { name: "Explore product: Frozen Strawberries" }).click();
  await expect(page).toHaveURL(/\/products\/strawberries$/);
  await expect(page.getByRole("group", { name: "Choose your cut" })).toBeVisible();
  await expect(page.getByRole("group", { name: "Select size / grade" })).toBeVisible();
});
