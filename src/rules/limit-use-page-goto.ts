import { Rule } from 'eslint';
import { CallExpression } from 'estree';
import { isObject, isCalleeProperty } from '../utils/ast';

export default {
  create(context) {
    const max: number = 1;
    const pageGotoCallbackStack: number[] = [];

    function isPageGotoCall(node: CallExpression) {
      return isObject(node, 'page') && isCalleeProperty(node, 'goto');
    }

    function pushPageGotoCallback(node: CallExpression) {
      if (!isPageGotoCall(node)) { 
        return;
      }

      pageGotoCallbackStack.push(0);

      if (pageGotoCallbackStack.length > max) {
        context.report({
          node,
          messageId: 'limitUsePageGoto',
          data: {
            order: pageGotoCallbackStack.length.toString(),
            max: max.toString(),
          },
        });
      }
    }
    
    return {
      CallExpression: pushPageGotoCallback
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
