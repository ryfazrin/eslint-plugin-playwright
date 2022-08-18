import { runRuleTester, wrapInTest } from '../utils/rule-tester';
import rule from '../../src/rules/limit-use-page-goto';

const invalid = (code: string) => ({
  code: wrapInTest(code),
  errors: [{ messageId: 'limitUsePageGoto' }],
});

const valid = wrapInTest;

runRuleTester('Limit-use-page-goto', rule, {
  invalid: [
    invalid(`
    await page.goto()
    await page.goto()
    await page.click()
    `),
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
    valid(`
    await page.goto()
    await page.click()
    `),
    valid('await expect(page).toBePaused()'),
  ],
});
