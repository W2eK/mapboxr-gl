import React, { ComponentProps } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxrGL, { Source, Layer } from 'mapboxr-gl';
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
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: { type: 'Point', coordinates: [0, 0] }
    }
  ]
};

function Map({ state }: Props) {
  const { map, source, layer } = state;
  return map.checked ? (
    <MapboxrGL view={initialView} style={{ height: '100vh' }}>
      {source.checked && (
        <Source id="geojson" type="geojson" data={data}>
          {layer.checked && <Layer id="circles" type="circle" source="geojson" />}
        </Source>
      )}
    </MapboxrGL>
  ) : null;
}

export default Map;
