import React, { ComponentProps } from 'react';
import MapboxrGL from 'mapboxr-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const initialView: ComponentProps<typeof MapboxrGL>['view'] = {
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  style: 'mapbox://styles/mapbox/streets-v11'
};
const App = () => {
  return <MapboxrGL view={initialView} style={{ height: '100vh' }} />;
};

export default App;
