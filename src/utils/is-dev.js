const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const isDev = () => !!window.__MAPBOXR_GL_DEBUG && development;
