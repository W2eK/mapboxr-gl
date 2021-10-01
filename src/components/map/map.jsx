import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl';

function MapboxrGL({ accessToken, mapStyle, wrapper }) {
  const container = useRef(null);
  useEffect(() => {
    console.log(container.current);
    const map = new mapboxgl.Map({
      accessToken,
      style: mapStyle || 'mapbox://styles/mapbox/streets-v11',
      container: container.current
    });
  });
  return <div ref={container} {...wrapper} />;
}

export default MapboxrGL;
