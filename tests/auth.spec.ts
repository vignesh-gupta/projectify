// my-test.spec.ts
import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { expect, test } from "@playwright/test";

test("sign up", async ({ page }) => {
  await setupClerkTestingToken({
    page,
    options: {
      frontendApiUrl: "https://workable-piglet-82.clerk.accounts.dev/",
    },
  });

  await page.goto("/sign-up");
  await expect(page.locator("h1")).toContainText("Create your account");
  await page.waitForSelector(".cl-signUp-root", { state: "attached" });
  await page.locator("input[name=username]").fill("user" + Date.now());
  await page.locator("input[name=password]").fill("Pass!@" + Date.now());
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.waitForURL("**/protected");
});
