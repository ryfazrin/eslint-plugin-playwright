import { Rule } from 'eslint';
import { isObject, isCalleeProperty } from '../utils/ast';

export default {
  create(context) {
    // function pushGotoCallback(node: Rule.Node) {
    //   if (
    //     node.parent.type !== 'CallExpression' ||
    //     !isDescribeCall(node.parent)
    //   ) {
    //     return;
    //   }

    //   describeCallbackStack.push(0);

    //   if (describeCallbackStack.length > max) {
    //     context.report({
    //       node: node.parent,
    //       messageId: 'exceededMaxDepth',
    //       data: {
    //         depth: describeCallbackStack.length.toString(),
    //         max: max.toString(),
    //       },
    //     });
    //   }
    // }

    return {
      CallExpression(node) {
      //   function pushGotoCallback(node: Rule.Node) {
      //   if (
      //     node.parent.type !== 'CallExpression' ||
      //     !isGoto
      //   ) {
      //     return;
      //   }

      //   gotoCallbackStack.push(0);

      //   if (gotoCallbackStack.length > max) {
      //     context.report({ messageId: 'noPageGoto', node });
      // context.report({
      //   node: node.parent,
      //   messageId: 'exceededMaxDepth',
      //   data: {
      //     depth: describeCallbackStack.length.toString(),
      //     max: max.toString(),
      //   },
      // });
      //   }
      // }

        const { options } = context;
        const max: number = options[0]?.max ?? 2;
        const gotoCallbackStack: number[] = [];
        const isGoto = isObject(node, 'page') && isCalleeProperty(node, 'goto')

        if (isGoto) {
          gotoCallbackStack.push(0);
        }

        // if (isObject(node, 'page') && isCalleeProperty(node, 'goto')) {
        if(gotoCallbackStack.length > max) {
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
