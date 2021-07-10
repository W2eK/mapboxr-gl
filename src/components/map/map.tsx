import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import { Provider } from '../context';
import isDev from '../../utils/is-dev';

declare global {
  interface Window {
    map: any;
  }
}

type MapboxrGLProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  view: Omit<mapboxgl.MapboxOptions, 'container'>;
};

const MapboxrGL: React.FC<MapboxrGLProps> = ({ children, view, ...rest }) => {
  const container = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  useEffect(() => {
    if (!container.current) return;
    const map = new mapboxgl.Map({ ...view, container: container.current });
    if (isDev()) window.map = map;
    map.on('load', () => setMap(map));
  }, []);
  return (
    <div ref={container} {...rest}>
      {map && <Provider map={map}>{children}</Provider>}
    </div>
  );
};

export default MapboxrGL;
