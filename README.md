# ESLint Plugin Playwright

[![Test](https://github.com/playwright-community/eslint-plugin-playwright/actions/workflows/test.yml/badge.svg)](https://github.com/playwright-community/eslint-plugin-playwright/actions/workflows/test.yml)
[![NPM](https://img.shields.io/npm/v/eslint-plugin-playwright)](https://www.npmjs.com/package/eslint-plugin-playwright)

> ESLint plugin for your [Playwright](https://github.com/microsoft/playwright)
> testing needs.

## Installation

Yarn

```bash
yarn add -D eslint-plugin-playwright
```

NPM

```bash
npm install -D eslint-plugin-playwright
```

## Usage

This plugin bundles two configurations to work with both `@playwright/test` or
`jest-playwright`.

### With [Playwright test runner](https://playwright.dev/docs/test-intro)

```json
{
  "extends": ["plugin:playwright/playwright-test"]
}
```

### With [Jest Playwright](https://github.com/playwright-community/jest-playwright)

```json
{
  "extends": ["plugin:playwright/jest-playwright"]
}
```

## List of Supported Rules

✔: Enabled in the recommended configuration.\
🔧: Some problems reported by this rule are automatically fixable by the [`--fix`](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix)
command line option.\
💡: Some problems reported by this rule are manually fixable by editor
[suggestions](https://eslint.org/docs/latest/developer-guide/working-with-rules#providing-suggestions).

|  ✔  | 🔧  | 💡  | Rule                                                                                                                                          | Description                                       |
| :-: | :-: | :-: | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
|  ✔  |     |     | [limit-use-page-goto](https://github.com/ryfazrin/eslint-plugin-playwright/blob/limit-use-page.goto/docs/rules/limit-use-page-goto.md)           | Limit usage of page.goto() |
|  ✔  |     |     | [max-nested-describe](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/max-nested-describe.md)           | Enforces a maximum depth to nested describe calls |
|  ✔  | 🔧  |     | [missing-playwright-await](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/missing-playwright-await.md) | Enforce Playwright APIs to be awaited             |
|  ✔  |     |     | [no-conditional-in-test](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-conditional-in-test.md)     | Disallow conditional logic in tests               |
|  ✔  |     | 💡  | [no-element-handle](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-element-handle.md)               | Disallow usage of element handles                 |
|  ✔  |     |     | [no-eval](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-eval.md)                                   | Disallow usage of `page.$eval` and `page.$$eval`  |
|  ✔  |     | 💡  | [no-focused-test](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-focused-test.md)                   | Disallow usage of `.only` annotation              |
|  ✔  |     |     | [no-force-option](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-force-option.md)                   | Disallow usage of the `{ force: true }` option    |
|  ✔  |     |     | [no-page-pause](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-page-pause.md)                       | Disallow using `page.pause`                       |
|  ✔  |     | 💡  | [no-skipped-test](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-skipped-test.md)                   | Disallow usage of the `.skip` annotation          |
|  ✔  |     | 💡  | [no-wait-for-timeout](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-wait-for-timeout.md)           | Disallow usage of `page.waitForTimeout`           |
