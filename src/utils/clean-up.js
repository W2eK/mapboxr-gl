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
export const cleanUp = (...fn) => (...message) => {
  const [delayed, instant = () => {}] = fn.reverse();
  const callback = () => {
    instant();
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
