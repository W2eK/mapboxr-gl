import { MapboxrGL } from 'mapboxr-gl';
import { FC } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).__MAPBOXR_GL_DEBUG = true;
  (window as any).__MAPBOXR_GL_LOG = false;
}

const logger = console.log;
export const MapContainer: FC = () => {
  return (
    <MapboxrGL
      accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onviewport={() => console.log('!!!')}
      wrapperProps={{ style: { minHeight: '100vh' } }}
    />
  );
};
