import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl';

import {
  getDependencies,
  cleanUp,
  isDev,
  logger,
  stringEqual
} from '../../utils';

import withProps from '../../hoc/with-props';
import { MapProvider } from '../../hoc/with-map';
import handlers from './handlers';

function MapboxrGL({ children, wrapper, dynamic, ...rest }) {
  const prev = useRef(dynamic);
  const container = useRef(null);
  const [map, setMap] = useState(null);
  /* On Render: */
  map && logger`MAPBOX: container is rendering`;

  useEffect(() => {
    /* On Mount: */
    logger`MAPBOX: container is mounting`;

    const map = new mapboxgl.Map({
      ...rest,
      container: container.current,
      style: dynamic.mapStyle || 'mapbox://styles/mapbox/streets-v11',
      ...dynamic
    });
    if (isDev()) window.map = map;
    map.on('load', () => setMap(map));

    /* On Unmount: */ // prettier-ignore
    return cleanUp(() => map.remove()) `MAPBOX: container is unmounting`;
  }, getDependencies(rest));

  /* On Update: */
  Object.entries(dynamic).forEach(([key, value]) => {
    if (!stringEqual(value, prev.current[key])) {
      handlers[key](map, value);
      logger`MAPBOX: container is updating ${key}`;
    }
  });
  prev.current = dynamic;
  return (
    <div ref={container} {...wrapper}>
      <MapProvider value={map}>{map && children}</MapProvider>
    </div>
  );
}

export default withProps(MapboxrGL, handlers);
