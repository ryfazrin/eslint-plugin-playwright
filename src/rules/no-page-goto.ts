import { Rule } from 'eslint';
import { CallExpression } from 'estree';
import { isObject, isCalleeProperty } from '../utils/ast';

export default {
  create(context) {
    const { options } = context;
    // const max: number = options[0]?.max ?? 1;
    const max: number = 1;
    const gotoCallbackStack: number[] = [];

    // function pushGotoCallback(node: CallExpression) {
    //   if ((isObject(node, 'page') && isCalleeProperty(node, 'goto'))) {
    //     // return;
    //     context.report({
    //       node,
    //       messageId: 'noPageGoto'
    //     });
    //   }

    //   // gotoCallbackStack.push(0);

    //   // if (gotoCallbackStack.length > max) {
    //   //   context.report({
    //   //     node,
    //   //     messageId: 'noPageGoto'
    //   //   });
    //   // }

    //   gotoCallbackStack.push(0);
    //   console.log('gotoCallbackStack:', gotoCallbackStack);
    // }

    // function popGotoCallback(node: CallExpression) {
    //   if (isObject(node, 'page') && isCalleeProperty(node, 'goto')) {
    //     gotoCallbackStack.pop();
    //   }
    // }

    // return {
    //   CallExpression: pushGotoCallback,
    //   'CallExpression:exit': popGotoCallback,
    // };

    return {
      CallExpression: (node) => {
        if (isObject(node, 'page') && isCalleeProperty(node, 'goto')) {
        // if(gotoCallbackStack.length > max) {

          gotoCallbackStack.push(0);
          // console.log(`Ryan Node ${gotoCallbackStack.length}:`, node);
          if (gotoCallbackStack.length > max) {
            context.report({ 
              node,
              messageId: 'noPageGoto',
              data: {
                order: gotoCallbackStack.length.toString(),
                max: max.toString(),
              },
            });
          }
        }
      },
      // 'CallExpression:exit': (node: CallExpression) => {
      //   if (isObject(node, 'page') && isCalleeProperty(node, 'goto')) {
      //     gotoCallbackStack.pop();
      //   }
      // },
    };
  },
  meta: {
    docs: {
      category: 'Possible Errors',
      description: 'Prevent usage of page.goto()',
      recommended: true,
    },
    messages: {
      noPageGoto: 'COBA DESKRIPSI Limit ({{ max }}) use of page.goto() of ({{ order }}).',
    },
    type: 'problem',
  },
} as Rule.RuleModule;
