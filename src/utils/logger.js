import { isDev } from './is-dev';

const COLORS = {
  mounting: '#49c72a',
  redrawing: '#2196f3',
  updating: '#df9e13',
  unmounting: '#df2113',
  rendering: '#d4d4d4'
};

export const concatMessage = args => {
  const [arr, ...rest] = args;
  return arr.reduce((arr, str, i) => [...arr, str, rest[i]], []).join('');
};

const stack = [];

export const logger = (...args) => {
  if (!isDev() || !window.__MAPBOXR_GL_LOG) return;
  const message = concatMessage(args);
  const pattern = /([A-Z]*): (.*) is (\w*) ?(.*)/;
  let [, component, name, status, property = ''] = message.match(pattern);
  const print = () => {
    if (name.length < 8) name += ' '.repeat(8 - name.length);
    const color = status === 'rendering' ? `color: ${COLORS[status]};` : '';
    const styles = [
      `font-weight: bold;` + color,
      color,
      `color: ${COLORS[status]}`
    ];
    console.log(
      `%c<${component.toUpperCase()}/>\t\t%c${name}\t%c${status}${
        property && ` (${property})`
      }`,
      ...styles
    );
  };
  stack.push([component + name, status, print]);
  setTimeout(callStack, 100);
};

function callStack() {
  while (stack.length) {
    const [name, status, print] = stack.shift();
    const has = stack.findIndex(([x]) => x === name) !== -1;
    if (has && status === 'rendering') continue;
    print();
  }
}
