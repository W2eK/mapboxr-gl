import React from 'react';

import { Source, Layer } from 'mapboxr-gl';

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-3, -3],
            [3, -3],
            [3, 3],
            [-3, 3],
            [-3, -3]
          ]
        ]
      }
    }
  ]
};

function MapLayers() {
  return (
    <Source data={data} type="geojson">
      <Layer id="rect-black" type="fill" paint={{'fill-color': 'black'}} beforeId="rect-green"/>
      <Layer key="rect-green" id="rect-green" type="fill" paint={{'fill-color': 'green', 'fill-translate': [30, 30]}} />
      <Layer id="rect-red" type="fill" paint={{'fill-color': 'red', 'fill-translate': [10, 10]}} />
      <Layer id="rect-blue" type="fill" paint={{'fill-color': 'blue', 'fill-translate': [20, 20]}} />
    </Source>
  );
}

export default MapLayers;
