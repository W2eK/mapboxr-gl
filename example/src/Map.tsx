import React, { ComponentProps } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxrGL, { Source } from 'mapboxr-gl';
import { State } from './reducer';

const initialView: ComponentProps<typeof MapboxrGL>['view'] = {
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  style: 'mapbox://styles/mapbox/streets-v11'
};

type Props = {
  state: State;
};

const data: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: []
};

function Map({ state }: Props) {
  const { map, source } = state;
  return map.checked ? (
    <MapboxrGL view={initialView} style={{ height: '100vh' }}>
      {source.checked && <Source id="source" type="geojson" data={data} />}
    </MapboxrGL>
  ) : null;
}

export default Map;
