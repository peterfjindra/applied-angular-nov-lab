import { test, expect, Locator, Page } from '@playwright/test';

test.describe('Counter', () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage({ baseURL: 'http://localhost:4200' });
  });
  test.beforeEach(async () => {
    await page.goto('/');
    await page.evaluate(() => window.localStorage.clear());
  });
  test.afterEach(async () => {
    await page.evaluate(() => window.localStorage.clear());
  });

  test.describe('Navigation', () => {
    test.beforeEach(async () => {
      await page.evaluate(() => window.localStorage.clear());
    });
    test.describe('Given I am at the home page', () => {
      // This test will navigate to the Counter page
      test(
        'I should be able to navigate to the Counter feature using the links',
        { tag: '@step-1' },
        async () => {
          await page.getByRole('link', { name: 'Counter' }).click();
          await expect(page).toHaveURL(/\/counter/);
          await expect(page.getByTestId('counter-feature')).toBeVisible();
        },
      );
    });
  });
});
