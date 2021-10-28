import { isDev } from './is-dev';

const COLORS = {
  init: '#00BCD4',
  render: '#4CAF50',
  redraw: '#CDDC39',
  restore: '#CDDC39',
  update: '#FF9800',
  remove: '#F44336',
  clean: '#E91E63',
  deleted: '#B71C1C',
  touched: '#d4d4d4'
};

export const concatMessage = args => {
  const [arr, ...rest] = args;
  return arr.reduce((arr, str, i) => [...arr, str, rest[i]], []).join('');
};

const adjustText = (text = 'unnamed') => {
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
    const color = status === 'touched' ? `color: ${COLORS[status]};` : '';
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
  logger.current`touched`;
  return logger.current;
};

export const getLogger = () => logger.current;
