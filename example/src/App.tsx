import React, { useReducer } from 'react';
import reducer, { initialState } from './reducer';
import Controlls from './Controlls';
import Map from './Map';

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
