const { test, expect } = require('@playwright/test');
const url = 'http://localhost:8080';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('should load the homepage', async ({ page }) => {
    await expect(page).toHaveURL(url);
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/The Cocktail Compass/);
  });

  // maybe look for logo?
});

test.describe('Check login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('valid user login form test', async ({ page }) => {
    // Locate and fill in the username
    const firstButton = page.locator('button:has-text("login")');
    await firstButton.click();

    await page.fill('#username', 'warren');

    // Locate and fill in the password
    await page.fill('#password', 'cutler');

    // Locate and fill in the birthday (if it's uncommented in the component)
    // Uncomment the line below if the birthday field is in use
    // await page.fill('#birthday', '1995-02-02');

    // Submit the form
    await page.click('button[type="submit"]');

    // Expect some outcome after a successful login
    // Example: Checking for a successful navigation or message
    // await expect(page) // Update based on expected behavior after login
    const logo = page.locator('#logo');
    await logo.waitFor({ timeout: 10000 });
    await expect(logo).toBeVisible();
  });
});

// test.describe('Gin Drink Selection Workflow', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto(url);
//   });

// test('Click "by liquor" and verify results appear', async ({ page }) => {
//   // Click the "gin" button first
//   const firstButton = page.locator('button:has-text("by liquor")');
//   await firstButton.click();

//   // Wait for the card container to load and verify it contains the expected text
//   const main = page.locator('#main-content');
//   await main.waitFor({ timeout: 10000 });
//   const firstCard = container.locator('div').first();
//   await firstCard.waitFor({ timeout: 10000 });
//   await expect(firstCard).toContainText('Cherry Electric Lemonade');
// });

// test('Click "See Recipe"', async ({ page }) => {
//   // Click the "gin" button first
//   const firstButton = page.locator('button:has-text("gin")');
//   await firstButton.click();

//   // Wait for the card container to load and verify it contains the expected text
//   const container = page.locator('#card-container');
//   await container.waitFor({ timeout: 10000 });

//   const firstCard = container.locator('div').first();
//   await firstCard.waitFor({ timeout: 10000 });

//   const secondButton = firstCard.locator('button:has-text("See Recipe")');
//   await secondButton.waitFor({ timeout: 10000 });
//   await secondButton.click();

//   const modal = page.locator('.popup-overlay');
//   await modal.waitFor({ timeout: 10000 });
//   await expect(modal).toContainText('Cherry Electric Lemonade');
// });

async function waitForAndClick(locator) {
  await locator.waitFor({ timeout: 10000 });
  await locator.click();
}

// test('Close modal and verify popup root is empty', async ({ page }) => {
//   // Click the "gin" button
//   const ginButton = page.locator('button:has-text("gin")');
//   await waitForAndClick(ginButton);

//   // Wait for the card container to load and find the first card
//   const container = page.locator('#card-container');
//   await container.waitFor({ timeout: 10000 });
//   const firstCard = container.locator('div').first();

//   // Click the "See Recipe" button in the first card
//   const seeRecipeButton = firstCard.locator('button:has-text("See Recipe")');
//   await waitForAndClick(seeRecipeButton);

//   // Wait for modal to appear and click the close button
//   const modal = page.locator('.popup-overlay');
//   const closeButton = modal.locator('button:has-text("close")');
//   await waitForAndClick(closeButton);

//   // Verify that the popup root is empty (no child elements)
//   const popupRoot = page.locator('#popup-root');
//   const isPopupRootEmpty = await popupRoot.evaluate(
//     (el) => el.childElementCount === 0
//   );
//   expect(isPopupRootEmpty).toBe(true);
// });

// test('Click toggle should show Ingredients Form', async ({ page }) => {
//   // Click the toggle switch
//   const toggle = page.locator('#toggle');
//   await waitForAndClick(toggle);

//   // Verify the ingredients container has at least one child element
//   const ingredientsContainer = page.locator('#ingredients');
//   await ingredientsContainer.waitFor({ timeout: 10000 });
//   const hasChildren = await ingredientsContainer.evaluate(
//     (el) => el.childElementCount > 0
//   );
//   expect(hasChildren).toBe(true);
// });
// });

//<div class="w-full flex flex-col items-center">
//<div data-testid="overlay" data-popup="modal" class="popup-overlay informationModial-overlay"/>
