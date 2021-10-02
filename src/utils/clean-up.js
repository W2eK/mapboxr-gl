import { concatMessage, logger } from '.';

const stack = [];

const callStack = () => {
  while (stack.length !== 0) {
    const callback = stack.pop();
    if (!callback) return;
    logger`${callback.message}`;
    callback();
  }
};

// prettier-ignore
export const cleanUp = callback => (...args) => {
  callback.message = concatMessage(args);
  return () => {
    stack.push(callback);
    callStack();
    /* FIXME: async cleaner
      remove map after mounting of new  */
    // window.requestAnimationFrame(callStack);
  };
}
