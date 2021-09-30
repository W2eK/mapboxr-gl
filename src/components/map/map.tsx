import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Provider } from '../context';
import { isDev, logger, cleanUp, deepEqual, getDependencies } from 'utils';
import propHandlers, { DynamicPropNames } from './props';
import withProps from 'hoc/with-props';

type ConstantMapProps = Partial<
  Omit<mapboxgl.MapboxOptions, 'container' | 'style' | DynamicPropNames>
>;

type DynamicMapProps = {
  [P in DynamicPropNames]?: Exclude<
    Parameters<typeof propHandlers[P]>[1],
    null
  >;
};

type HTMLWrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type MapboxrGLProps = ConstantMapProps & {
  wrapper?: HTMLWrapperProps;
  dynamic: DynamicMapProps;
};

const MapboxrGL: React.FC<MapboxrGLProps> = ({
  children,
  wrapper,
  // listeners,
  dynamic,
  ...rest
}) => {
  const dependecies = getDependencies(rest);
  const prev = useRef(dynamic);
  const container = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  /* On Mount */
  logger('map', 'mapbox', 'rendering');

  useEffect(() => {
    if (!container.current) return;
    logger('map', 'mapbox', 'adding');
    const map = new mapboxgl.Map({
      ...rest,
      style: dynamic.mapStyle || 'mapbox://styles/mapbox/streets-v11',
      ...dynamic,
      container: container.current
    });
    if (isDev()) window.__MAPBOXR_GL_MAP = map;
    map.on('load', () => setMap(map));
    /* On Unmount */
    return cleanUp(() => map.remove(), 'map', 'mapbox');
  }, dependecies);

  /* On Update */
  Object.entries(dynamic).map(([key, value]) => {
    if (!map) return;
    if (!deepEqual(value, prev.current[key as DynamicPropNames])) {
      logger('map', 'mapbox', 'updating');
      // @ts-ignore
      propHandlers[key as DynamicPropNames](map, value);
    }
  });
  return (
    <div ref={container} {...wrapper}>
      {map && <Provider map={map}>{children}</Provider>}
    </div>
  );
};

export default withProps(MapboxrGL, propHandlers);
