import React, { FC, useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import { buildLogger } from '../../lib/logger';
import { MapboxrGLProps } from './map.props';
import { isDev } from '../../lib/is-dev';
import { WithListeners, withListeners } from '../../hoc/with-listeners';
import { MapProvider } from '../../context/map-context';
import { ParentProvider } from '../../context/parent-context';

const MapboxrGL: FC<WithListeners<MapboxrGLProps>> = ({
  children = null,
  wrapperProps,
  mapStyle,
  accessToken,
  listeners,
  ...props
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);
  // ! HOW IT WORKS?
  const status = useRef<{ alive: boolean; map: Map | null }>({ alive: false, map: null });

  const _ = buildLogger('mapbox');

  // * RENDERING
  /* STATUS: */ _`rendering`;

  useEffect(() => {
    if (!container.current) return;

    /* STATUS: */ _`render`;
    // * Map Initialization
    const map = new mapboxgl.Map({
      container: container.current,
      style: mapStyle || 'mapbox://styles/mapbox/streets-v12',
      accessToken,
      ...props
    });

    // * Assign map to window for Debugging purposes
    if (isDev()) window.map = map;

    // * Update state for children
    status.current = {
      ...status.current,
      alive: true
    };

    setMap(map);

    // * Event which fired when map style is finally loaded
    map.once('styledata', () => {
      // * Apply custom props
      // debugPropsKeys.forEach(key => key in props && handlers[key].call(map, props[key]));
      setLoaded(true);
    });

    // TODO: should to keep?
    // window.requestAnimationFrame(() => map.fire('move'));
    // map.on('error', () => {});

    // * Map clean-up function on map removing or changes in props without handlers
    return () => {
      /* STATUS: */ _`remove`;
      status.current.alive = false;
      status.current.map = null;
      setLoaded(false);
      setMap(null);
      map.remove();
    };
  }, []);

  return (
    <div ref={container} {...wrapperProps}>
      {map && (
        <MapProvider value={{ map, loaded }}>
          <ParentProvider value={{ parent: status.current }}>
            {listeners}
            {children}
          </ParentProvider>
        </MapProvider>
      )}
    </div>
  );
};

const MapboxrGLWithListeners = withListeners<MapboxrGLProps>(MapboxrGL);

export { MapboxrGLWithListeners as MapboxrGL };
