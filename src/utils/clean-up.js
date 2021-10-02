// import { logger } from './is-dev';

const stack = [];

const callStack = () => {
  while (stack.length !== 0) {
    const args = stack.pop();
    if (!args) return;
    const [callback, component = '', name = ''] = args;
    callback();
    // logger(component, name, 'removing');
  }
};

// export const cleanUp = (...args) => {
//   return () => {
//     stack.push(args);
//     window.requestAnimationFrame(callStack);
//   };
// };

export const cleanUp = (...args) => {
  return () => {
    stack.push(args);
    window.requestAnimationFrame(callStack);
  };
};