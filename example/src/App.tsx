import React, { useReducer } from 'react';
import reducer, { initialState } from './reducer';
import Controlls from './Controlls';
import Map from './Map';

declare global {
  interface Window {
    __MAPBOXR_GL_MAP: mapboxgl.Map;
    __MAPBOXR_GL_DEBUG?: boolean;
    __MAPBOXR_GL_VERBOSE?: boolean;
  }
}


window.__MAPBOXR_GL_DEBUG = true;
window.__MAPBOXR_GL_VERBOSE = true;

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <Controlls state={state} dispatch={dispatch} />
      <Map state={state} />
    </>
  );
};

export default App;
