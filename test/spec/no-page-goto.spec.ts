import { runRuleTester, wrapInTest } from '../utils/rule-tester';
import rule from '../../src/rules/no-page-goto';

const invalid = (code: string) => ({
  code: wrapInTest(code),
  errors: [{ messageId: 'noPageGoto' }],
});

const valid = wrapInTest;

runRuleTester('no-page-goto', rule, {
  invalid: [
    invalid('await page.goto()'),
    // invalid('await page.goto()'),
  ],
  valid: [
    // valid('await page.goto()'),
    valid('await page.click()'),
    // valid('await page.goto()'),
    valid('await expect(page).toBePaused()'),
  ],
});
