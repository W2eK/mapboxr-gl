import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import isDev from '../utils/is-dev';

declare global {
  interface Window {
    map: any;
  }
}

export type MapboxrGLProps = {
  view: Omit<mapboxgl.MapboxOptions, 'container'>;
};

const MapboxrGL: React.FC<MapboxrGLProps> = ({ children, view }) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    const map = new mapboxgl.Map({ ...view, container: container.current });
    if (isDev()) window.map = map;
  }, []);
  return (
    <div style={{ height: '100vh' }} ref={container}>
      {children}
    </div>
  );
};

export default MapboxrGL;
