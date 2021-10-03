import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl';

import {
  getDependencies,
  cleanUp,
  isDev,
  logger,
  stringEqual
} from '../../utils';

import { MapProvider } from '../../hoc/with-map';
import handlers from './handlers';
import withProps from '../../hoc/with-props';
import withListeners from '../../hoc/with-listeners';
import Listener from '../listener/listener';

function MapboxrGL({
  children,
  wrapper,
  dynamic,
  onload,
  onceload,
  listeners,
  ...rest
}) {
  const prev = useRef(dynamic);
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const [loaded, setLoaded] = useState(false);

  logger`MAPBOX: container is rendering`;
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

    setMap(map);
    // map.on('load', () => setLoaded(true));
    // TODO: should to keep?
    // window.requestAnimationFrame(() => map.fire('move'));

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
      {map && (
        <MapProvider value={map}>
          {listeners.map((props, i) => (
            <Listener key={props.event + i} {...props} />
          ))}
          {children}
        </MapProvider>
      )}
    </div>
  );
}

export default withListeners(withProps(MapboxrGL, handlers));
