import React from 'react';
import MapboxrGL from 'mapboxr-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapContainer = () => {
  return (
    <MapboxrGL
      accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      wrapper={{ style: { height: '100vh' } }}
      test="dd"
      rex="sdd"
      rest={4}
    />
  );
};

export default MapContainer;
