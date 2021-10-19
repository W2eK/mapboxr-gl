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

const adjustText = text => {
  const tabs = 4;
  const tabSize = 4;
  const maxLength = tabs * tabSize;
  if (text.length > maxLength) {
    const index = (tabs * tabSize) / 2;
    text = text.slice(0, index - 2) + '...' + text.slice(-index + 2);
  }
  const filler = ' '.repeat(maxLength - text.length);
  return text + filler;
};

export const logger = { current: () => {} };

export const buildLogger = (component, ...name) => {
  if (!isDev() || !window.__MAPBOXR_GL_LOG) return () => {};
  component = adjustText(`<${component.toUpperCase()}/>`);
  name = name.map(adjustText).join('\t');
  logger.current = (...args) => {
    let [status, ...rest] = concatMessage(args).split(' ');
    name = name + rest.map(adjustText).join('\t');
    const color = status === 'rendering' ? `color: ${COLORS[status]};` : '';
    const styles = [
      `font-weight: bold;` + color,
      `font-weight: normal; color: ${COLORS[status]}`,
      `font-weight: normal;` + color
    ];
    status = adjustText(status);
    console.log(`%c${component}\t%c${status}\t%c${name}`, ...styles);
    // console.trace(component);
    // console.groupEnd();
  };
  logger.current`rendering`;
  return logger.current;
};

export const getLogger = () => logger.current;
