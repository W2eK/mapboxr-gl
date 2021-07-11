import { logger } from './is-dev';

const stack: [Function, string?, string?][] = [];

const callStack = () => {
  while (stack.length !== 0) {
    const args = stack.pop();
    if (!args) return;
    const [callback, component = '', name = ''] = args;
    callback();
    logger(component, name, 'removing');
  }
};

const cleanUp = (...args: [Function, string?, string?]) => {
  return () => {
    stack.push(args);
    requestAnimationFrame(callStack);
  };
};

export default cleanUp;
