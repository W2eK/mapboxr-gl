import { isDev } from './is-dev';

const COLORS = {
  adding: '#49c72a',
  redrawing: '#2196f3',
  restoring: '#2196f3',
  updating: '#df9e13',
  removing: '#df2113',
  deleted: '#82140c',
  rendering: '#d4d4d4'
} as const;

type LoggerStatus = keyof typeof COLORS;

export const concatMessage = (args: any): string => {
  const [arr, ...rest] = args;
  // TODO: fix types
  // @ts-ignore
  return arr.reduce((arr, str, i) => [...arr, str, rest[i]], []).join('');
};

const adjustText = (text: string) => {
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

export const logger = { current: (str: TemplateStringsArray) => {} };

export const buildLogger = (component: string, ...names: string[]) => {
  if (!isDev() || !window.__MAPBOXR_GL_LOG) return () => {};
  component = adjustText(`<${component.toUpperCase()}/>`);
  let name = names.map(adjustText).join('\t');
  logger.current = (args: TemplateStringsArray) => {
    let [status, ...rest] = concatMessage(args).split(' ') as [LoggerStatus, string];
    name = name + rest.map(adjustText).join('\t');
    const color = status === 'rendering' ? `color: ${COLORS[status]};` : '';
    const styles = [`font-weight: bold;` + color, `color: ${COLORS[status]}`, color];
    const stylizedStatus = adjustText(status);
    console.log(`%c${component}\t%c${stylizedStatus}\t%c${name}`, ...styles);
  };
  return logger.current;
};

export const getLogger = () => logger.current;
