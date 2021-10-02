import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl';
import { getDependencies, cleanUp, isDev, logger } from '../../utils';
import withProps from '../../hoc/with-props';
import handlers from './handlers';

const name = 'container';
function MapboxrGL({ accessToken, mapStyle, wrapper, dynamic, ...rest }) {
  const container = useRef(null);
  useEffect(() => {
    /* On Mount: */
    logger`MAPBOX: container is mounting`;
    logger`LAYER: pois-dots is mounting`;
    const map = new mapboxgl.Map({
      accessToken,
      container: container.current,
      style: mapStyle || 'mapbox://styles/mapbox/streets-v11'
    });
    if (isDev()) window.map = map;
    /* On Unmount: */
    return cleanUp(() => map.remove()); // `MAP: container is unmounting`;
  }, getDependencies(rest));
  return <div ref={container} {...wrapper} />;
}

export default withProps(MapboxrGL, handlers);
