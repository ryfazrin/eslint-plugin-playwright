import { Rule } from 'eslint';
import { isObject, isCalleeProperty } from '../utils/ast';

export default {
  create(context) {
    const max: number = 1;
    const gotoCallbackStack: number[] = [];
    
    return {
      CallExpression: (node) => {
        if (isObject(node, 'page') && isCalleeProperty(node, 'goto')) {
          
          gotoCallbackStack.push(0);

          if (gotoCallbackStack.length > max) {
            const range = node.callee;

            context.report({
              node,
              messageId: 'limitUsePageGoto',
              data: {
                order: gotoCallbackStack.length.toString(),
                max: max.toString(),
              },
            });
          }
        }
      }
    };
  },
  meta: {
    docs: {
      category: 'Possible Errors',
      description: 'Limit use of page.goto()',
      recommended: true,
    },
    messages: {
      limitUsePageGoto: 'page.goto usage max limit is {{ max }}. this is {{ order }} order.',
    },
    type: 'problem',
  },
} as Rule.RuleModule;
