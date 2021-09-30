import React, { ComponentProps } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxrGL, { Source, Layer } from 'mapboxr-gl';
import { State } from '../state/state';

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

const getValue = (str: string) => {
  if (!str) return undefined;
  try {
    return JSON.parse(str);
  } catch (error) {
    return str;
  }
};

function Map({ state }: Props) {
  const { map } = state;
  return map.checked ? (
    <MapboxrGL
      wrapper={{ className: 'mapbox-container' }}
      {...Object.entries(map.props).reduce(
        (obj, [key, value]) => ((obj[key] = getValue(value)), obj),
        {}
      )}
    ></MapboxrGL>
  ) : null;
}

export default Map;
