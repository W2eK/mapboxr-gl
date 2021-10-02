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

export const logger = (...args) => {
  if (!isDev() || !window.__MAPBOXR_GL_LOG) return;
  const message = concatMessage(args);
  const pattern = /([A-Z]*): (.*) is (\w*) ?(.*)/;
  const [, component, name, status, property = ''] = message.match(pattern);
  const color = status === 'rendering' ? `color: ${COLORS[status]};` : '';
  const styles = [
    `font-weight: bold;` + color,
    color,
    `color: ${COLORS[status]}`
  ];
  console.log(
    `%c<${component.toUpperCase()}/>\t%c${name}:\t%c${status}${property && ` (${property})`}`,
    ...styles
  );
};
