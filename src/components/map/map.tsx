import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import { Provider } from '../context';
import isDev, { logger } from '../../utils/is-dev';
import cleanUp from '../../utils/clean-up';

type MapboxrGLProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  view: Omit<mapboxgl.MapboxOptions, 'container'>;
};

const MapboxrGL: React.FC<MapboxrGLProps> = ({ children, view, ...rest }) => {
  const container = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  /* On Mount */
  // isDev(console.log('dsds'))
  logger('map', 'mapbox', 'rendering');
  useEffect(() => {
    if (!container.current) return;
    logger('map', 'mapbox', 'adding');
    const map = new mapboxgl.Map({ ...view, container: container.current });
    if (isDev()) window.__MAPBOXR_GL_MAP = map;
    map.on('load', () => setMap(map));
    /* On Unmount */
    return cleanUp(() => map.remove(), 'map', 'mapbox');
  }, []);
  return (
    <div ref={container} {...rest}>
      {map && <Provider map={map}>{children}</Provider>}
    </div>
  );
};

export default MapboxrGL;
