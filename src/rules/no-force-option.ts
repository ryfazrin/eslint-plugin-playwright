import { Rule } from 'eslint';
import * as ESTree from 'estree';
import { isBooleanLiteral, isIdentifier } from '../utils/ast';

function isForceOptionEnabled(node: ESTree.CallExpression) {
  return node.arguments.some(
    (argument) =>
      argument.type === 'ObjectExpression' &&
      argument.properties.some(
        (property) =>
          property.type === 'Property' &&
          isIdentifier(property.key, 'force') &&
          isBooleanLiteral(property.value, true)
      )
  );
}

// https://playwright.dev/docs/api/class-locator
const methodsWithForceOption = new Set([
  'check',
  'uncheck',
  'click',
  'dblclick',
  'dragTo',
  'fill',
  'hover',
  'selectOption',
  'selectText',
  'setChecked',
  'tap',
]);

export default {
  create(context) {
    return {
      MemberExpression(node) {
        if (
          node.property.type === 'Identifier' &&
          methodsWithForceOption.has(node.property.name) &&
          node.parent.type === 'CallExpression' &&
          isForceOptionEnabled(node.parent)
        ) {
          context.report({ messageId: 'noForceOption', node });
        }
      },
    };
  },
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Prevent usage of `{ force: true }` option.',
      recommended: true,
      url: 'https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-force-option.md',
    },
    messages: {
      noForceOption: 'Unexpected use of { force: true } option.',
    },
    type: 'suggestion',
  },
} as Rule.RuleModule;
