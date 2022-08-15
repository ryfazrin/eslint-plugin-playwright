import { Rule } from 'eslint';
import { CallExpression } from 'estree';
import { isObject, isCalleeProperty } from '../utils/ast';

export default {
  create(context) {
    const { options } = context;
    const max: number = options[0]?.max ?? 2;
    const gotoCallbackStack: number[] = [];

    function pushGotoCallback(node: CallExpression) {
      if (!(isObject(node, 'page') && isCalleeProperty(node, 'goto'))) {
        return;
      }

      gotoCallbackStack.push(0);

      if (gotoCallbackStack.length > max) {
        context.report({
          node,
          messageId: 'noPageGoto'
        });
      }
    }

    function popGotoCallback(node: CallExpression) {
      if (isObject(node, 'page') && isCalleeProperty(node, 'goto')) {
        gotoCallbackStack.pop();
      }
    }

    return {
      CallExpression: pushGotoCallback,
      'CallExpression:exit': popGotoCallback,
    };

    // return {
    //   CallExpression(node) {
    //     if (isObject(node, 'page') && isCalleeProperty(node, 'goto')) {
    //     // if(gotoCallbackStack.length > max) {
    //       console.log('Ryan Node:', node);
    //       context.report({ messageId: 'noPageGoto', node });
    //     }
    //   },
    // };
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
