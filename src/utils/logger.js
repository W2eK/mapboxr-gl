import { isDev } from './is-dev';

const COLORS = {
  adding: '#49c72a',
  redrawing: '#2196f3',
  updating: '#df9e13',
  removing: '#df2113',
  deleted: '#82140c',
  rendering: '#d4d4d4'
};

export const concatMessage = args => {
  const [arr, ...rest] = args;
  return arr.reduce((arr, str, i) => [...arr, str, rest[i]], []).join('');
};

// const stack = [];

export const logger = (...args) => {
  if (!isDev() || !window.__MAPBOXR_GL_LOG) return;
  const message = concatMessage(args);
  const pattern = /([A-Z]*): (.*) is (\w*) ?(.*)/;
  let [, component, name, status, property = ''] = message.match(pattern);
  if (name.length >= 5 * 4)
    name =
      name.slice(0, (5 * 4) / 2 - 2) + '...' + name.slice((5 * 4) / -2 + 2);

  const color = status === 'rendering' ? `color: ${COLORS[status]};` : '';
  const styles = [
    `font-weight: bold;` + color,
    color,
    `color: ${COLORS[status]}`
  ];
  console.log(
    `%c<${component.toUpperCase()}/>\t\t%c${name}${'\t'.repeat(
      Math.max(0, 4 - Math.floor(name.length / 4))
    )}\t%c${status}${property && ` (${property})`}`,
    ...styles
  );
  // const print = () => {
  // };
  // print();
  // stack.push([component + name, status, print]);
  // setTimeout(callStack, 100);
};

/*
function callStack() {
  while (stack.length) {
    const [name, status, print] = stack.shift();
    const has = stack.findIndex(([x]) => x === name) !== -1;
    if (has && status === 'rendering') continue;
    print();
  }
}
*/