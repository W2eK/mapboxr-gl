import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import { Provider } from '../context';
import { isDev, logger, cleanUp, deepEqual, getDependencies } from 'utils';
import propHandlers, { DynamicPropNames } from './props';
import withProps from 'hoc/with-props';

type ConstantMapProps = Partial<
  Omit<mapboxgl.MapboxOptions, 'container' | 'style' | DynamicPropNames>
>;

type DynamicMapProps = {
  [P in DynamicPropNames]?: Parameters<typeof propHandlers[P]>[1];
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
  // prettier-ignore
  // const dynamic =
  //   { style, minZoom, maxZoom, minPitch, maxPitch, renderWorldCopies };
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
      style: 'mapbox://styles/mapbox/streets-v11',
      container: container.current
    });
    if (isDev()) window.__MAPBOXR_GL_MAP = map;
    map.on('load', () => setMap(map));
    /* On Unmount */
    return cleanUp(() => map.remove(), 'map', 'mapbox');
  }, dependecies);

  return (
    <div ref={container} {...wrapper}>
      {map && <Provider map={map}>{children}</Provider>}
    </div>
  );
};

export default withProps(MapboxrGL, propHandlers);
