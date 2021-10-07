import { concatMessage, logger } from './logger';

const stack = [];

const callStack = () => {
  while (stack.length !== 0) {
    const callback = stack.pop();
    if (!callback) return;
    callback.message && logger`${callback.message}`;
    callback();
  }
};

// prettier-ignore
export const _cleanUp = (...fn) => (...message) => {
  const [delayed, instant] = fn.reverse();
  const callback = () => {
    instant && instant();
    stack.push(delayed);
    // callStack();
    window.requestAnimationFrame(callStack)
  };
  if(message.length) {
    delayed.message = concatMessage(message);
    return callback;
  } else {
    callback();
  }
}

export const cleanUp = fn => () => {
  stack.push(fn);
  // callStack();
  window.requestAnimationFrame(callStack);
};
