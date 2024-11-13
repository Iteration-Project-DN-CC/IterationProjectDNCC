const { test, expect } = require('@playwright/test');
const url = 'http://localhost:8080';
test.describe('Home Page Tests', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveURL(url);
  });

  test('has title', async ({ page }) => {
    await page.goto(url);

    await expect(page).toHaveTitle(/The Cocktail Compass/);
  });

  test('should display the main header', async ({ page }) => {
    await page.goto(url);
    await page.waitForSelector('h1.header', { timeout: 10000 }); // Increase the timeout if necessary
    const header = page.locator('h1.header');
    await expect(header).toContainText('Start Your Cocktail Journey Below');
  });
});

test.describe('Gin Drink Selection Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('Select gin and verify button has "selected" class', async ({
    page,
  }) => {
    // Find and click the "gin" button
    const firstButton = page.locator('button:has-text("gin")');
    await firstButton.waitFor();
    await firstButton.click();

    // Check if the "gin" button has the "selected" class
    await expect(firstButton).toHaveClass(/selected/);
  });

  test('Click "Find My Drink" and verify results appear', async ({ page }) => {
    // Click the "gin" button first
    const firstButton = page.locator('button:has-text("gin")');
    await firstButton.click();

    // Click the "Find My Drink" button
    const secondButton = page.locator('button:has-text("Find My Drink")');
    await secondButton.waitFor();
    await secondButton.click();

    // Wait for the card container to load and verify it contains the expected text
    const container = page.locator('.card-container');
    await container.waitFor({ timeout: 10000 });
    const firstCard = container.locator('.card').first();
    await firstCard.waitFor({ timeout: 10000 });
    await expect(firstCard).toContainText('Cherry Electric Lemonade');
  });

  test('Click "See Recipe" and verify modal content', async ({ page }) => {
    // Click the "gin" button and "Find My Drink" to load results
    const firstButton = page.locator('button:has-text("gin")');
    const secondButton = page.locator('button:has-text("Find My Drink")');
    await firstButton.click();
    await secondButton.click();

    // Wait for the card container and click the "See Recipe" button on the first card
    const container = page.locator('.card-container');
    const firstCard = container.locator('.card').first();
    await firstCard.waitFor({ timeout: 10000 });
    const thirdButton = firstCard.locator('button:has-text("See Recipe")');
    await thirdButton.click();

    // Verify modal opens with specific content
    const modal = page.locator('.popup-overlay');
    await modal.waitFor({ timeout: 10000 });
    await expect(modal).toContainText('Cherry Electric Lemonade');
  });

  test('Close modal and verify popup root is empty', async ({ page }) => {
    // Click "gin" button, "Find My Drink" button, and open the modal
    const firstButton = page.locator('button:has-text("gin")');
    const secondButton = page.locator('button:has-text("Find My Drink")');
    await firstButton.click();
    await secondButton.click();
    const container = page.locator('.card-container');
    const firstCard = container.locator('.card').first();
    const thirdButton = firstCard.locator('button:has-text("See Recipe")');
    await thirdButton.click();

    // Find and click the "close" button in the modal
    const modal = page.locator('.popup-overlay');
    const closeButton = modal.locator('button:has-text("close")');
    await closeButton.waitFor();
    await closeButton.click();

    // Verify that the popup root is empty
    const popupRoot = page.locator('#popup-root');
    const isEmpty = await popupRoot.evaluate(
      (element) => element.childElementCount === 0
    );
    expect(isEmpty).toBe(true);
  });
});

//<div data-testid="overlay" data-popup="modal" class="popup-overlay informationModial-overlay"/>

// await container.locator('button').first().click();

// // Wait for the modal to appear
// const modal = page.locator('.modal-class'); // Replace with the actual modal selector
// await modal.waitFor();

// // Check the modal for specific text
// await expect(modal).toContainText('Expected Text in Modal');

// test.describe('Home Page Tests', () => {
//   // Replace with your actual homepage URL
//   const url = 'https://example.com';

//   test('should load the homepage', async ({ page }) => {
//     await page.goto(url);
//     await expect(page).toHaveURL(url);
//   });

//   test('should have the correct title', async ({ page }) => {
//     await page.goto(url);
//     await expect(page).toHaveTitle(/Example Domain/); // Replace with your expected title
//   });

//   test('should display the main header', async ({ page }) => {
//     await page.goto(url);
//     const header = page.locator('h1'); // Adjust selector if necessary
//     await expect(header).toHaveText('Example Domain'); // Replace with expected text
//   });

//   test('should navigate to the correct link', async ({ page }) => {
//     await page.goto(url);
//     const link = page.locator('a'); // Adjust selector if necessary
//     await link.click();
//     await expect(page).toHaveURL(/.*example.com\/subpage/); // Replace with the expected destination
//   });

//   test('should have a specific element visible', async ({ page }) => {
//     await page.goto(url);
//     const element = page.locator('#important-element'); // Adjust selector for your needs
//     await expect(element).toBeVisible();
//   });
// });
