const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

declare global {
  interface Window {
    __MAPBOXR_GL_MAP: mapboxgl.Map;
    __MAPBOXR_GL_DEBUG?: boolean;
    __MAPBOXR_GL_VERBOSE?: boolean;
  }
}

function isDev(): boolean {
  return !!window.__MAPBOXR_GL_DEBUG && development;
}

export enum COLORS {
  adding    = '#49c72a',
  redrawing = '#2196f3',
  updating  = '#df9e13',
  removing  = '#df2113',
  rendering = '#d4d4d4'
}

const logger = (
  component: string,
  name: string,
  status: keyof typeof COLORS
) => {
  if (!isDev() || !window.__MAPBOXR_GL_VERBOSE) return;
  const color = status === 'rendering' ? `color: ${COLORS[status]};` : '';
  const styles = [
    `font-style: italic;` + color,
    'font-weight: bold;' + color,
    `color: ${COLORS[status]}`
  ];
  console.log(
    `%c${component.toUpperCase()}:\t%c${name}\t%c${status}`,
    ...styles
  );
};

export default isDev;
export { logger };
