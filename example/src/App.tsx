import React, { useReducer } from 'react';
import reducer, { initialState } from './reducer';
import Controlls from './Controlls';
import Map from './Map';

declare global {
  interface Window {
    __MAPBOXR_GL_DEBUG?: boolean;
  }
}

window.__MAPBOXR_GL_DEBUG = true;

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
