import { runRuleTester, wrapInTest } from '../utils/rule-tester';
import rule from '../../src/rules/no-page-goto';

const invalid = (code: string) => ({
  code: wrapInTest(code),
  errors: [{ messageId: 'noPageGoto' }],
});

const valid = wrapInTest;

runRuleTester('no-page-goto', rule, {
  invalid: [
    // harusnya invalid, tapi kok malah error yak??
    invalid(`
    await page.goto()
    await page.goto()
    await page.goto()
    await page.click()
    `),
  ],
  valid: [
    valid(`
    await page.goto()
    `),
    // pasti error
    valid(`
    await page.goto()
    await page.goto()
    await page.goto()
    await page.click()
    `),
    // valid(`
    // await page.goto()
    // await page.goto()
    // `),
    // valid(`
    // await page.goto()
    // `),
    // valid(`
    // await page.goto()
    // await page.goto()
    // await page.goto()
    // `),
    valid(`
    await page.goto()
    await page.click()
    `),
    valid('await expect(page).toBePaused()'),
  ],
});
