import { Map } from 'mapbox-gl';

export {};

declare global {
  interface Window {
    __MAPBOXR_GL_DEBUG: boolean;
    __MAPBOXR_GL_LOG: boolean;
    map?: Map;
  }
}
