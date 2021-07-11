const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

declare global {
  interface Window {
    __MAPBOXR_GL_MAP: mapboxgl.Map;
    __MAPBOXR_GL_DEBUG?: boolean;
  }
}

function isDev(): boolean {
  return !!window.__MAPBOXR_GL_DEBUG && development;
}

/*
const logger = ((): Console  => {
  const logger = console;
  const checkIsDev =
    (f: Function) =>
    (...args: any[]): void =>
      isDev() && f.apply(null, args);
  for (const key in logger) logger[key] = checkIsDev(logger[key]);
  return logger;
})();
*/

export enum COLORS {
  adding = '#49c72a',
  updating = '#df9e13',
  removing = '#df2113',
  rendering = '#d4d4d4'
}

const logger = (
  component: string,
  name: string,
  status: keyof typeof COLORS
) => {
  if (!isDev()) return;
  const color = status === 'rendering' ? `color: ${COLORS[status]};` : '';
  const styles = [
    `font-style: italic;` + color,
    'font-weight: bold;' + color,
    `color: ${COLORS[status]}`
  ];
  console.log(`%c${component.toUpperCase()}:\t%c${name}\t%c${status}`, ...styles);
};

export default isDev;
export { logger };

/*
import { logger } from '../../utils/is-dev';
logger.group(`Source:\t${id}`);
logger.log('%cupdating', 'color: #df9e13;');
logger.log('%cskipping', 'color: #7c7567;');
logger.log('%cadding', 'color: #49c72a;');
logger.log('%cremoving', 'color: #df2113;');
logger.groupEnd()
*/
