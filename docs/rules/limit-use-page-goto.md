## Limit usage of `page.goto()`  (`limit-use-page-goto`)

Limit the use of `page.goto()` to only 1 time.

## Rule Details

Example of **incorrect** code for this rule:

```javascript
await page.goto('https://github.com/playwright-community/eslint-plugin-playwright');
await page.pause();
await page.goto('https://github.com/playwright-community/');
```

Example of **correct** code for this rule:

```javascript
await page.goto('https://github.com/playwright-community/eslint-plugin-playwright');
await page.pause();
```
