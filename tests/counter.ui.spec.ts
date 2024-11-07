import { test, expect, Locator, Page } from '@playwright/test';

test.describe('Counter UI', () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage({ baseURL: 'http://localhost:4200' });
  });

  test.afterEach(async () => {
    await page.evaluate(() => window.localStorage.clear());
  });
  test(
    'I should be able to navigate to the UI page using the links',
    { tag: '@step-2' },
    async () => {
      await page.goto('/');
      await page.getByRole('link', { name: 'Counter' }).click();
      await page.getByRole('link', { name: 'UI' }).click();
      await expect(page).toHaveURL(/\/counter\/ui/);
      await expect(page.getByTestId('counter-feature-ui')).toBeVisible();
    },
  );

  test.describe('When using the Counter UI', { tag: '@step-3' }, () => {
    let incrementButton: Locator;
    let decrementButton: Locator;
    let outputLabel: Locator;
    let fizzBuzz: Locator;
    test.beforeEach(async () => {
      await page.goto('/counter/ui');
      incrementButton = await page.getByRole('button', { name: '+' });
      decrementButton = await page.getByRole('button', { name: '-' });
      outputLabel = await page.getByTestId('current');
      fizzBuzz = await page.getByTestId('fizzBuzz');
    });
    test('It should display the expected defaults', async () => {
      await expect(incrementButton).toBeVisible();
      await expect(decrementButton).toBeDisabled();
      await expect(outputLabel).toHaveText('0');
    });
    test.describe('When incrementing the Counter by clicking on the increment button', () => {
      test('It should update the displayed count', async () => {
        await incrementButton.click();
        await expect(outputLabel).toHaveText('1');
        await incrementButton.click();
        await incrementButton.click();
        expect(await outputLabel).toHaveText('3');
      });
    });

    test('It should update the displayed count', async () => {
      await incrementButton.click();
      await incrementButton.click();
      await incrementButton.click();
      await decrementButton.click();
      await expect(outputLabel).toHaveText('2');
      await decrementButton.click();
      await decrementButton.click();
      await expect(outputLabel).toHaveText('0');
    });
    test('It should not allow you to decrement below zero', async () => {
      await expect(decrementButton).toBeDisabled();
      await incrementButton.click();
      await expect(decrementButton).not.toBeDisabled();
      await decrementButton.click();
      await expect(decrementButton).toBeDisabled();
    });

    test.describe('Fizzbuzz', () => {
      test.beforeEach(async () => {
        await page.goto('/counter/ui');
      });
      test.afterEach(async () => {
        await page.evaluate(() => window.localStorage.clear());
      });
      test('It should display no message when current is zero', async () => {
        await expect(fizzBuzz).toHaveText('');
      });
      test('It should display "fizz" when divisible by three', async () => {
        await incrementButton.click();
        await expect(fizzBuzz).toHaveText('');
        await incrementButton.click();
        await expect(fizzBuzz).not.toHaveText('Fizz');

        await incrementButton.click();
        await expect(fizzBuzz).toHaveText('Fizz');
        await incrementButton.click();
        await expect(fizzBuzz).not.toHaveText('Fizz');

        await incrementButton.click();
        await expect(fizzBuzz).not.toHaveText('Fizz');
        await incrementButton.click();
        await expect(fizzBuzz).toHaveText('Fizz');
      });
      test('It should display "buzz" when divisible by five', async () => {
        const fourTimes = [1, 2, 3, 4];
        for (const _ of fourTimes) {
          await incrementButton.click();
          await expect(fizzBuzz).not.toHaveText('Buzz');
        }
        await incrementButton.click();
        expect(await fizzBuzz).toHaveText('Buzz');
        for (const _ of fourTimes) {
          await incrementButton.click();
          await expect(fizzBuzz).not.toHaveText('Buzz');
        }
        await incrementButton.click();
        await expect(fizzBuzz).toHaveText('Buzz');
      });
      test('It should display "fizzbuzz" when divisible by three and five', async () => {
        const fourteenTimes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        for (const _ of fourteenTimes) {
          await incrementButton.click();
          await expect(fizzBuzz).not.toHaveText('FizzBuzz');
        }
        await incrementButton.click();
        await expect(fizzBuzz).toHaveText('FizzBuzz');
      });
    });
  });
});
