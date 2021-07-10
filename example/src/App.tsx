import React, { ComponentProps } from 'react';
import MapboxrGL, { Source } from 'mapboxr-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const initialView: ComponentProps<typeof MapboxrGL>['view'] = {
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  style: 'mapbox://styles/mapbox/streets-v11'
};

const App = () => {
  return (
    <MapboxrGL view={initialView} style={{ height: '100vh' }}>
      <Source
        id="source"
        type="geojson"
        data={{
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: { type: 'Point', coordinates: [0, 0] }
            }
          ]
        }}
      />
    </MapboxrGL>
  );
};

export default App;
