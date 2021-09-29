import React, { ComponentProps } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxrGL, { Source, Layer } from 'mapboxr-gl';
import { State } from './reducer';


type Props = {
  state: State;
};

const data: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: { type: 'Point', coordinates: [0, 0] }
    }
  ]
};

function Map({ state }: Props) {
  const { map } = state;
  return map.checked ? (
    <MapboxrGL
      accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    />
  ) : null;
}

export default Map;
