import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl';
import { getDependencies, cleanUp, isDev, logger } from '../../utils';
import withProps from '../../hoc/with-props';
import handlers from './handlers';

const name = 'container';
function MapboxrGL({ accessToken, wrapper, dynamic, ...rest }) {
  const container = useRef(null);
  useEffect(() => {
    /* On Mount: */
    logger`MAPBOX: container is mounting`;

    const map = new mapboxgl.Map({
      accessToken,
      container: container.current,
      style: dynamic.mapStyle || 'mapbox://styles/mapbox/streets-v11',
      ...dynamic
    });
    if (isDev()) window.map = map;

    /* On Unmount: */ // prettier-ignore
    return cleanUp(() => map.remove()) `MAPBOX: container is unmounting`;
  }, getDependencies(rest));
  return <div ref={container} {...wrapper} />;
}

export default withProps(MapboxrGL, handlers);
