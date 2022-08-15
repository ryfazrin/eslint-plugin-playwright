import { Rule } from 'eslint';
import { CallExpression } from 'estree';
import { isObject, isCalleeProperty } from '../utils/ast';

export default {
  create(context) {
    return {
      CallExpression(node) {
        if (isObject(node, 'page') && isCalleeProperty(node, 'goto')) {
          context.report({ messageId: 'noPageGoto', node });
        }
      },
    };
  },
  meta: {
    docs: {
      category: 'Possible Errors',
      description: 'Prevent usage of page.goto()',
      recommended: true,
    },
    messages: {
      noPageGoto: 'COBA DESKRIPSI Unexpected use of page.goto().',
    },
    type: 'problem',
  },
} as Rule.RuleModule;
