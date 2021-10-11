import { isDev } from './is-dev';

const COLORS = {
  adding: '#49c72a',
  redrawing: '#2196f3',
  restoring: '#2196f3',
  updating: '#df9e13',
  removing: '#df2113',
  deleted: '#82140c',
  rendering: '#d4d4d4'
};

export const concatMessage = args => {
  const [arr, ...rest] = args;
  return arr.reduce((arr, str, i) => [...arr, str, rest[i]], []).join('');
};

const adjustText = (text, tabs = 4) => {
  const tabSize = 4;
  const maxLength = tabs * tabSize;
  if (text.length > maxLength) {
    const index = (tabs * tabSize) / 2;
    text = text.slice(0, index - 2) + '...' + text.slice(-index + 2);
  }
  const filler = ' '.repeat(maxLength - text.length);
  return text + filler;
};

export const logger = (...args) => {
  if (!isDev() || !window.__MAPBOXR_GL_LOG) return;
  const message = concatMessage(args);
  const pattern = /([A-Z]*): (.*) is (\w*) ?(.*)/;
  let [, component, name, status, property = ''] = message.match(pattern);
  const color = status === 'rendering' ? `color: ${COLORS[status]};` : '';
  const styles = [
    `font-weight: bold;` + color,
    color,
    `color: ${COLORS[status]}`
  ];
  name = adjustText(name);
  status = adjustText(status);
  component = adjustText(`<${component}/>`);
  console.log(
    `%c${component.toUpperCase()}\t%c${name}\t%c${status}${
      property && `/${property}/`
    }`,
    ...styles
  );
};
