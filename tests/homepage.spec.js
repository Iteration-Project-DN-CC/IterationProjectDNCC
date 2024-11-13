const { test, expect } = require('@playwright/test');

test.describe('Home Page Tests', () => {
  const url = 'http://localhost:3000';

  test('should load the homepage', async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveURL(url);
  });

  test('has title', async ({ page }) => {
    await page.goto(url);

    await expect(page).toHaveTitle(/The Cocktail Compass/);
  });

  xtest('should display the main header', async ({ page }) => {
    // await page.waitForSelector('h1.header', { timeout: 10000 }); // Increase the timeout if necessary
    // await expect(header).toContainText('Start Your Cocktail Journey Below');
    await page.goto(url);
    const header = page.locator('h1.header');
    //await expect(header).toHaveText(/Start Your Cocktail Journey Below/);
    await expect(header).toContainText('Start Your Cocktail Journey Below');
  });

  xtest('should change content to gin after selecting gin and pressing Find My Drink', async ({
    page,
  }) => {
    await page.goto(url);

    // Locate the buttons

    const firstButton = page.locator('button:has-text("gin")');
    const secondButton = page.locator('button:has-text("Find My Drink")');
    const thirdButton = page.locator('button:has-text("See Recipe)');

    await firstButton.click();

    await secondButton.click();

    await thirdButton.click();

    // Verify the content change
    const content = page.locator('.card-container');
    await expect(content).toHaveText('Gin');
  });
});

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
