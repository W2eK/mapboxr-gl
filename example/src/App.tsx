import React from 'react';
import MapboxGL, { MapboxrGLProps } from 'mapboxr-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const initialView: MapboxrGLProps['view'] = {
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  style: 'mapbox://styles/mapbox/streets-v11'
};

const App = () => {
  return <MapboxGL view={initialView} />;
};

export default App;
