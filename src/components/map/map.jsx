import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl';
import { getDependencies } from '../../utils';
import withProps from '../../hoc/with-props';
import handlers from './handlers';

function MapboxrGL({ accessToken, mapStyle, wrapper, dynamic, ...rest }) {
  const container = useRef(null);
  useEffect(() => {
    console.log(container.current);
    const map = new mapboxgl.Map({
      accessToken,
      container: container.current,
      style: mapStyle || 'mapbox://styles/mapbox/streets-v11'
    });
  }, getDependencies(rest));
  return <div ref={container} {...wrapper} />;
}

export default withProps(MapboxrGL, handlers);
